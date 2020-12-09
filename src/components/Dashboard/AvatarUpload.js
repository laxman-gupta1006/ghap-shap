import React,{useState} from 'react';
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/CustomHook';
/*eslint-disable*/
export const AvatarUpload = () => {
  const fileInputTypes = '.png,.jpeg,.jpg';
  const AccpetInputTypes = ['image/png','image/jpg','image/jpeg','image/pjpeg'];
  const { isopen, open, close } = useModalState();
  const [image, setImage] = useState(null)
  const isValid = (file)=>AccpetInputTypes.includes(file.type)
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
            <Button block appearance="ghost">
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
