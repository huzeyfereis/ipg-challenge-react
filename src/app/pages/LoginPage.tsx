import { Button, Container, Typography, TextField } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      username: e.target.value,
    }));
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const loginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      credentials.username === 'ipgautomotive' &&
      credentials.password === 'carmaker'
    ) {
      navigate('/homepage');
    } else {
      setErrorMessage('Please check your credentials!');
    }
  };

  return (
    <Container sx={{ ...containerStyles }}>
      <img
        src='/assets/images/ipg-automotive-logo.svg'
        alt='logo'
        width={300}
      />
      <form id='loginForm'>
        <TextField
          id={'username'}
          label={'Username'}
          name={'username'}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          onChange={userNameHandler}
        />
        <TextField
          onChange={passwordHandler}
          id={'password'}
          label={'Password'}
          name={'password'}
          type={'password'}
          variant='outlined'
          margin='normal'
          required
          fullWidth
        />
        <Button
          href='/homepage'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={loginHandler}
        >
          Log In
        </Button>
      </form>
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </Container>
  );
};

export default LoginPage;
