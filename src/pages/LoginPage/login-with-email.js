import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../utils/axios-utils';


export function login_with_email(email){
    userAxiosInstance.post("/login/email/",{email},{}).then((res)=>{
        console.log('Token: ',res.data);
    }) .catch((err) => console.log(err));
}

export function verify_email_login_token(token){
    userAxiosInstance.get(`/login/email/?token=${token}`).then((res)=>{
        if (res.data.status == 200){
            localStorage.setItem('AuthToken',JSON.stringify(res.data.Token))
        }
        else{
            console.log("Backend Error: ",res.data);
        }
    }) .catch((err) => console.log(err));
}
