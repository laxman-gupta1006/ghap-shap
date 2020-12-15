import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import { database } from '../../../misc/Firebase';
import { transformtoarrwithid } from '../../../misc/Helper';
import { MessageItems } from './MessageItems';

const Messages = () => {
      const [messages,setMessages]=useState();
      const {chatId}=useParams();
      const isChatEmpty = messages && messages.length===0;
      const canShowMessages = messages && messages.length > 0;
      useEffect(() => {
            const messagesRef=database.ref('/messages')
            messagesRef.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{
                  const date = transformtoarrwithid(snap.val());
                  setMessages(date)
            })
            return () => {
                  messagesRef.off('value');
            }
      }, [chatId])
  return(
        <ul className="msg-list custom-scroll">
              {isChatEmpty && <li>No messages yet..</li>}
              {canShowMessages && messages.map(msg=><MessageItems key={msg.id} message={msg} /> )}
        </ul>
  );
};

export default Messages;
