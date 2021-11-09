import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axios';
const CategoryContext = createContext();
function CategoryContextProvider({ children }) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await axios.get('/category');
        setCategory(response.data.category);
        // console.log(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCategory();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContextProvider, CategoryContext };
