import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import {
  BsFileText,
  BsBook,
  BsPeople,
  BsBriefcase,
  BsBookHalf,
} from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import "./Quiz.css";
import NavbarComponent from "../components/Navbar";

const Quiz = () => {
  const quizId = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/quiz")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [quizId]);

  return (
    <div className="quiz-page">
      <NavbarComponent />

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.name} className="quiz-item">
            <div onClick={() => handleShow(quiz)}>
              {quiz.level === 1 && (
                <BsFileText className="icon" size={50} md={6} />
              )}
              {quiz.level === 2 && <BsBook className="icon" size={50} md={6} />}
              {quiz.level === 3 && (
                <BsPeople className="icon" size={50} md={6} />
              )}
              {quiz.level === 4 && (
                <BsBriefcase className="icon" size={50} md={6} />
              )}
              {quiz.level === 5 && (
                <BsBookHalf className="icon" size={50} md={6} />
              )}
              <h2>{quiz.name}</h2>
            </div>
          </div>
        ))}
      </div>
      {selectedQuiz && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedQuiz.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedQuiz.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Link to={`${selectedQuiz.level}/question/1`}>
              <Button variant="primary" onClick={handleClose}>
                Start Quiz
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Quiz;
