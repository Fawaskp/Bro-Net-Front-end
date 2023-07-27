import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../utils/axios-utils';
import axios from 'axios';


export function login_with_google(access_token,navigate) {
  axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          const updatedData = { ...res.data, fullname: res.data.name,password:res.data.email };
          const profileData = { profile: res.data.picture}

          const keysToDelete = ['name', 'id', 'picture','locale'];
          keysToDelete.forEach(key => delete updatedData[key]);
          // console.log('Profile => ',profileData, ' UpdatedData => ',updatedData);

          userAxiosInstance.post("/login/social-media/",updatedData,{
          }).then((res)=>{
            console.log('Aceess:',res.data.Token.access);
            console.log('Refresh:',res.data.Token.access);
            localStorage.setItem('AuthToken',JSON.stringify(res.data.Token));
            navigate('/auth/complete-profile')
          })
        })
        .catch((err) => console.log(err));
}

