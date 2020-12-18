import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { database, storage } from '../../../misc/Firebase';
import { transformtoarrwithid } from '../../../misc/Helper';
import { MessageItems } from './MessageItems';
/*eslint-disable*/
const Messages = () => {
  const [messages, setMessages] = useState();
  const { chatId } = useParams();
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() => {
    const messagesRef = database.ref('/messages');
    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const date = transformtoarrwithid(snap.val());
        setMessages(date);
      });
    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);
  const handleAdmin = useCallback(
    async uid => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin permission granted';
          }
        }
        return admins;
      });
      Alert.success(alertMsg, 4000);
    },
    [chatId]
  );
  const handleDelete = useCallback(
    async (msgId,file) => {
      if (!window.confirm('delete this message ?')) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};
      updates[`/messages/${msgId}`] = null;
      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }
      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }
      try {
        await database.ref().update(updates);
      } catch (error) {
        return Alert.error(error.message,4000)
      }

      if (file) {
        try {
          const fileRef=storage.refFromURL(file.url)
          await fileRef.delete()
        } catch (error) {
          Alert.error(error.message,4000)
        }
      }
    },
    [chatId, messages]
  );
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet..</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItems
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default Messages;
