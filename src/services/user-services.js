import { userAxiosInstance,suAxiosInstance } from "../utils/axios-utils"

export const isUserAuth = () =>{
    return userAxiosInstance.post('is-user-auth');
}

export const isSuAuth = () =>{
    return userAxiosInstance.post('is-su-auth');
}