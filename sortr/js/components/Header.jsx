import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../auth/auth';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <NavBar bg="dark" variant="dark">
      <NavBar.Brand as={Link} to="/browse" className="mr-auto">
        Sortr
      </NavBar.Brand>
      <HeaderContent />
    </NavBar>
  );
}

const HeaderContent = (props) => {
  const auth = useAuth();

  if (auth.authenticated)
    return (
      <React.Fragment>
        <Nav variant="dark">
            <Image 
              src={auth.filename}
              height={screen.height / 18}
              width="auto"
              roundedCircle
            />
        </Nav>
        <Nav>
          <NavDropdown title="Your Account" id="account-nav-dropdown">
            <NavDropdown.Item disabled={true}>
              {auth.username}
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
            <NavDropdown.Item>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </React.Fragment>
    );
  else
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
}

export default Header;