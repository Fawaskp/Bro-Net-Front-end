import { toast } from "react-toastify";
import { userAxiosInstance } from "../../utils/axios-utils";

export async function getHubList() {
  try {
    const response = await userAxiosInstance.get('/hub');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getBatchList(hub_id) {
  try {
    const response = await userAxiosInstance.get('/batch?hub_id=' + hub_id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getStackList() {
  try {
    const response = await userAxiosInstance.get('/stack');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBasicUserData = async (userData, userId) => {
  try {
    const response = await userAxiosInstance.put(`/user/${userId}/`, userData);
    if (response.status == 200) return true
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (userProfileData, userId) => {
  try {
    const response = await userAxiosInstance.put(`/user-profile/${userId}/`, userProfileData);
    if (!response.data.status) {
      return response.data
    }
    else {
      if (response.data.Message) toast.error(response.data.Message)
      else toast.error('Something went wrong')
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile2 = async (userProfileData, userId) => {
  try {
    const response = await userAxiosInstance.put(`/user-profile/${userId}/`, userProfileData);
    return true
  } catch (error) {
    console.error(error);
  }
};

export const getToken = async (email, navigate) => {
  try {
    const response = await userAxiosInstance.post("/token/", email);
    if (response.status == 202) {
      console.log('GetToken : ',response.data);
      localStorage.setItem('AuthToken', JSON.stringify(response.data.token))
      navigate('/')
    }
    else {
      toast.error('Something went wrong!')
    }
  } catch (error) {
    console.error(error);
  }
};
