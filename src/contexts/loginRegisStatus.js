import { createContext, useState } from 'react';

const LoginRegisStatusContext = createContext();
function LoginRegisStatusContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);
  // console.log('loginStatus: ', loginStatus);
  return (
    <LoginRegisStatusContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        registerStatus,
        setRegisterStatus,
      }}>
      {children}
    </LoginRegisStatusContext.Provider>
  );
}

export { LoginRegisStatusContext, LoginRegisStatusContextProvider };
