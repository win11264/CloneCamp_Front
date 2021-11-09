import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userById, setUserById] = useState({});
  const [userCourseId, setUserCourseId] = useState([]);
  const [toggleUser, setToggleUser] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await axios.get('/user/userId');
        const response = await axios.get(`/mycourse/my`);
        const myCourse = response.data.result.map(item => item.courseId);
        const response2 = await axios.get('/user');
        setUserCourseId(myCourse);

        // console.log('userById', response.data.result);
        // console.log(`data`, data.data.result);
        // console.log('allUser: ', response2.data.result);
        setUserById(data.data.result);
        setAllUser(response2.data.result);
      } catch (error) {}
    };
    fetchUser();
  }, [toggleUser]);
  // console.log('userCourseId', userCourseId);
  // console.log('userById', userById);
  return (
    <UserContext.Provider
      value={{
        userById,
        setUserById,
        userCourseId,
        setUserCourseId,
        toggleUser,
        setToggleUser,
        allUser,
        setAllUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
