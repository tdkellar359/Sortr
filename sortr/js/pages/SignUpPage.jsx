import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';

class SignUpPage extends React.Component {
  render() {
    return (
      <FormWrapper>
        <h1>Sign Up</h1>
        <hr />
        <Form>
          <Form.Group controlId="username">
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control type="text" placeholder="Username" required />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Email" />
            <Form.Text className="text-muted">
              Your email will ONLY be used to contact you if you are locked out of your account.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" required />
          </Form.Group>

          <Form.Group>
            <Form.Text>
              Already have an account?{' '}
              <Link to="signup">Log In</Link>{' '}
              now!
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default SignUpPage;