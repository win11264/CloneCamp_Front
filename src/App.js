import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { AuthContext } from './contexts/authContext';
import { useContext, useState } from 'react';
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import routes from './config/route';
import Login from './components/Login/Login';
import { LoginRegisStatusContext } from './contexts/loginRegisStatus';
import Register from './components/Register/Register';

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { loginStatus, setLoginStatus, registerStatus, setRegisterStatus } =
    useContext(LoginRegisStatusContext);
  const [role, setRole] = useState(user ? user.role : 'guest');
  console.log(role);
  return (
    <>
      <BrowserRouter>
        {loginStatus === true && <Login />}
        {registerStatus === true && <Register />}
        <Header />
        {role && (
          <Switch>
            {routes[role].route.map(item => (
              <Route
                key={item.path}
                exact
                path={item.path}
                component={item.component}
              />
            ))}
            <Redirect to={routes[role].redirect} />
          </Switch>
        )}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
