import React,{useRef,useEffect,useState} from 'react';
import { Divider } from 'rsuite';
import { CreateChatRoomBtn } from './Dashboard/CreateChatRoomBtn';
import { DashboardToggle } from './Dashboard/DashboardToggle';
import { ChatRoomList } from './Room/ChatRoomList';

export const SideBar = () => {
   const topSidebarRef=useRef();
   const [height,setHeight]=useState(0);
   useEffect(() => {
      if(topSidebarRef.current){
         setHeight(topSidebarRef.current.scrollHeight);
      }
   }, [topSidebarRef])
  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateChatRoomBtn />
        <Divider>Join for conversation</Divider>
      </div>
      <ChatRoomList aboveheight={height} />
    </div>
  );
};
