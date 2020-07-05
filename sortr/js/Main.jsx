import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PublicPage from './pages/PublicPage';
import HomePage from './pages/HomePage';
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
  }

  render() {
    return (
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
            <Route path="/home">
              <HomePage></HomePage>
            </Route>
            <Route path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

export default Main;