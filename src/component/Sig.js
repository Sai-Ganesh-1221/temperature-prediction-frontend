import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import { useState,useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import App from '../App';
import './Sig.css'
import './Withg'
import Card1 from './Card1';
import Withg from './Withg';
import Button1 from './Button1';




export default function Sig() {
    const [user, setUser] = useState(null);
    const [deatails, setdetails] = useState({
name:'ll',email:'lll',photo:'ll',last:'l',cre:''
    });
    const[body,setbody]=useState(true)
    const[name,setname]=useState("")
    const firebaseConfig = {
      apiKey: "AIzaSyCofkS5sahRCaWzhWikdJWFRHeEzDCvSLQ",
      authDomain: "eee-project-94495.firebaseapp.com",
      projectId: "eee-project-94495",
      storageBucket: "eee-project-94495.appspot.com",
      messagingSenderId: "1031703689493",
      appId: "1:1031703689493:web:046d7452d0d860bda2511c",
      measurementId: "G-BMGYND98BD"
      };      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      function n(b){
    
        const timestamp =parseInt(b);
    const date = new Date(timestamp);
    const e=date.toString();
    return e;

        
    }
    const signg=async()=>{
        await signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
          console.log(result.user.reloadUserInfo.createdAt)
          console.log(result.user.email);
          setname(result.user.uid)
          setdetails({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL,
            last:n(result.user.reloadUserInfo.lastLoginAt),
            cre:n(result.user.reloadUserInfo.createdAt)
          })
    
          console.log(deatails)
          console.log(deatails.last)
          console.log(result.user.displayName);
          console.log(result.user.photoURL);
          setbody(false)

        })
        .catch((error) => {
          console.error(error);
        });

    }

  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    
  }, []);
  return (<div><body className={body?"body":";"}></body>

{

user?  <div><p>createdAt:{deatails.cre}</p><div className='card12'><Card1 detail={deatails} /></div>

<div  onClick={() => signOut(auth)}><Button1/></div>

<App/>
   


{/* unverse.io */}
</div>:
 
  
   <center><div onClick={signg} className='withg'><Withg /></div></center> 
   
    }



  </div>

      
  )
}
