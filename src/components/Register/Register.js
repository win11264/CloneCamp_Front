import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './styleRegister.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextFieldConfig, ButtonRegisterConfig } from './muiConfig';
import axios from '../../config/axios';
import { useHistory } from 'react-router';
import { LoginRegisStatusContext } from '../../contexts/loginRegisStatus';
import { setToken } from '../../services/localStorage';
import { AuthContext } from '../../contexts/authContext';
import jwtDecode from 'jwt-decode';
import validator from 'validator';
function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const { loginStatus, setLoginStatus, registerStatus, setRegisterStatus } =
    useContext(LoginRegisStatusContext);
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [usernameInDataBase, setUsernameInDataBase] = useState([]);
  const [emailInDataBase, setEmailInDataBase] = useState([]);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorMobileNo, setErrorMobileNo] = useState('');
  const [errorBirthDate, setErrorBirthDate] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  // console.log('errorUsername', errorUsername);
  // console.log('errorFullName', errorFullName);
  useEffect(() => {
    const fetchDataAllUser = async () => {
      try {
        const response = await axios.get('/user');
        // console.log(response.data.result);
        const username = [];
        const email = [];
        for (let i = 0; i < response.data.result.length; i++) {
          username.push(response.data.result[i].username);
          email.push(response.data.result[i].email);
        }
        // console.log('username: ', username);
        // console.log('email: ', email);
        setUsernameInDataBase(username);
        setEmailInDataBase(email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAllUser();
  }, []);

  const handleSubmitRegister = async e => {
    try {
      e.preventDefault();
      if (
        username &&
        fullName &&
        birthDate &&
        email &&
        password &&
        confirmPassword &&
        mobileNo
      ) {
        setErrorUsername('');
        setErrorFullName('');
        setErrorMobileNo('');
        setErrorBirthDate('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorConfirmPassword('');
      }
      if (username === '') {
        setErrorUsername('Username is required');
      } else if (usernameInDataBase.includes(username)) {
        setErrorUsername('Username is already taken');
      }
      if (fullName === '') {
        setErrorFullName('Full name is required');
      }
      if (mobileNo === '') {
        setErrorMobileNo('Mobile no is required');
      } else if (mobileNo.length !== 10 || isNaN(mobileNo)) {
        setErrorMobileNo('Mobile no is not valid');
      }
      if (birthDate === null || birthDate === '') {
        setErrorBirthDate('Birth date is required');
      } else if (!validator.isDate(birthDate)) {
        setErrorBirthDate('Birth date is not valid');
      }
      if (email === '') {
        setErrorEmail('Email is required');
      } else if (emailInDataBase.includes(email)) {
        setErrorEmail('Email is already taken');
      } else if (!validator.isEmail(email)) {
        setErrorEmail('Email is not valid');
      }
      if (password === '') {
        setErrorPassword('Password is required');
      }
      if (confirmPassword === '') {
        setErrorConfirmPassword('Confirm password is required');
      }
      if (
        errorUsername !== '' ||
        errorFullName !== '' ||
        errorMobileNo !== '' ||
        errorBirthDate !== '' ||
        errorEmail !== '' ||
        errorPassword !== '' ||
        errorConfirmPassword !== ''
      ) {
        return;
      }
      await axios.post('/auth/register', {
        fullName,
        birthDate,
        email,
        mobileNo,
        username,
        password,
        confirmPassword,
      });
      setRegisterStatus(false);
      const res = await axios.post('/auth/login', {
        username,
        password,
      });
      // console.log(res);
      setToken(res.data.token);
      setUser(jwtDecode(res.data.token));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleCloseRegister = () => {
    setRegisterStatus(false);
  };
  const handleToggleLogin = () => {
    setLoginStatus(true);
    setRegisterStatus(false);
  };
  return (
    <>
      <div className='RegisterForm'>
        <span className='spanLogin'>Register</span>
        <form className='formRegister' onSubmit={handleSubmitRegister}>
          <div className='divRegister usernameRegister'>
            <TextField
              id='outlined-basic'
              type='text'
              label='Username'
              size='small'
              style={TextFieldConfig}
              variant='outlined'
              value={username}
              onChange={e => setUsername(e.target.value)}
              error={errorUsername !== ''}
              helperText={errorUsername}
            />
          </div>
          <div className='divRegister'>
            <TextField
              id='outlined-basic'
              type='text'
              size='small'
              label='Full Name'
              sx={TextFieldConfig}
              variant='outlined'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              error={errorFullName !== ''}
              helperText={errorFullName}
            />
          </div>
          <div className='divRegister'>
            <TextField
              id='outlined-basic'
              type='text'
              size='small'
              label='Mobile Number'
              sx={TextFieldConfig}
              variant='outlined'
              value={mobileNo}
              onChange={e => setMobileNo(e.target.value)}
              error={errorMobileNo !== ''}
              helperText={errorMobileNo}
            />
          </div>
          <div className='divRegister'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className='Config css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root'
                label='Birth Date'
                value={birthDate}
                sx={{ zIndex: 3000001, alignSelf: '' }}
                onChange={newValue => {
                  setBirthDate(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    size='small'
                    sx={TextFieldConfig}
                    error={errorBirthDate !== ''}
                    helperText={errorBirthDate}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='divRegister'>
            <TextField
              id='outlined-basic'
              type='text'
              label='Email'
              size='small'
              sx={TextFieldConfig}
              variant='outlined'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errorEmail !== ''}
              helperText={errorEmail}
            />
          </div>
          <div className='divRegister'>
            <TextField
              id='outlined-basic'
              type='password'
              label='Password'
              size='small'
              sx={TextFieldConfig}
              variant='outlined'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errorPassword !== ''}
              helperText={errorPassword}
            />
          </div>
          <div className='divRegister'>
            <TextField
              id='outlined-basic'
              type='password'
              label='ConfirmPassword'
              size='small'
              sx={TextFieldConfig}
              variant='outlined'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              error={errorConfirmPassword !== ''}
              helperText={errorConfirmPassword}
            />
          </div>
          <div className='divRegister buttonLogin'>
            <Button variant='contained' sx={ButtonRegisterConfig} type='submit'>
              Register
            </Button>
          </div>
        </form>
        <div className='divRegister'>
          <Button
            variant='contained'
            sx={ButtonRegisterConfig}
            onClick={handleToggleLogin}>
            Login
          </Button>
        </div>
      </div>
      <div className='divCloseAll' onClick={handleCloseRegister}></div>
    </>
  );
}

export default Register;
