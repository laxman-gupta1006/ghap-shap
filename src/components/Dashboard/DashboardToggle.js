import React,{useCallback} from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/CustomHook';
import {Dashboard} from '.'
import { auth, database } from '../../misc/Firebase';
import { isOfflineForDatabase } from '../../context/profile.context';

export const DashboardToggle = () => {
   const {isopen,open,close}=useModalState();
   const isMobile = useMediaQuery('(max-width:992px)')
   const onSignOut = useCallback(
     () => {
      database.ref(`status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(
        ()=>
       { auth.signOut();
        database.ref('.info/connected').off()
        Alert.info('Signed out',4000);
        close();}
      ).catch(err=>{
        Alert.error(err.message,4000);
      })
       
     },
     [close],
   )
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
         Dashboard
      </Button>
      <Drawer full={isMobile} show={isopen} onHide={close} placement="left">
         <Dashboard onSignOut={onSignOut}/>
      </Drawer>
      </>
  );
};
