import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PublicPage from './pages/PublicPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './auth/PrivateRoute';
import { AuthContext } from './auth/auth';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false,
      username: '',
      filename: ''
    };
  }

  componentDidMount() {
    this.setState({
      authenticated: true,
      username: 'admin',
      filename: '/static/assets/default_profile_pic.png'
    });
  }

  render() {
    const { authenticated, username, filename } = this.state;
    const browseHomePath = btoa('home/');

    return (
      <AuthContext.Provider value={{
        authenticated: authenticated,
        username: username,
        filename: filename
      }}>
        <Router>
          <div>

            <Header></Header>

            <Switch>
              <Route exact path="/">
                <PublicPage></PublicPage>
              </Route>
              <Route path="/login">
                <LoginPage></LoginPage>
              </Route>
              <Route path="/signup">
                <SignUpPage></SignUpPage>
              </Route>
              {/* TODO: Make a protected Route */}
              <Route path="/browse/:pathHash">
                <HomePage></HomePage>
              </Route>
              <Route path="/browse">
                <Redirect to={`/browse/${browseHomePath}`} />
              </Route>
            </Switch>

          </div>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default Main;