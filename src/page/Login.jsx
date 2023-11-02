import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { postLoginUser } from "../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }

      let res = await postLoginUser(email, password);
      console.log("res", res);

      if (res && res.token) {
        localStorage.setItem("token", res.token);
        toast.success(`Login Success`);
        navigate("/");
      } else {
        // toast.error(res.error);
      }
      console.log("check token", res, res.token);
    } catch (error) {
      console.log("check", error.message);
      toast.error(`An error occurred: ${error.response.data.error}`);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="login-form">
              <h1 className="text-center">Login</h1>
              <Form className="my-3" onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="my-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    // value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="my-3">
                  <Form.Control
                    type="password"
                    // value="cityslicka"
                    placeholder="Password"
                    // value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  block="true"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
                <div className="back mx-auto">
                  <a href="#">Go Back</a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
