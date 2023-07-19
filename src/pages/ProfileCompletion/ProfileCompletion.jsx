import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './ProfileCompletion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { checkIsCompleted, getBatchList, getHubList, getStackList, updateBasicUserData,updateUserProfile } from './api'
import { defaultUserImageLink } from '../../constants/constants'
import ConfirmModal from './AlertModal'

function ProfileCompletion() {


  const [confirmModal,setConfirmModal] = useState(false)
  const handConfirmModal = () => setConfirmModal(!confirmModal)

  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 17, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0];


  const fileInputRef = React.createRef();
  const [userimage, setUserImage] = useState()
  const [fullname, setFullname] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [dob, setDob] = useState('')
  const [hub, setHub] = useState()
  const [batch, setBatch] = useState()
  const [stack, setStack] = useState()
  
  const [hublist, setHubList] = useState([])
  const [batchlist, setBatchList] = useState([])
  const [stacklist, setStackList] = useState([])
  const navigate = useNavigate()
  
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = () =>{
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

  const getCurrentUser = () =>{
    const user = getLocal('AuthToken')
    if(user) return jwtDecode(user)
    else false
  }

  const callIsProfileComplete = async (user_id,email) =>{
    const isProfileCompleted = await checkIsCompleted(user_id)
        if(isProfileCompleted){
          navigate('/')
        }else{
          toast.success('Welcome ' + email)
          StackAndHubList()
        }
  }

  const handleFormSubmit = () => {
    var userData = [fullname, username, email, dob, hub, batch, stack]
    { userimage ? userData.push(userimage) : null }
    userData.map((value) => {
      if (value == null || value == "") {
        toast.error("Some fields are empty")
      }
      else if(value.length>30){
        toast.error("Some fields exceeding the character limit")
      }
    })
    userData = {fullname,username,dob,is_verified:true}

    const user_decoded = getCurrentUser()
    console.log('user data: ',userData,' user Id: ',user_decoded.custom.user_id);
    var requestStatus = updateBasicUserData(userData,user_decoded.custom.user_id)


    const profileFormData = new FormData();
    profileFormData.append('hub', hub);
    profileFormData.append('batch', batch);
    profileFormData.append('stack', stack);
    { userimage ? profileFormData.append('profile_image', userimage) : null }

    {
      requestStatus?
      requestStatus = updateUserProfile(profileFormData,user_decoded.custom.user_id) :
      toast.error('Re-try again something went wrong')
    }

    if(requestStatus){
      toast.success('Profile Completion Suceessfull ')
      navigate('/')
    }else{
      toast.error('Re-try again something went wrong')
    }
  }

  useEffect(() => {
    document.title = "Complete Profile"
    const user = getLocal('AuthToken')
      if (!user) {
        toast.warn('Login First')
        navigate('/auth/')
      }
      else{
        const user_decoded = jwtDecode(user)
        setEmail(user_decoded.custom.email)
        callIsProfileComplete(user_decoded.custom.user_id,user_decoded.custom.email)
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
              <div onClick={()=>handleIconClick()} className="user-image" 
              style={{ backgroundImage: `url(${userimage ? URL.createObjectURL(userimage) : defaultUserImageLink})` }} >
              </div>

              {
                userimage?
                <FontAwesomeIcon icon={faPlusCircle} className="remove-image-icon" onClick={()=>removeImage()} />
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
                <input onChange={(e) => setFullname(e.target.value) } required type="text"
                  defaultValue={fullname ? fullname : ''} placeholder="Full name" />
                <input onChange={(e) => { setUsername(e.target.value) }} required type="text"
                  defaultValue={username ? username : ''} placeholder="Username" />
              </div>

              <div className="input-container">
                <input onChange={(e) => { setEmail(e.target.value) }} required type="email"
                  defaultValue={email ? email : ''} placeholder="E-mail" />
                <input required className="date-input" type="date" placeholder="dob"
                  max={maxDate} value={dob} onChange={(e) => setDob(e.target.value)} />
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
                        return (<option key={idx} value={batch.id}>{batch.batch_name  }</option>)
                      })
                      :
                      null
                  }
                </select>
              </div>

              <div className="input-container">
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
