import React from 'react';
import { Loader, Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';
import { useRoom } from '../../context/Rooms.context';
import { RoomItem } from './RoomItem';

export const ChatRoomList = ({ aboveheight }) => {
  // eslint-disable-next-line
  const rooms = useRoom();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveheight + 20}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item key={room.id} componentClass={Link} to={`/chat/${room.id}`} eventKey={`/chat/${room.id}`}>
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};
