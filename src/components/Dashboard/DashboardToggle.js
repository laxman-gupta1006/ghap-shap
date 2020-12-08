import React,{useCallback} from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/CustomHook';
import {Dashboard} from '.'
import { auth } from '../../misc/Firebase';

export const DashboardToggle = () => {
   const {isopen,open,close}=useModalState();
   const isMobile = useMediaQuery('(max-width:992px)')
   const onSignOut = useCallback(
     () => {
       auth.signOut();
       Alert.info('Signed out',4000);
       close();
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
