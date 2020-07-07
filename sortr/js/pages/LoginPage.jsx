import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormWrapper from '../components/FormWrapper';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  render() {
    return (
      <FormWrapper>
        <h1>Login</h1>
        <hr />
        <Form>
          <Form.Group controlId="username">
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group>
            <Form.Text className="muted">
              Don't have an account?{' '}
              <Link to="signup">Sign Up</Link>{' '}
              now!
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default LoginPage;