import { createContext, useState } from 'react';

const PaginationContext = createContext();

function PaginationProvider({ children }) {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContext.Provider
      value={{
        perPage: perPage,
        setPerPage: setPerPage,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
      }}>
      {children}
    </PaginationContext.Provider>
  );
}

export { PaginationProvider, PaginationContext };
