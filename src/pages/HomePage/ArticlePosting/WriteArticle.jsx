import React, { useEffect, useRef, useState } from 'react'
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import Navbar from '../../../components/Navbar'
import { Button } from '@material-tailwind/react';
import { postAxiosInstance } from '../../../utils/axios-utils';
import 'react-quill/dist/quill.snow.css'

export default function WriteArticle() {

  const navigate = useNavigate()

  const [loggeduser, setLoggedUer] = useState({})

  const [valuetarget, setValueTarget] = useState('')
  const [start, setStart] = useState(false)
  const [value, setValue] = useState(false)
  const [buttonstatus, setButtonStatus] = useState(false)

  const articleRef = useRef()

  var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
  ]

  const module = {
    toolbar: toolbarOptions
  }

  const postArticle = () => {
    postAxiosInstance.post('post-article/', { user: loggeduser, body: value }).then((response) => {
      if (response.status == 201) {
        articleRef.current.value = ""
        toast.success('Article Added sucessfully')

      }
    })
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
      setLoggedUer(user_decoded.user_id)
      if (!user_decoded.is_profile_completed) { navigate('/auth/complete-profile/') }
      else setStart(true)
    }
  }, [])

  if (start)

    return (
      <>
        <Navbar />
        <div className="my-10 w-4/6 mx-auto" >
          <ReactQuill modules={module} theme="snow" ref={articleRef} onChange={(e) => {
            if (e.trim() != '') {
              setButtonStatus(true)
              setValue(e)
            }
            else {
              setButtonStatus(false)
            }
          }
          }
          />
          <div className='flex justify-end my-3' >
            <Button disabled={buttonstatus ? false : true} color='indigo' size='sm' className='' onClick={() => postArticle()} >
              Publish
            </Button>
          </div>
        </div>
        {/* {
          value && (
            <div className='ql-container ql-snow' >
              <div className="my-10 w-4/6 mx-auto ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          )
        } */}
      </>
    )
}

