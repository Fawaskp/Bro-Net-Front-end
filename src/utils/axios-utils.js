import axios from "axios"
import { suBaseUrl, userBaseUrl } from "../constants/constants";

const createAxiosClient=(baseURL)=>{
    const client =axios.create({
        baseURL,
        timeout:8000,
        timeoutErrorMessage:"Request timeout Please Try Again!!!"
    })
    return client;
}

const attachToken=(req,tokenName)=>{
    let authToken=localStorage.getItem(tokenName)
    if(authToken){
        req.headers.Authorization=`Bearer ${authToken}`
    }
    return req
}

const userAxiosInstance=createAxiosClient(userBaseUrl)
userAxiosInstance.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,"AuthToken")
    return modifiedReq;
})

const suAxiosInstance=createAxiosClient(suBaseUrl)
suAxiosInstance.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,"AuthToken")
    return modifiedReq
})

export {userAxiosInstance, suAxiosInstance}