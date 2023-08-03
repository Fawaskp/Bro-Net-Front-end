import Profile from './Profile';
import EducationSection from './Education/EducationSection';
import ExperienceSection from './Experience/ExperienceSection';
import SkillSection from './Skill/SkillSection';
import ProjectSection from './Project/ProjectSection';
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userAxiosInstance } from '../../utils/axios-utils';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

function UserViewPage() {

  const [userid, setUserId] = useState(null)
  const { username } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('From user View page ::>> ');
    const user = getLocal('AuthToken')
    if (!user) {
      toast.error('Login First')
      navigate('/auth/login')
      return
    }
    const user_decoded = jwtDecode(user)
    if (!user_decoded) {
      toast.error('Login First')
      navigate('/auth/login')
      return
    }
    else {
      userAxiosInstance.get(`get-user-id/${username}/`).then((response) => {
        if (response.data.status == 404) {
          navigate('/404/')
          return
        }
        else {
          setUserId(response.data.id)
        }
      })
    }
  }, [])

  return (
    <>
      
      {userid && <Navbar />}
      {userid && <Profile userId={userid} />}
      <div className='container mx-auto mb-3' >
        {userid &&
          <div className='flex flex-row justify-around' >
            <EducationSection userId={userid} />
            <ExperienceSection userId={userid} />
          </div>
        }
      </div>
      {userid &&
        <div className='container mx-auto mb-3'>
          <SkillSection userId={userid} />
        </div>
      }
      {userid &&
        <div className='container mx-auto mb-3'>
          <ProjectSection userId={userid} />
        </div>
      }
    </>
  );
}

export default UserViewPage;