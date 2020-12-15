import React from 'react'
import {  Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css'
import './styles/main.css'
import SignIn from './Pages/SignIn'
import { PrivateRoute } from './components/PrivateRoute';
import  Home  from './Pages/Home/index';
import { PublicRoute } from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
   <Switch>
     <PublicRoute path='/signin'>
       <SignIn/>
     </PublicRoute>
     <PrivateRoute path="/">
       <Home/>
     </PrivateRoute>
   </Switch>
   </ProfileProvider>
  );
}

export default App;
