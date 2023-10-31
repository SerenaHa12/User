
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
  return (
    <>
    <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <div className="login-form">
          <h1 className="text-center">Login</h1>
          <Form className='my-3'>
            <Form.Group controlId="formBasicEmail" className='my-3'>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='my-3'>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" size="sm" type="submit" block>
              Log In
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
    </>
  );
};

export default Login;
