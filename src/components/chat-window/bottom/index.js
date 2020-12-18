import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import firebase from 'firebase/app';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/Firebase';
import { AttachmentBtn } from './AttachmentBtn';
import { AudioMsgBtn } from './AudioMsgBtn';
/*eslint-disable*/
function assembelMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      avatar: profile.avatar,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : ''),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const ChatBottom = () => {
  const { profile } = useProfile();
  const [input, setInput] = useState('');
  const { chatId } = useParams();
  const [isloading, setisloading] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      return;
    }
    const msgDate = assembelMessage(profile, chatId);
    msgDate.text = input;
    const updates = {};
    const messageId = database.ref('messages').push().key;
    updates[`/messages/${messageId}`] = msgDate;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgDate,
      msgId: messageId,
    };
    setisloading(true);
    try {
      await database.ref().update(updates);
      setInput('');
      setisloading(false);
    } catch (err) {
      Alert.error(err.message, 4000);
      setisloading(false);
    }
  };

  const afterupload = useCallback(
    async files => {
      setisloading(true);
      const updates = {};
      files.forEach(file => {
        const msgDate = assembelMessage(profile, chatId);
        msgDate.file = file;
        const messageId = database.ref('messages').push().key;
        updates[`/messages/${messageId}`] = msgDate;
      });
      const lastMsgId = Object.keys(updates).pop();
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId,
      };

      try {
        await database.ref().update(updates);
        setInput('');
        setisloading(false);
      } catch (err) {
        Alert.error(err.message, 4000);
        setisloading(false);
      }
    },
    [chatId, profile]
  );
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="write your message here..."
          value={input}
          onChange={onInputChange}
          onPressEnter={onSendClick}
        />
        <InputGroup.Button
          color="green"
          appearance="primary"
          onClick={onSendClick}
        >
          <Icon icon="send" />
        </InputGroup.Button>
        <AttachmentBtn afterupload={afterupload} />
        <AudioMsgBtn afterupload={afterupload} />
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
