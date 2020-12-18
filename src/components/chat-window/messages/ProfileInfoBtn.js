import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/CustomHook';
import { ProfileAvatar } from '../../Dashboard/ProfileAvatar';

export const ProfileInfoBtn = ({ profile, children, isMsgAuthorAdmin,...otherprops }) => {
  const { isopen, open, close } = useModalState();
  const sortname = profile.name.split(' ')[0];
  const membersince = new Date(profile.createdAt).toLocaleDateString();
  

  return (
    <>
      <Button onClick={open} {...otherprops}>
        {sortname}{isMsgAuthorAdmin && "(Admin)"}
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{sortname}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar src={profile.avatar} name={profile.name} />
          <h4 className="mt-2">{profile.name}</h4>
          <p>Member since {membersince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
