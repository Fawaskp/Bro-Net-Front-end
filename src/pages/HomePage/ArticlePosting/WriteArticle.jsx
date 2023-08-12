import React, { useEffect, useRef, useState } from 'react'
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Navbar from '../../../components/Navbar'


export default function WriteArticle() {

  const navigate = useNavigate()
  const [start, setStart] = useState(false)
  const [value, setValiue] = useState(false)
  
  const articleRef = useRef()

  var toolbarOptions = [
      [{ 'header': [1,2,3,4,5]}],
      ['bold', 'italic','underline','strike'], 
      ['link', 'image'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
  ]

  const module = {
    toolbar: toolbarOptions
  }

  useEffect(() => {
    document.title = "Write Article"
    const user = getLocal('AuthToken')
    if (!user) {
      toast.warn('User Not Authenticated')
      navigate('/auth/login')
    }
    else {
      const user_decoded = jwtDecode(user).custom
      if (!user_decoded.is_profile_completed) { navigate('/auth/complete-profile/') }
      else setStart(true)
    }
  }, [])

  if (start)

    return (
      <>
        <Navbar />
        <div className='my-10 w-4/6 mx-auto' >
          <ReactQuill modules={module} theme="snow" ref={articleRef} onChange={(e)=>{setValiue(e),console.log(e)}} />
        </div>
        {
          value && <div dangerouslySetInnerHTML={{ __html: value }} />
        }
      </>
    )
}

