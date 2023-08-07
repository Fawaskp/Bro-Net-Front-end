import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import './ProfileCompletion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { getBatchList, getHubList, getStackList, getToken, updateBasicUserData, updateUserProfile2 } from './api'
import { defaultUserImageLink } from '../../constants/constants'
import ConfirmModal from './AlertModal'
import debounce from '../../helpers/debouce'
import { userAxiosInstance } from '../../utils/axios-utils'

function ProfileCompletion() {


  const [confirmModal, setConfirmModal] = useState(false)
  const handConfirmModal = () => setConfirmModal(!confirmModal)

  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 17, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0];

  const fileInputRef = React.createRef();
  const [userimage, setUserImage] = useState()
  const fullnameRef = useRef();
  const usernameRef = useRef();
  const dobRef = useRef();
  const [hub, setHub] = useState()
  const [batch, setBatch] = useState()
  const [stack, setStack] = useState()
  const [usernameavailabe, setUsernameAvailable] = useState(null)

  const [hublist, setHubList] = useState([])
  const [batchlist, setBatchList] = useState([])
  const [stacklist, setStackList] = useState([])
  const navigate = useNavigate()

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    handConfirmModal()
    return
  }

  const StackAndHubList = async () => {
    setHubList(await getHubList())
    setStackList(await getStackList())
  }

  const BatchList = async (hub_id) => {
    setBatchList(await getBatchList(hub_id))
  }

  const getCurrentUser = () => {
    const user = getLocal('AuthToken')
    if (user) return jwtDecode(user)
    else false
  }

  function performCheck(inputValue) {

    userAxiosInstance.get(`check-username/${inputValue}/`).then((response) => {
      if (response.status == 202) {
        setUsernameAvailable(true)
      }
      else if (response.data.status == 409) {
        setUsernameAvailable(false)
      }
    })
  }
  const usernameCheck = debounce((inputValue) => performCheck(inputValue));

  const checkUsername = (event) => {
    let username = event.target.value.trim()
    event.target.value = username.toLowerCase()
    const usernameRegex = /^(?=[a-zA-Z_])(?=(?:\D*\d){0,3}\D*$)(?=(?:[^_]*_){0,4}[^_]*$)(?=(?:[^a-zA-Z]*[a-zA-Z]){3,})[a-z0-9_]{3,10}$/;
    if (usernameRegex.test(username)) {
      console.log('trueee');
      if (!username == '' && username.length > 3)
        usernameCheck(username.toLowerCase())
      else
        setUsernameAvailable(null)
    }
    else
      console.log('falseeee');
    setUsernameAvailable(null)
  }

  const handleFormSubmit = async () => {

    const fullname = fullnameRef.current.value;
    const username = usernameRef.current.value;
    const dob = dobRef.current.value;

    var userData = [fullname, username, dob, hub, batch, stack]
    { userimage ? userData.push(userimage) : null }

    var flag = false;
    userData.map((value) => {
      if (value == null || value == "") {
        toast.error("Some fields are empty")
        flag = true
        return;
      }
      else if (value.length > 30) {
        toast.error("Some fields exceeding the character limit")
        flag = true
        return
      }
    })

    if (flag) return
    userData = { fullname, username, dob, is_verified: true }

    const user_decoded = getCurrentUser()
    var requestStatus = updateBasicUserData(userData, user_decoded.custom.user_id)

    const profileFormData = new FormData();
    profileFormData.append('hub', hub)
    profileFormData.append('batch', batch)
    profileFormData.append('stack', stack)
    { userimage ? profileFormData.append('profile_image', userimage) : null }

    {
      requestStatus ?
        requestStatus = await updateUserProfile2(profileFormData, user_decoded.custom.user_id)
        : toast.error('Re-try again something went wrong')
    }

    if (requestStatus) {
      console.log('its sending');
      getToken({ 'email': user_decoded.custom.email }, navigate)
    } else {
      toast.error('Re-try again something went wrong')
    }
  }

  useEffect(() => {
    document.title = "Complete Profile"
    const user = getLocal('AuthToken')
    if (!user) {
      toast.warn('Login First')
      navigate('/auth/login')
    }
    else {
      var user_decoded = jwtDecode(user).custom
      if (user_decoded.is_profile_completed) {
        navigate('/')
      } else {
        StackAndHubList()
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <ConfirmModal status={confirmModal} message={"Are you sure to remove image"} handleOpen={handConfirmModal} confirm={setUserImage} />
      <main>
        <div className="main-card">
          <div className="main-card-head">
            <h4>Complete Profile</h4>
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#6366f1' }} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(), handleFormSubmit() }} >
            <div className="user-image-container">
              <div onClick={() => handleIconClick()} className="user-image"
                style={{ backgroundImage: `url(${userimage ? URL.createObjectURL(userimage) : defaultUserImageLink})` }} >
              </div>

              {
                userimage ?
                  <FontAwesomeIcon icon={faPlusCircle} className="remove-image-icon" onClick={() => removeImage()} />
                  :
                  <FontAwesomeIcon icon={faPlusCircle} className="add-image-icon" />
              }

              <input type="file" className='hidden' ref={fileInputRef} onChange={(e) => {
                if (e.target.value[0] != null)
                  setUserImage(e.target.files[0])
              }}
              />
              <div style={{ width: '100%', height: '80px' }}></div>
            </div>

            <div className="main-input-container">
              <div className="input-container">
                <input ref={fullnameRef} required type="text"
                  placeholder="Full name" />
                <input onChange={(e) => { checkUsername(e) }} ref={usernameRef} required type="text"
                  placeholder="Username" />
              </div>
              <div className={`flex justify-between w-5/6 mx-auto -mt-2 ${usernameavailabe == null ? 'opacity-0' : ''}`} >
                <p className='text-green-400 opacity-0' >Username is availabe </p>
                {
                  usernameavailabe == true &&
                  <p className='text-green-400' >this username is availabe &#x2714; </p>
                }{
                  usernameavailabe == false &&
                  <p className='text-red-400' >this username is not availabe &#x2715; </p>
                }
              </div>

              <div className="input-container">
                <input ref={dobRef} required className="date-input" type="date" placeholder="dob"
                  max={maxDate} />

                <select required name="stack" onChange={(e) => setStack(e.target.value)}>
                  <option value="">Select Stack</option>
                  {
                    stacklist.length > 0 ?
                      stacklist.map((stack, idx) => {
                        return (<option key={idx} value={stack.id}>{stack.name.toUpperCase()}</option>)
                      })
                      :
                      null
                  }
                </select>
              </div>

              <div className="input-container extra-margin">
                <select required name="hub" onChange={(e) => { setHub(e.target.value), BatchList(e.target.value) }}>
                  <option value="">Select Hub</option>
                  {
                    hublist.length > 0 ?
                      hublist.map((local_hub, idx) => {
                        if (hub && local_hub.code == hub) {
                          return (<option selected key={idx} value={local_hub.id}>{local_hub.code}</option>)
                        }
                        else {
                          return (<option key={idx} value={local_hub.id}>{local_hub.code}</option>)
                        }
                      })
                      :
                      null
                  }
                </select>

                <select required name="batch" onChange={(e) => setBatch(e.target.value)}>
                  <option value="">Select Batch</option>
                  {
                    batchlist.length > 0 ?
                      batchlist.map((batch, idx) => {
                        return (<option key={idx} value={batch.id}>{batch.batch_name}</option>)
                      })
                      :
                      null
                  }
                </select>
              </div>


              <div className="btn-container">
                <button className="primary-btn">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>

  )
}

export default ProfileCompletion
