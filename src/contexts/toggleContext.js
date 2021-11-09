import { createContext, useState } from 'react';

const ToggleContext = createContext();
function ToggleContextProvider({ children }) {
  const [toggle, setToggle] = useState(false);
  const [toggleAdminInsEdit, setToggleAdminInsEdit] = useState(false);
  return (
    <ToggleContext.Provider
      value={{ toggle, setToggle, toggleAdminInsEdit, setToggleAdminInsEdit }}>
      {children}
    </ToggleContext.Provider>
  );
}

export { ToggleContextProvider, ToggleContext };
