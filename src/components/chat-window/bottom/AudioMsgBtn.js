import React,{useCallback,useState} from 'react'
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { Alert, InputGroup,Icon } from 'rsuite';
import { storage } from '../../../misc/Firebase';

export const AudioMsgBtn = ({afterupload}) => {
   const {chatId}=useParams();
   const [isrecording,setisrecording]=useState(false);
   const [isuploading,setisuploading]=useState(false);
   const onClick = useCallback(
      () => {
        setisrecording(p=>!p)
      },
      [],
   )
   const onUpload =useCallback(
      async (data) => {
         setisuploading(true)
         try {
           const snap=await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, { cacheControl: `public,max-age=${3600 * 24 * 3}` })
           const file={
            contentType:snap.metadata.contentType,
            name:snap.metadata.name,
            url:await snap.ref.getDownloadURL()
         }
         afterupload([file])
         setisuploading(false)
         } catch (error) {
            Alert.error("Unable to send",4000)
            setisuploading(false)
         }
      },
      [afterupload,chatId],
   )
   return (
      <>
         <InputGroup.Button onClick={onClick} disabled={isuploading} className={isrecording ? 'animate-blink':''}>
        <Icon icon="microphone" />
        <ReactMic
          record={isrecording}
          className="d-none"
          onStop={onUpload}
          mimeType="audio/mp3"
          />
      </InputGroup.Button>
      </>
   )
}
