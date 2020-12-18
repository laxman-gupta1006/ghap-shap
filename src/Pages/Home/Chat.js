import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatBottom from '../../components/chat-window/bottom';
import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import { useRoom } from '../../context/Rooms.context';
import { CurrentRoomProvider } from '../../context/Current-room.context';
import { auth } from '../../misc/Firebase';
import { transformtoarr } from '../../misc/Helper';

export const Chat = () => {
   const {chatId}=useParams();
   const rooms=useRoom();
   if(!rooms)
   {
      return <Loader center size="md" content="Loading"/>
   }
   const currentRoom=rooms.find(room=>room.id===chatId);
   if(!currentRoom){
      return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
   }
   const {name,discription}=currentRoom
   const admins=transformtoarr(currentRoom.admins)
   const isAdmin = admins.includes(auth.currentUser.uid)
   const currentRoomData ={
      name,discription,admins,isAdmin
   }
  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};
