import { userAxiosInstance } from "../../utils/axios-utils";

export async function getSkills() {
    try {
        const response = await userAxiosInstance.get('skill')
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export async function getSingleSkill(skill_id) {
    const params = {
        skill_id: skill_id,
      };
    try {
        const response = await userAxiosInstance.get('skill',{params})
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export async function getUserSocialMediaAccounts(user_id) {
    try {
        const response = await userAxiosInstance.get(`user-social-media?user_id=${user_id}`)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}
