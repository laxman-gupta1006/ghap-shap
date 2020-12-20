import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import { database, storage } from '../../../misc/Firebase';
import { groupBy, transformtoarrwithid } from '../../../misc/Helper';
import { MessageItems } from './MessageItems';

const PAGE_SIZE = 15;
const messagesRef = database.ref('/messages');

const shouldScrolltobottom=(node,threshold=30)=>{
  const percentage=(100*node.scrollTop)/(node.scrollHeight-node.clientHeight) || 0;
  return percentage>threshold;
}

const Messages = () => {
  const [messages, setMessages] = useState();
  const { chatId } = useParams();
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef();
  const loadMessages = useCallback(
    limitToLast => {
      messagesRef.off();
      messagesRef
        .orderByChild('roomId')
        .equalTo(chatId)
        .limitToLast(limitToLast || PAGE_SIZE)
        .on('value', snap => {
          const date = transformtoarrwithid(snap.val());
          setMessages(date);
          const node=selfRef.current
          if(shouldScrolltobottom(node)){
            node.scrollTop=node.scrollHeight;
          }
        });
      setLimit(p => p + PAGE_SIZE);
    },
    [chatId]
  );

  const onLoadMore = useCallback(() => {
    const node=selfRef.current
    const oldHeight=node.scrollHeight
    loadMessages(limit);
    setTimeout(() => {
      const newHeight=node.scrollHeight;
      node.scrollTop=newHeight-oldHeight
    }, 400);
  }, [loadMessages, limit]);
  useEffect(() => {
    const node = selfRef.current;
    loadMessages();
    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 400);
    return () => {
      messagesRef.off('value');
    };
  }, [loadMessages]);
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
    async (msgId, file) => {
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
        Alert.error(error.message, 4000);
      }

      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (error) {
          Alert.error(error.message, 4000);
        }
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );
    const items = [];
    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );
      const msgs = groups[date].map(msg => (
        <MessageItems
          key={msg.id}
          message={msg}
          handleAdmin={handleAdmin}
          handleDelete={handleDelete}
        />
      ));
      items.push(...msgs);
    });
    return items;
  };

  return (
    <ul ref={selfRef} className="msg-list custom-scroll">
      {messages && messages.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadMore} color="green">
            Load more
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No messages yet..</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
