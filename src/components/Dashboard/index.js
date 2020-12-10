import React from 'react'
import { Drawer,Button, Divider, Alert} from 'rsuite'
import { useProfile } from '../../context/profile.context'
import { database } from '../../misc/Firebase'
import { EditableInput } from '../EditableInput'
import { AvatarUpload } from './AvatarUpload'
import { ProviderBlock } from './ProviderBlock'
/*eslint-disable*/
export const Dashboard = ({onSignOut}) => {
   const {profile}=useProfile()
   const onSave = async (newData) => {
      const userNickName= database.ref(`/profiles/${profile.uid}`).child('name')
      try{
         await userNickName.set(newData)
         Alert.success("Successfully updated",4000)
      }catch(err){
         Alert.success(err.message,4000)
      }
   }
   return (
     <>
     <Drawer.Header>
        <Drawer.Title>
      Dashboard
        </Drawer.Title>
     </Drawer.Header>
     <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock/>
        <Divider/>
        <AvatarUpload/>
        <EditableInput
        initialValue={profile.name}
        onSave={onSave}
        label={<h6 className="mb-2">Nickname</h6>}
        />
       
     </Drawer.Body>
     <Drawer.Footer>
<Button block color="red" onClick={()=>onSignOut()}>
 Sign Out
</Button>
     </Drawer.Footer>
     </>
   )
}
