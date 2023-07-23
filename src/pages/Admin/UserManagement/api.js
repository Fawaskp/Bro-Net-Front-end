import { suAxiosInstance } from "../../../utils/axios-utils";

export const addUser = (data={'email':'new@gmilc.cwo','username':'NewUserName'},role) => {
  suAxiosInstance.post('/students/', data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log('From Create User ::>> ', err));
};
