import React from 'react';
import { Nav } from 'rsuite';
import { RoomItem } from './RoomItem';

export const ChatRoomList = ({ aboveheight }) => {
   // eslint-disable-next-line
   console.log(aboveheight)
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveheight+20}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};
