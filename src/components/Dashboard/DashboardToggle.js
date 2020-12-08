import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useModalState } from '../../misc/CustomHook';
import {Dashboard} from '.'

export const DashboardToggle = () => {
   const {isopen,open,close}=useModalState()
  return (
    <>
      <Button black color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isopen} onHide={close} placement="left">
         <Dashboard/>
      </Drawer>
    </>
  );
};
