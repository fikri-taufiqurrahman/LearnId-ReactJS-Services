import React, { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

function NavbarComponent() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/me");
    setUser(response.data);
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/dashboard"}>Learn.Id</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* Add more Nav items here if needed */}
          </Nav>
          <Nav>
            <Nav.Item
              className="d-flex align-items-center me-3"
              style={{ color: "white" }}
            >
              <AiOutlineUser size={20} />
              <span className="ms-2">{user.name}</span>
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-light" onClick={logout}>
                <AiOutlineLogout size={20} />
                <span className="ms-2">Logout</span>
              </Button>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
