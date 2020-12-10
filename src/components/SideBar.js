import React from 'react'
import { CreateChatRoomBtn } from './Dashboard/CreateChatRoomBtn'
import { DashboardToggle } from './Dashboard/DashboardToggle'

export const SideBar = () => 
      <div className='h-100 pt-2'>
         <div>
         <DashboardToggle/>
         <CreateChatRoomBtn/>
         </div>
         Bottom
      </div>
