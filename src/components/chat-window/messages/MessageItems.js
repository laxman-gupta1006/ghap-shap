import React from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/Current-room.context';
import { useHover, useMediaQuery } from '../../../misc/CustomHook';
import { auth } from '../../../misc/Firebase';
import { ProfileAvatar } from '../../Dashboard/ProfileAvatar';
import { PresenceDot } from '../../PresenceDot';
import { IconBtnControl } from './IconBtnControl';
import { ImgBtnModal } from './ImgBtnModal';
import { ProfileInfoBtn } from './ProfileInfoBtn';
/*eslint-disable*/

const renderFile= (file)=>{
  if(file.contentType.includes('image')){
    return <div className="height-220">
      <ImgBtnModal src={file.url} filename={file.name}/>
    </div>
  }
  if(file.contentType.includes('audio')){
    return <audio controls>
      <source src={file.url} type="audio/mp3"/>
      Your browser does not support audio.
    </audio>
  }
  return <a href={file.url}> Download {file.name}</a>
}
export const MessageItems = ({ message, handleAdmin,handleDelete }) => {
  const { author, createdAt, text,file } = message;
  const [selfref,isHover] =useHover()
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const isMobile=useMediaQuery('(max-width:992px)')
 const canShowIcons=isMobile || isHover;
  return (
    <li className={`padded mb-1 cursor-pointer ${isHover ? 'bg-black-01':""}`} ref={selfref}>
      <div className="d-flex align=items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtn
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
          isMsgAuthorAdmin={isMsgAuthorAdmin}
        >

          {canGrantAdmin && (
            <Button onClick={() => handleAdmin(author.uid)} color="blue" block>
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give Admin permission'}
            </Button>
          )}

        </ProfileInfoBtn>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />

              {isAuthor &&  <IconBtnControl 
        isVisible={canShowIcons}
        iconName="close"
        tooltip="Delete this message"
        onClick={()=>handleDelete(message.id,file)}
        />}
      </div>
      <div>
          {text && <span  className="word-breal-all">{text}</span>}
          {file && renderFile(file)}
      </div>
    </li>
  );
};
