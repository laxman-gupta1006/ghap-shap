import React,{useState,createContext,useEffect} from 'react'
import { database } from '../misc/Firebase';
import { transformtoarrwithid } from '../misc/Helper';
/*eslint-disable*/
const RoomContext = createContext();
export const RoomProvider= ({children})=>{
const [room,setRoom]=useState();
useEffect(() => {
   const roomlistref=database.ref('rooms');
   roomlistref.on('value',(snap)=>{
      const data=transformtoarrwithid(snap.val())
      setRoom(data)
   })
   return () => {
      roomlistref.off()
   }
}, [])
return <RoomContext.Provider value={room}>
   {children}
</RoomContext.Provider>
}