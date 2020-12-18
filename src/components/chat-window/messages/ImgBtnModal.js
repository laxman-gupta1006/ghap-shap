import React from 'react'
import { Modal } from 'rsuite'
import { useModalState } from '../../../misc/CustomHook'

export const ImgBtnModal = ({src,filename}) => {
   const {isopen,open,close}=useModalState();
   return (
      <>
        <input src={src} type="image" alt="file" onClick={open} className="mw-100 mh-100 w-auto"/>
        <Modal show={isopen} onHide={close} >
           <Modal.Header>
              <Modal.Title>
                 {filename}
              </Modal.Title>
           </Modal.Header>
           <Modal.Body>
              <img src={src} height="100%" width="100%" alt="file"/>
           </Modal.Body>
           <Modal.Footer>
              <a href={src} target="_blank" rel="nooopener noreferrer">Open original</a>
           </Modal.Footer>
         </Modal> 
      </>
   )
}
