import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import Navbar from '../../components/Navbar'
import { useGoogleLogin } from '@react-oauth/google';
import InputModal from '../../components/InputModal';
import { userAxiosInstance } from '../../utils/axios-utils';
import { login_with_email, verify_email_login_token } from './login-with-email';
import { toast } from 'react-toastify';

function LoginPage() {

  const [user, setUser] = useState('');
  const [githuUserData, setgithuUserData] = useState({});

  const [email,setEmail] = useState('')
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID

  const githubLogin = () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + github_client_id)
  }

  async function getGithubUserData() {
    await fetch("http://localhost:5000/getUserData", {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("githubAccessToken")
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setgithuUserData(data)
    })
  }

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          const updatedData = { ...res.data, fullname: res.data.name,password:res.data.email };
          const profileData = { profile: res.data.picture}

          const keysToDelete = ['name', 'id', 'picture','locale'];
          keysToDelete.forEach(key => delete updatedData[key]);
          // console.log('Profile => ',profileData, ' UpdatedData => ',updatedData);

          userAxiosInstance.post("/login/",updatedData,{
          }).then((res)=>{
            console.log(res.data);
          })
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    if (codeParam) {
      async function getAccessToken() {
        await fetch("http://localhost:5000/getAccessToken?code=" + codeParam, {
          method: 'GET'
        }).then((response) => {
          return response.json()
        }).then((data) => {
          console.log(data);
          if (data.access_token) {
            localStorage.setItem('githubAccessToken', data.access_token);
          }
        })
      }
      getAccessToken()
    }
  }, [])

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('token')
    if (codeParam) {
      console.log(codeParam);
      verify_email_login_token(codeParam)
    }
  }, [])


  return (
    <>

      <Navbar />

      <main className='main'>
        <div className='login-card'>
          <div className='login-card-head'>
            <h4>Login to <span className="text-indigo-600">BROCAMP</span></h4>
          </div>
          <hr />
          <div onClick={() => googleLogin()}
            className='social-media-card'
          >
            <img src="https://img.icons8.com/?size=512&id=17949&format=png" alt="Google-icon" />
            <h4>Continue With Google</h4>
          </div>
          <div onClick={() => githubLogin()}
            className='social-media-card'>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github-icon" />
            <h4>Continue With GitHub</h4>
          </div>

          <div onClick={toggleModal}
            className='social-media-card'>
            <img src="https://cdn-icons-png.flaticon.com/512/6244/6244438.png" alt="Email-icon" />
            <h4>Continue With E-mail</h4>
          </div>
        </div>
      </main>

      <div>
        <InputModal status={showModal} close={toggleModal} />
      </div>

      {/* <button className='p-3' onClick={() => getGithubUserData()} >Get Use data</button> */}
      
    </>
  )
}

export default LoginPage