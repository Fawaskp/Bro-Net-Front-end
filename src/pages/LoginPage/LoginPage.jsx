import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import InputModal from '../../components/InputModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { login_with_google } from './login-with-google';
import { getGitHubAccessToken } from './login-with-github';
import './LoginPage.css'
import { verify_email_login_token } from './login-with-email';

function LoginPage() {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState(false)
  const navigate = useNavigate()

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      login_with_google(codeResponse.access_token, navigate)
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const githubLogin = () => {
    const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + github_client_id + "&scope=user:email,read:user")
  }

  const call_token_verify = async (token) => {
    await verify_email_login_token(token, navigate)
  }

  useEffect(() => {
    document.title = "Login Here"
    const local_user = getLocal('AuthToken')
    if (local_user) {
      const user_decoded = jwtDecode(local_user).custom
      if (user_decoded.is_profile_completed) navigate('/')
      else {
        navigate('/auth/complete-profile')
        toast.success('Welcome ' + user_decoded.email)
      }
    }
    else {
      setStart(true)
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const codeParam = urlParams.get('code')
      if (codeParam) {
        getGitHubAccessToken(codeParam, setLoading, navigate)
      }
      else {
        const tokenParam = urlParams.get('token')
        if (tokenParam) {
          call_token_verify(tokenParam)
        }
      }
    }
  }, [])

  if (start)
    return (
      <>
        {loading && (
          <div className="page-loader">
            <div className="loader"></div>
          </div>
        )}

        <InputModal status={showModal} close={toggleModal} />
        <main className="main">
          <div className="login-card">
            <div className="login-card-head">
              <h4>
                Login to <span className="text-indigo-600">BROCAMP</span>
              </h4>
            </div>
            <hr />
            <div onClick={googleLogin} className="social-media-card">
              <img src="https://img.icons8.com/?size=512&id=17949&format=png" alt="Google-icon" />
              <h4>Continue With Google</h4>
            </div>
            <div onClick={githubLogin} className="social-media-card">
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github-icon" />
              <h6>Continue With GitHub</h6>
            </div>

            <div onClick={toggleModal} className="social-media-card">
              <img src="https://cdn-icons-png.flaticon.com/512/6244/6244438.png" alt="Email-icon" />
              <h6>Continue With E-mail</h6>
            </div>
          </div>
        </main>

      </>
    );
}


export default LoginPage