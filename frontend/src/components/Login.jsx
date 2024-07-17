import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { API } from '../service/api';
import { DataContext } from './context/DataProvider';

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: 100px auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Image = styled('img')({
  width: 100,
  margin: 'auto',
  display: 'flex',
});

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
  confirmPassword: ''
};

const loginInitialValues = {
  username: '',
  password: ''
};

const Login = ({ isUserAuthenticated }) => {
  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const [isLogin, setIsLogin] = useState(false);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const [login, setLogin] = useState(loginInitialValues);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleAccount = () => {
    setIsLogin(!isLogin);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError('');
        setSignup(signupInitialValues);
        toggleAccount(); 
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        setError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount({ username: response.data.username, name: response.data.name })

        isUserAuthenticated(true);

        navigate('/');


      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Something went wrong ! Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <Component>
      <Image src={imageURL} alt="logo" />
      {!isLogin ? (
        <>
          <TextField variant="standard" onChange={(e) => onInputChange(e)} label="Full Name" name="name" />
          <TextField variant="standard" onChange={(e) => onInputChange(e)} label="Username" name="username" />
          <TextField variant="standard" onChange={(e) => onInputChange(e)} label="Password" type="password" name="password" />
          
          {error && <Error>{error}</Error>}
          <Button onClick={signupUser} variant="contained" sx={{ backgroundColor: '#13274F' }}>
            Sign Up
          </Button>
          <Typography sx={{ textAlign: 'center' }}>OR</Typography>
          <Button variant="text" sx={{ color: '#13274F' }} onClick={toggleAccount}>
            Already have an account? Login
          </Button>
        </>
      ) : (
        <>
          <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Username" />
          <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="Password" type="password" />
          {error && <Error>{error}</Error>}
          <Button variant="contained" onClick={loginUser} sx={{ backgroundColor: '#13274F' }}>
            Login
          </Button>
          <Typography sx={{ textAlign: 'center' }}>OR</Typography>
          <Button variant="text" sx={{ color: '#13274F' }} onClick={toggleAccount}>
            Create an account
          </Button>
        </>
      )}
    </Component>
  );
};

export default Login;
