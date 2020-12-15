import React,{useState,useRef} from 'react';
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite';
import { useModalState} from '../../misc/CustomHook';
import { auth, database, storage } from '../../misc/Firebase';
import {useProfile} from '../../context/profile.context';
import { ProfileAvatar } from './ProfileAvatar';
import { getUserUpdate } from '../../misc/Helper';

/*eslint-disable*/
export const AvatarUpload = () => {
  const fileInputTypes = '.png,.jpeg,.jpg';
  const AccpetInputTypes = ['image/png','image/jpg','image/jpeg','image/pjpeg'];
  const { isopen, open, close } = useModalState();
  const [isloading,setisLoading]=useState(false)
  const {profile}=useProfile()
  const [image, setImage] = useState(null)
  const isValid = (file)=>AccpetInputTypes.includes(file.type)
  const AvatarRef=useRef();
  const getBlob = async (canvas)=>{
    return new Promise((resolve,reject)=>{
      canvas.toBlob((blob)=>{
        if(blob){
          resolve(blob);
        }else{
          reject(new Error('File process error'));
        }
      })
    }
    )
  }
  const onUploadClick = async() => {
    const canvas=AvatarRef.current.getImageScaledToCanvas();
    try{
      setisLoading(true);
      const blob=await getBlob(canvas)
      const AvatarFileref=storage.ref(`/profiles/${profile.uid}`).child('avatar');
      const uploadAvatar=await AvatarFileref.put(blob,{
        cacheControl:`public , max-age=${3600*24*3}`
      });
      const downloadurl = await uploadAvatar.ref.getDownloadURL();
      const updates = await getUserUpdate(auth.currentUser.uid,'avatar',downloadurl,database)
      await database.ref().update(updates)
      Alert.info("Avatar Uploaded",4000)
      setisLoading(false);
    }catch(err){
      Alert.error(err.message,4000)
      setisLoading(false);
    }
  }
  const onfileInput = (ev)=>{
   const currFiles = ev.target.files;
   if(currFiles.length===1){
      const file=currFiles[0];
      if(isValid(file))
      {
         setImage(file)
         open()
      }else{
         Alert.warning(`Wrong file type ${file.type}`)
      }
   }
  }
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
      src={profile.avatar}
      name={profile.name}
      className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            type="file"
            className="d-none"
            id="avatar-upload"
            accept={fileInputTypes}
            onChange={onfileInput}
          />
        </label>
        <Modal show={isopen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Crop and upload new photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <div className='d-flex justify-content-center align-items-center h-100'>
          {image && <AvatarEditor
          ref={AvatarRef}
        image={image}
        width={200}
        height={200}
        border={10}
        borderRadius={100}
        color={[0, 0, 0, 0.8]} // RGBA
        scale={1.2}
        rotate={0}
      />}
      </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost" onClick={onUploadClick} disabled={isloading}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
