import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

export const Config = {
   apiKey: "AIzaSyBSEUtukuFNZ9I3ML02TtMC_YMtUQC9p5M",
   authDomain: "ghap-shap-9391b.firebaseapp.com",
   projectId: "ghap-shap-9391b",
   storageBucket: "ghap-shap-9391b.appspot.com",
   messagingSenderId: "590628544093",
   appId: "1:590628544093:web:9f757a8c60dd5e6923f7b4",
   measurementId: "G-FW6DZ95FMN"
 };
const app=firebase.initializeApp(Config)
export const auth = app.auth()
export const database=app.database()
export const storage=app.storage()