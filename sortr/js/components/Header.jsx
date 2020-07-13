import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import './Header.css';

const Header = () => {
  const { authenticated } = useAuth();

  return (
    <NavBar bg="dark" variant="dark">
    <NavBar.Brand as={Link} to={authenticated ? '/browse' : '/'} className="mr-auto">
      Sortr
    </NavBar.Brand>
    <HeaderContent />
  </NavBar>
  );
};

const HeaderContent = () => {
  const {
    authenticated,
    authenticating,
    username,
    filename,
  } = useAuth();

  if (authenticating) {
    return <Spinner className="mr-3" size="sm" variant="primary" animation="border" />;
  }

  const signOut = () => {
    const options = {
      method: 'POST',
      credentials: 'same-origin',
    };

    // TODO: Don't reload the page
    fetch('/api/v1/accounts/signout', options)
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  };

  if (authenticated) {
    return (
      <>
        <Nav variant="dark">
          <Image
            src={filename}
            height={window.screen.height / 18}
            width="auto"
            roundedCircle
          />
        </Nav>
        <Nav>
          <NavDropdown title="Your Account" id="account-nav-dropdown">
            <NavDropdown.Item disabled>
              {username}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/browse">
              Home
            </NavDropdown.Item>
            <NavDropdown.Item>
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Item>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signOut}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </>
    );
  }

  console.log(window.location.pathname);

  return (
    <Nav className="mr-sm-4">
      <Button
        variant="outline-primary"
        style={{ marginLeft: '10px' }}
        as={Link}
        to="/signup"
      >
        Sign Up
      </Button>
      <Button
        variant="outline-primary"
        style={{ marginLeft: '10px' }}
        as={Link}
        to="/login"
      >
        Log In
      </Button>
    </Nav>
  );
};

export default Header;
