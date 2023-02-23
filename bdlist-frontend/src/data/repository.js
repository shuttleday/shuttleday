import axios from 'axios';

async function getUsers() {
  const response = await axios.get(process.env.REACT_APP_API_LINK + '/users');
  const user = response.data;
  console.log(user);
  return user;
}

//Checks if an user exist in the db
async function userCheck(email) {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_LINK}/users/${email}`
    );
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//Creates an account for new users automatically with their given username (also requires google jwt)
async function createAccount(username) {
  const data = JSON.stringify({
    username: username,
  });

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/users',
      data
    );
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Sends the google jwt token for verification and returns a refresh token and access token
async function googleSignIn() {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/auth/signin'
    );
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Intercepts all request to the server and attaches the token to the header
axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('jwtToken_Login');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { getUsers, createAccount, googleSignIn, userCheck };
