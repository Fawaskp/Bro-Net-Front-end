import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../utils/axios-utils';


export function login_with_email(email,close,setLoading) {
  setLoading(true)
  userAxiosInstance
    .post('/login/email/', { email }, {})
    .then((res) => {
      console.log('Token: ', res.data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
        setLoading(false)
      close()
      toast.success('Email Sent to '+email)
});
}

export async function verify_email_login_token(token,){
    try{
        const response = await userAxiosInstance.get(`/login/email/?token=${token}`)
        if (response.data.status == 200){
            localStorage.setItem('AuthToken',JSON.stringify(response.data.Token))
            return true
        }
        else{
            // console.log("Backend Error: ",res.data);
            toast.error(response.data.message)
            return false
        }
    }
    catch(err){
        console.log(err);
    }
}
