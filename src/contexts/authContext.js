import { createContext, useEffect, useState } from 'react';
import { user as initialUser } from '../services/localStorage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log('user', user);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user.role === 'admin' || user.role === 'user') {
  //       const response = await fetch('/api/users/all');
  //       const data = await response.json();
  //       setUserData(data);
  //     }
  //   };
  //   fetchUserData();
  // }, [user]);
  // if (user.role === 'admin' || user.role === 'user') {
  // }

  return (
    <AuthContext.Provider
      value={{ user, setUser, toggle, setToggle, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
