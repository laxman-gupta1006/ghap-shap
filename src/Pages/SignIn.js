import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Panel, Row, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/Firebase';
/* eslint-disable */
function SignIn() {
  const SignInWithProvider = async provider => {
     try{
        const {additionalUserInfo,user} = await auth.signInWithPopup(provider);
        if(additionalUserInfo.isNewUser){
        await database.ref(`/profiles/${user.uid}`).set({
            name:user.displayName,
            avatar:user.photoURL,
            createdAt:firebase.database.ServerValue.TIMESTAMP,
         })
        }
        Alert.success("Signed in",4000)
     }catch(err){
        Alert.error(err.message,4000)
     }
  };
  const onFacebookSiginIn = () => {
    SignInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSiginIn = () => {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container>
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h1>Welcome to Ghap-Shap</h1>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={()=>onFacebookSiginIn()}>
                  <Icon icon="facebook" /> Continue with facebook
                </Button>
                <Button block color="red" onClick={()=>onGoogleSiginIn()}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignIn;
