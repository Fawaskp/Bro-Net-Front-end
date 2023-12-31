import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../utils/axios-utils';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';

const clearQueryString = (navigate) => {
  navigate('.', { replace: true });
};

export async function getGitHubAccessToken(codeParam, setLoading, navigate) {

  if (codeParam.length !== 20) {
    return clearQueryString(navigate);
  }

  setLoading(true);

  // Show the loading message first
  const loadingMessage = toast.loading('Logging in with GitHub...');

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      setLoading(false);
      reject('timeout');
    }, 7000);
  });

  const fetchPromise = fetch(`${apiUrl}/accounts/get_access_token/?code=${codeParam}`, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (data.error) {
      setLoading(false);
      clearQueryString(navigate);
    }
    if (data.access_token) {
      get_user_email(data.access_token, setLoading, navigate);
    }
  })

  try {
    await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    if (error === 'timeout') {
      setLoading(false);
      toast.error('Sorry, GitHub login is facing some issues at this moment. Please try another method.');
    } else {
      console.error('An error occurred (from github) login ', error);
    }
  } finally {
    toast.dismiss(loadingMessage);
  }
}

export async function getGithubUserData(githubAccessToken, setLoading) {
  await fetch("http://localhost:5000/getUserData", {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + githubAccessToken
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log('After Data: ', data);
  })
}

async function get_user_email(access_token, setLoading, navigate) {
  try {
    const response = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    const emails = response.data;
    const primaryEmail = emails.find((email) => email.primary)?.email || null;
    userAxiosInstance.post("/login/social-media/", { email: primaryEmail }, {
    }).then((res) => {
      setLoading(false)
      if (res.data.status == 200) {
        localStorage.setItem('AuthToken', JSON.stringify(res.data.Token));
        navigate('/auth/complete-profile')
      } else {
        toast.error(res.data.message)
      }
    })
    return primaryEmail;
  } catch (error) {
    console.error(error);
    return null;
  }
}

