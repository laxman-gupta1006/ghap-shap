import React from 'react'
import TimeAgo from 'timeago-react'

export const RoomItem = () => 
<>
      <div>
        <div className="d-flex justify-content-between align-items-center">
   <h3 className="text-disappear">Room name</h3>
   <TimeAgo
  datetime='2016-08-08 08:08:08'
  locale='en'
/>
        </div>
        <div>
           <span>No messages yet...</span>
        </div>
      </div>
               </>
                                      