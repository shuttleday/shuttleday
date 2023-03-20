import axios from 'axios';
import dayjs from 'dayjs';

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
  const data = {
    username: username,
  };

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/users',
      data
    );
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
    return 'error';
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

//Get the list of players that are joining the session
async function getSession() {
  try {
    const today = dayjs();
    const past = today.subtract(7, 'day');
    const future = today.add(7, 'day');

    const response = await axios.get(
      process.env.REACT_APP_API_LINK + '/game-sessions',
      {
        params: { fromDate: past.toISOString(), toDate: future.toISOString() },
      }
    );
    const user = response.data;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

//Adds current user to the existing session
async function joinSession(sessionId) {
  try {
    const data = {
      sessionId: sessionId,
    };
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/session-players',
      data
    );
    console.log(response.data);
    return response.data.players;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Removes user from the existing session
//Delete requests with a body need it to be set under a data key
//https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
async function removeFromSession(sessionId) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_LINK + '/session-players',
      { data: { sessionId: sessionId } }
    );
    console.log(response.data);
    return response.data.players;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Uploads the receipt with formdata to the server
async function uploadReceipt(image, sessionId) {
  const formData = new FormData();
  formData.append('receipt', image);
  formData.append('sessionId', sessionId);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/user-payments',
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Simple get all user function for admins to see
async function getUsers() {
  try {
    const response = await axios.get(process.env.REACT_APP_API_LINK + '/users');
    const users = response.data;
    return users.result;
  } catch (error) {
    return null;
  }
}

async function createSession(sessionData) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_LINK + '/game-sessions',
      sessionData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function editSession(sessionData) {
  try {
    const response = await axios.patch(
      process.env.REACT_APP_API_LINK + '/game-sessions',
      sessionData
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getReceipts(ids) {
  try {
    let list = [];
    for (var i = 0; i < ids.length; i++) {
      const response = await axios.get(
        process.env.REACT_APP_API_LINK + '/payment-receipts',
        {
          params: { sessionId: ids[i]._id },
        }
      );

      let images = [];
      for (var j = 0; j < response.data.signedUrls.length; j++) {
        images.push(response.data.signedUrls[j].signedUrl);
      }
      const dataObj = {
        id: ids[i]._id,
        urls: response.data.signedUrls,
        date: ids[i].end,
        viewableImage: images,
      };
      list.push(dataObj);
    }
    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
  }
}

//Intercepts all request to the server and attaches the token to the header
axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('jwtToken_Login');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      const refreshToken = {
        refreshToken: localStorage.getItem('refreshToken'),
      };

      try {
        const newToken = await axios.post(
          process.env.REACT_APP_API_LINK + '/auth/refreshToken',
          refreshToken
        );
        sessionStorage.setItem('jwtToken_Login', newToken.data.accessToken);

        const response = {
          data: 'Refresh',
        };
        alert('Refresh the page');

        return response;
      } catch (error) {
        console.log(error);
      }
    } else if (error.response.status === 502) {
      alert('server is down');
    }
    return Promise.reject(error);
  }
);
export {
  getUsers,
  createAccount,
  googleSignIn,
  userCheck,
  getSession,
  joinSession,
  removeFromSession,
  uploadReceipt,
  createSession,
  editSession,
  getReceipts,
};
