import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice.js";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="login" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center">
        <Card>
          <Card.Body>
            <div className="right">
              <h1 style={{ textAlign: "center", fontSize: "100px" }}>
                Learn.id
              </h1>
              <Form onSubmit={Auth}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <FaEnvelope size={20} /> Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <RiLockPasswordLine size={20} /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {isError && <Alert variant="primary">{message}</Alert>}

                <div className="d-flex align-items-center mb-3">
                  <BsFillPersonFill size={20} className="me-2" />
                  <Link to={"register"}>
                    Didn't have an account? Register now!
                  </Link>
                </div>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="left">
              <img src="./images/login.jpg" />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
