import axios from 'axios';

async function getUsers() {
  const response = await axios.get(process.env.REACT_APP_API_LINK + '/users');
  const user = response.data;
  console.log(user);
  return user;
}

async function createAccount() {
  const data = JSON.stringify({
    username: 'kirix',
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_API_LINK + '/users',
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function googleSignIn() {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_API_LINK + '/auth/signin',
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('jwtToken_Login');
  config.headers.Authorization = token;

  return config;
});

export { getUsers, createAccount, googleSignIn };
