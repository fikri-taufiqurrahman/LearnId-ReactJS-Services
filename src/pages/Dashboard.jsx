import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../features/authSlice";
import NavbarComponent from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiOutlinePlayCircle,
  AiOutlineScan,
  AiOutlineGlobal,
  AiFillCheckCircle,
} from "react-icons/ai";
import "./Dashboard.css";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div className="dashboard">
      <NavbarComponent />
      <div className="d-flex justify-content-center mt-5">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={6} md={3}>
              <Link to={"/quiz"}>
                <div className="dashboard-menu rounded border p-4 text-center">
                  <AiOutlinePlayCircle size={50} />
                  <h4 className="mt-2">Start Lesson</h4>
                </div>
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <Link to={"/scantotranslate"}>
                <div className="dashboard-menu rounded border p-4 text-center">
                  <AiOutlineScan size={50} />
                  <h4 className="mt-2">Scan to Translate</h4>
                </div>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={6} md={3}>
              <Link to={"/translate"}>
                <div className="dashboard-menu rounded border p-4 text-center">
                  <AiOutlineGlobal size={50} />
                  <h4 className="mt-2">Translate</h4>
                </div>
              </Link>
            </Col>
            <Col xs={6} md={3}>
              <div className="dashboard-menu rounded border p-4 text-center">
                <AiFillCheckCircle size={50} />
                <h4 className="mt-2">Result</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
