import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/users", {
          name: firstName + " " + lastName,
          email: email,
          password: password,
          confPassword: confPassword,
        })
        .then((response) => {
          setIsMessage(true);
          setMessage(response.data.msg);
        });
    } catch (error) {
      if (error.response) {
        setIsMessage(true);
        setMessage(error.response.data.msg);
      }
    }
  };

  const navigate = useNavigate("/");
  return (
    <div className="register" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center">
        <Card>
          <Card.Body>
            <div className="right">
              <h1 style={{ textAlign: "center", fontSize: "100px" }}>
                Learn.id
              </h1>
              <Form onSubmit={register}>
                <Row>
                  <Col className="mb-3">
                    <Form.Label>
                      <FaUser /> First Name
                    </Form.Label>
                    <Form.Control
                      placeholder="First name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>
                      <FaUser /> Last Name
                    </Form.Label>
                    <Form.Control
                      placeholder="Last name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <FaEnvelope /> Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        <FaLock /> Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        <FaLock /> Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {isMessage && <Alert>{message}</Alert>}

                <div></div>
                <Button variant="primary" type="submit">
                  <Link to={"/"}>Back to Login</Link>
                </Button>

                <Button variant="primary" className="m-3" type="submit">
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

export default Register;
