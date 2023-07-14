import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import Navbar from '../components/Navbar'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'



function LoginPage() {

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse); 
      console.log('Response: ',codeResponse.access_token)
      if (user) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                console.log('Profile : ',res.data)
            })
            .catch((err) => {console.log(err);console.log('User token from erro: ',user.access_token);});
    }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      console.log('User => ',user);
    },
    [ user ]
);


  return (
    <>

    <Navbar/>

    <main className='main'>
      <div className='login-card'>
        <div className='login-card-head'>
          <h4>Login to <span className="text-indigo-600">BROCAMP</span></h4>
        </div>
        <hr />
        <div onClick={() => googleLogin()}
          className='social-media-card'
        >
          <img src="https://img.icons8.com/?size=512&id=17949&format=png" alt="" />
          <h4>Continue With Google</h4>
        </div>
        <div
          className='social-media-card'
        >
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
          <h4>Continue With GitHub</h4>
        </div>
      </div>
    </main>


    </>
  )
}

export default LoginPage
