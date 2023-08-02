import { toast } from "react-toastify";
import { suAxiosInstance } from "../../../utils/axios-utils";

export const addUser = (data,role) => {
  suAxiosInstance.post(`/${role}/`, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log('From Create User ::>> ', err));
};

export const blockUser = (user_id, refresh) => {
  suAxiosInstance.put(`/block-user/${user_id}/`)
    .then((res) => {
      if (res.status == 200)
        toast.success(res.data.message)
      refresh()
    })
    .catch((err) => console.log('From Create User ::>> ', err));
};

export const unBlockUser = (user_id, refresh) => {
  suAxiosInstance.put(`/unblock-user/${user_id}/`)
    .then((res) => {
      if (res.status == 200)
        toast.success(res.data.message)
      refresh()
    })
    .catch((err) => console.log('From Create User ::>> ', err));
};