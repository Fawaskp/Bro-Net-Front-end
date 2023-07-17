import { userAxiosInstance } from "../../utils/axios-utils";

export async function getHubList(){
    try {
      const response = await userAxiosInstance.get('/hub');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export async function getBatchList(hub_id){
    try {
      const response = await userAxiosInstance.get('/batch?hub_id='+hub_id);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


export async function getStackList(){
    try {
      const response = await userAxiosInstance.get('/stack');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const updateBasicUserData = async (userData,userId) => {
    try {
      const response = await userAxiosInstance.put(`/user/${userId}/`, userData);
      // console.log('updated basic data: ',response.data);
      if(response.status==200) return true
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserProfile = async (userProfileData,userId) => {
    try {
      // console.log('Updating Profile Data (From api.js )',userProfileData);
      const response = await userAxiosInstance.put(`/user-profile/${userId}/`, userProfileData);
      // console.log('updated profile data: ',response.data);
    } catch (error) {
      console.error(error);
    }
  };

export const checkIsCompleted = async (userId) =>{
  const response = await userAxiosInstance.get(`/user-profile/${userId}/`);
  if (response.data.is_profile_completed) {
    return true}
  else return false
}
