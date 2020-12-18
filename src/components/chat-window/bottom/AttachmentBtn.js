import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModalState } from '../../../misc/CustomHook';
import { storage } from '../../../misc/Firebase';
/*eslint-disable*/
const MAX_FILE_SIZE = 1000 * 1024 * 5;
export const AttachmentBtn = ({afterupload}) => {
  const { isopen, open, close } = useModalState();
  const [filelist, setFilelist] = useState([]);
  const [isloading, setisloading] = useState(false);
  const { chatId } = useParams();
  const onchange = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFilelist(filtered);
  };
  const onUpload = async () => {
     setisloading(true)
    try {
      const uploadPromises = filelist.map(f => storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, { cacheControl: `public,max-age=${3600 * 24 * 3}` })
      );
      const uploadSnapshots=await Promise.all(uploadPromises)
      const shapePromises=uploadSnapshots.map(
         async snap=>{
            return {
               contentType:snap.metadata.contentType,
               name:snap.metadata.name,
               url:await snap.ref.getDownloadURL()
            }
         }
      )
      const files=await Promise.all(shapePromises);
         await afterupload(files);
         setisloading(false);
         close();

    } catch (error) {
       setisloading(false);
       Alert.error(error.message,4000)
       close()
    }
  };
  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            onChange={onchange}
            multiple
            listType="picture-text"
            fileList={filelist}
            className="width-100"
            disabled={isloading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={onUpload}>Send to chat</Button>
          <div className="text-right mt-2">
            <small>*Only file less then 5mb allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
