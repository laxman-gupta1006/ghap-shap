import React, { useState } from 'react';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/Firebase';
/*eslint-disable*/
export const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });
  const updateIsConnected=(providerId,value)=>{
   setIsConnected(p=>{return{
      ...p,
      [providerId]:value,
   }})
  }
  const unLink= async (providerId)=>{
   try{
      if(auth.currentUser.providerData.length===1){
         throw new Error(`You Cannot disconnect from ${providerId}`)
      }
     await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId,false);
      Alert.success(`Disconnected from ${providerId}`)
   }catch(err){
      Alert.error(err.message)
   }
  }
  const Link= async (provider)=>{
   try{
     await auth.currentUser.linkWithPopup(provider);
      updateIsConnected(provider.providerId,true);
      Alert.success(`connected from ${provider.providerId}`)
   }catch(err){
      Alert.error(err.message)
   }
  }
  const unLinkFacebook=()=>{
     unLink('facebook.com')
  }
  const unLinkGoogle=()=>{
   unLink('google.com')
  }
  const LinkFacebook=()=>{
   Link(new firebase.auth.FacebookAuthProvider())
  }
  const LinkGoogle=()=>{
   Link(new firebase.auth.GoogleAuthProvider())
  }
  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="red" closable onClick={unLinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="blue" closable  onClick={unLinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="red" onClick={LinkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={LinkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );

};
