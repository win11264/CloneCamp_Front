import { createContext, useEffect, useState } from 'react';
import { user as initialUser } from '../services/localStorage';

const TogglePageContext = createContext();

function TogglePageContextProvider({ children }) {
  const [alignmentHistory, setAlignmentHistory] = useState('myProfile');
  const [alignmentDashboard, setAlignmentDashboard] = useState('2');

  // console.log('user', user);
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
    <TogglePageContext.Provider
      value={{
        alignmentHistory,
        setAlignmentHistory,
        alignmentDashboard,
        setAlignmentDashboard,
      }}>
      {children}
    </TogglePageContext.Provider>
  );
}

export { TogglePageContext, TogglePageContextProvider };
