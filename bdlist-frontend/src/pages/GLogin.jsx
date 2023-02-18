import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const GLogin = () => {
  function onResponse(response) {
    console.log(response);
    const user = jwt_decode(response.credential);
    console.log(user);
  }
  return (
    <div>
      <GoogleLogin
        onSuccess={(response) => {
          onResponse(response);
        }}
        onError={(response) => console.log('error')}
      />
    </div>
  );
};

export default GLogin;
