import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

export const PrivateRoute = ({children,...routeprop}) => {
   const {profile,isLoading} = useProfile();
   if(isLoading && !profile){
      return <Container>
         <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
   }
   if(!profile){
      return <Redirect to="/signin" />
   }

   return (
  <Route {...routeprop}>
     {children}
  </Route>
   )
}
