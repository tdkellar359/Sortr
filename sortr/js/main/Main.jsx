import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './AuthPages/LoginPage';
import SignUpPage from './AuthPages/SignUpPage';
import PublicPage from './PublicPage/PublicPage';
import HomePage from './HomePage/HomePage';
import PrivateRoute from '../components/PrivateRoute';
import { AuthContextProvider } from '../context/AuthContext';
import useAuth from '../context/useAuth';
import Header from './Header/Header';

const Main = () => (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

const App = () => {
  const {
    auth,
    authenticationSuccess,
    authenticationEnd,
  } = useAuth();

  console.log('[Main.jsx] auth', auth);
  if (!auth.finished && !auth.authenticating) {
    fetch('/api/v1/accounts/authenticate')
      .then((res) => {
        if (!res.ok) {
          Promise.reject(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          const { username, filename } = data.data;

          authenticationSuccess(username, filename);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('[Main.tsx]: Calling authenticationEnd()');
        authenticationEnd();
      });
  }

  const browseHomePath = btoa('home/');
  return (
    <Router>
      <div>

        <Header />

        <Switch>
          <Route exact path="/">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <PrivateRoute path="/browse/:pathHash">
            <HomePage />
          </PrivateRoute>
          <Route path="/browse">
            <Redirect to={`/browse/${browseHomePath}`} />
          </Route>
        </Switch>

      </div>
    </Router>
  );
};

export default Main;
