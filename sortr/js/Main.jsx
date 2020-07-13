import React, { Component, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PublicPage from './pages/PublicPage';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './auth/PrivateRoute';
import { AuthContext } from './auth/auth';
import Header from './components/Header';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      authenticating: true,
      authenticated: false,
      username: '',
      filename: '',
    };
  }

  componentDidMount() {
    fetch('/api/v1/accounts/authenticate')
      .then((res) => {
        if (!res.ok) {
          Promise.reject(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          const userInfo = data.data;
          this.setState({
            authenticated: true,
            username: userInfo.username,
            filename: userInfo.filename,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setState({
          authenticating: false,
        });
      });
  }

  render() {
    const browseHomePath = btoa('home/');
    const {
      authenticating,
      authenticated,
      username,
      filename,
    } = this.state;

    return (
      <AuthContext.Provider
        value={{
          authenticating,
          authenticated,
          username,
          filename,
        }}
      >
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
      </AuthContext.Provider>
    );
  }
}

export default Main;
