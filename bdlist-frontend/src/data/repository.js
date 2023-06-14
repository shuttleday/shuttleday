import axios from 'axios';
import dayjs from 'dayjs';
import { tokens } from '../constants';

const serverAdd = import.meta.env.VITE_API_LINK;

//Used for room admin authentication
async function userCheck(email, roomId) {
  try {
    const user = await axios.get(`${serverAdd}/rooms/${roomId}/users/${email}`);
    return user.data;
  } catch (error) {
    throw error;
  }
}

//Simple get all user function for admins to see
async function getUsers(roomId) {
  try {
    const response = await axios.get(serverAdd + `/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function promoteUser(roomId, email) {
  try {
    const response = await axios.patch(
      serverAdd + `/rooms/${roomId}/users/${email}/promote`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function demoteUser(roomId, email) {
  try {
    const response = await axios.patch(
      serverAdd + `/rooms/${roomId}/users/${email}/demote`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Creates an account for new users automatically with their given username (also requires google jwt)
async function createAccount(username) {
  const data = {
    username: username,
  };

  try {
    const response = await axios.post(serverAdd + '/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Sends the google jwt token for verification and returns a refresh token and access token
async function googleSignIn() {
  try {
    const response = await axios.post(serverAdd + '/auth/signin');
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Get the list of players that are joining the session
async function getSession(roomId) {
  try {
    const today = dayjs();
    const past = today.subtract(8, 'day');
    const future = today.add(8, 'day');

    const response = await axios.get(serverAdd + `/rooms/${roomId}/sessions`, {
      params: { fromDate: past.toISOString(), toDate: future.toISOString() },
    });

    let modify = response.data;
    for (var i = 0; i < modify.gameSessions.length; i++) {
      let courtList = modify.gameSessions[i].courts.map((str) => Number(str));
      const players = modify.gameSessions[i].players.slice().reverse();
      modify.gameSessions.court = courtList;
      modify.gameSessions.players = players;
    }

    return modify;
  } catch (error) {
    console.log(error);
  }
}

//Adds current user to the existing session
async function joinSession(sessionId) {
  try {
    const response = await axios.post(
      serverAdd + `/sessions/${sessionId}/players`
    );
    return response.data.players;
  } catch (error) {
    throw error;
  }
}

//Removes user from the existing session
//Delete requests with a body need it to be set under a data key
//https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
async function removeFromSession(sessionId) {
  try {
    const response = await axios.delete(
      serverAdd + `/sessions/${sessionId}/players`
    );
    return response.data.players;
  } catch (error) {
    throw error;
  }
}

//Uploads the receipt with formdata to the server
async function uploadReceipt(image, sessionId) {
  const formData = new FormData();
  formData.append('receipt', image);
  formData.append('sessionId', sessionId);
  try {
    const response = await axios.post(serverAdd + '/user-payments', formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Creates a session only if an admin is making the request
async function createSession(sessionData, roomId) {
  try {
    const response = await axios.post(
      serverAdd + `/rooms/${roomId}/sessions`,
      sessionData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Edit existing sessions
async function editSession(sessionData) {
  try {
    const response = await axios.patch(
      serverAdd + `/sessions/${sessionData.sessionId}`,
      sessionData
    );

    return response;
  } catch (error) {
    throw error;
  }
}

//Gets receipts of players and modify it into custom object type for display
async function getReceipts(id) {
  try {
    const response = await axios.get(serverAdd + '/payment-receipts', {
      params: { sessionId: id },
    });

    let images = [];
    for (var j = 0; j < response.data.signedUrls.length; j++) {
      images.push(response.data.signedUrls[j].signedUrl);
    }

    const dataObj = {
      urls: response.data.signedUrls,
      viewableImage: images,
    };

    return dataObj;
  } catch (error) {
    throw error;
  }
}

async function uploadQR(image) {
  const formData = new FormData();
  formData.append('my-qr', image);
  try {
    const response = await axios.post(serverAdd + '/admins/qr', formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function editQR(image) {
  const formData = new FormData();
  formData.append('file', image);
  try {
    const response = await axios.patch(serverAdd + '/admins/qr', formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getQR(email) {
  try {
    const response = await axios.get(serverAdd + `/admins/qr/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRooms() {
  try {
    const response = await axios.get(serverAdd + '/rooms?limit=10&offset=0');
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getRoomByID(id) {
  try {
    const response = await axios.get(serverAdd + `/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createRoom(data) {
  try {
    const response = await axios.post(serverAdd + '/rooms', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function joinRoom(password, roomId) {
  try {
    const response = await axios.post(
      serverAdd + `/rooms/${roomId}/users`,
      password
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function leaveRoom(roomId) {
  try {
    const response = await axios.delete(serverAdd + `/rooms/${roomId}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteRoom(roomId) {
  try {
    const response = await axios.delete(serverAdd + `/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function editRoom(roomId, data) {
  try {
    const response = await axios.patch(serverAdd + `/rooms/${roomId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Intercepts all request to the server and attaches the token to the header
axios.interceptors.request.use(function (config) {
  if (
    config.url === serverAdd + '/auth/signin' ||
    config.url === serverAdd + '/auth/register'
  ) {
    const Gtoken = localStorage.getItem(tokens.google);
    config.headers.Authorization = `Bearer ${Gtoken}`;
    return config;
  } else {
    const token = localStorage.getItem(tokens.jwt);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      const refreshToken = {
        refreshToken: localStorage.getItem(tokens.refresh),
      };

      try {
        const newToken = await axios.post(
          serverAdd + '/auth/refreshToken',
          refreshToken
        );
        localStorage.setItem(tokens.jwt, newToken.data.accessToken);

        const response = {
          data: 'Refresh',
        };
        alert('Page is going to refresh');

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
  uploadQR,
  editQR,
  getQR,
  getRooms,
  createRoom,
  joinRoom,
  getRoomByID,
  leaveRoom,
  deleteRoom,
  editRoom,
  promoteUser,
  demoteUser,
};
