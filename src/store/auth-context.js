import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  id: '',
  phone: '',
  name: '',
  avatar: '',
  login: (token, expirationTime, id, phone, name, avatar) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedId = localStorage.getItem('id');
  const storedPhone = localStorage.getItem('phone');
  const storedName = localStorage.getItem('name');
  const storedAvatar = localStorage.getItem('avatar');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    id: storedId,
    phone: storedPhone,
    name: storedName,
    avatar: storedAvatar,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialId;
  let initialPhone;
  let initialName;
  let initialAvatar;
  if (tokenData) {
    initialToken = tokenData.token;
    initialId = tokenData.id;
    initialPhone = tokenData.phone;
    initialName = tokenData.name;
    initialAvatar = tokenData.avatar;
  }

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(initialId);
  const [phone, setPhone] = useState(initialPhone);
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState(initialAvatar);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('id');
    localStorage.removeItem('phone');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, id, phone, name, avatar) => {
    
    setToken(token);
    setId(id);
    setPhone(phone);
    setName(name);
    setAvatar(avatar);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('id', id);
    localStorage.setItem('phone', phone);
    localStorage.setItem('name', name);
    localStorage.setItem('avatar', avatar);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    id: id,
    phone: phone,
    name: name,
    avatar: avatar,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;