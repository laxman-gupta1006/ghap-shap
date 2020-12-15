import React, { memo } from 'react'
import { useParams } from 'react-router'
import { Alert, Button, Drawer } from 'rsuite'
import { useCurrentRoom } from '../../../context/Current-room.context'
import { useMediaQuery, useModalState } from '../../../misc/CustomHook'
import { database } from '../../../misc/Firebase'
import { EditableInput } from '../../EditableInput'

const EditRoomBtn = () => {
   const {chatId}=useParams();
   const {isopen,open,close}=useModalState();
   const name=useCurrentRoom(v=>v.name);
   const description=useCurrentRoom(v=>v.discription)
   const isMobile = useMediaQuery('(max-width:992px)')
   const updateData = (key,value) => {
      database.ref(`rooms/${chatId}`).child(key).set(value).then(
         ()=>Alert.success("successfully updated")
      ).catch(err=>{
         Alert.error(err.message,4000);
      })
   }
   const onNamesave = (newName) => {
      updateData('name',newName)
   }
   const onDescriptionsave = (newDescription) => {
      updateData('discription',newDescription)
   }
   return (
      <div>
         <Button className="br-circle" size="sm" color="red" onClick={open}>
            A
         </Button>
         <Drawer show={isopen} onHide={close} placement="right" full={isMobile}>
            <Drawer.Header>
<Drawer.Title>
   Edit Room
</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
      <EditableInput 
      initialValue={name}
      onSave={onNamesave}
      label={<h6 className="mb-2">Name</h6>}
      emptyMsg="Name can not be empty"
      />
            <EditableInput 
            componentClass="textarea"
            rows={5}
      initialValue={description}
      onSave={onDescriptionsave}
      label={<h6 className="mb-2">Description</h6>}
      emptyMsg="Description can not be empty"
      />
            </Drawer.Body>
            <Drawer.Footer>
               <Button onClick={close} block>
                  Close
               </Button>
            </Drawer.Footer>
         </Drawer>
      </div>
   )
}
export default memo(EditRoomBtn);