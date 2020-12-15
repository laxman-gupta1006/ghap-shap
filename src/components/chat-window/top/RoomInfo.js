import React from 'react'
import { Button, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../context/Current-room.context'
import { useModalState } from '../../../misc/CustomHook'

export const RoomInfo = () => {
   const {isopen,open,close}=useModalState();
   const description = useCurrentRoom(v=>v.discription)
   const name= useCurrentRoom(v=>v.name)
   return (
      <>
         <Button appearance="link" className="px-0" onClick={open}>
            Room
         </Button>
         <Modal show={isopen} onHide={close}>
      <Modal.Header>
         <Modal.Title>
            About {name}
         </Modal.Title>
      </Modal.Header>
      <Modal.Body>
<h6 className="mb-1">Description</h6>
<p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
<Button onClick={close}>
   close
</Button>
      </Modal.Footer>
         </Modal>
      </>
   )
}
