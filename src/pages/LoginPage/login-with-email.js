import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../utils/axios-utils';
import jwtDecode from 'jwt-decode';


export function login_with_email(email,close,setLoading,setinputColor,setErrorMessage) {
  setLoading(true)
  userAxiosInstance
    .post('/login/email/', { email }, {})
    .then((res) => {
        setLoading(false)
        close()
        if(res.data.status==200) toast.success('Email Sent to '+email)
        else toast.error(res.data.message) 
    })
    .catch((err) => {
        setLoading(false)
        setinputColor('red')
        setErrorMessage(err.message)
    }) 
}

export async function verify_email_login_token(token,navigate){
    try{
        const response = await userAxiosInstance.get(`/login/email/?token=${token}`)
        console.log('Resuuuu::: ',response.data);
        if (response.data.status == 200){
            localStorage.setItem('AuthToken',JSON.stringify(response.data.Token))
            if(response.data.profile_completed) navigate('/') , toast.success('login successfully')
            else navigate('/auth/complete-profile')
        }
        else{
            toast.error(response.data.message)
        }
    }
    catch(err){
        console.log(err);
    }
}
