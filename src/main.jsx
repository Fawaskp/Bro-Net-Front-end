import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={google_client_id} >
    <ThemeProvider>
      <ToastContainer hideProgressBar={true} limit={1} autoClose={1000} className='mt-16' />
        <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
)
