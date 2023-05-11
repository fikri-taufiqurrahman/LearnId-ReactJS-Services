import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

function Question() {
  const { quizId } = useParams();
  const [question, setQuestion] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");
  const [fourthAnswer, setFourthAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/quiz/${quizId}/`)
      .then((response) => {
        const {
          question,
          first_answer,
          second_answer,
          third_answer,
          forth_answer,
        } = response.data;
        setQuestion(question);
        setFirstAnswer(first_answer);
        setSecondAnswer(second_answer);
        setThirdAnswer(third_answer);
        setFourthAnswer(forth_answer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [quizId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{question}</Card.Title>
        <Form>
          <Form.Check
            type="radio"
            label={firstAnswer}
            name="answer"
            id="firstAnswer"
            value={firstAnswer}
            checked={selectedAnswer === firstAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          <Form.Check
            type="radio"
            label={secondAnswer}
            name="answer"
            id="secondAnswer"
            value={secondAnswer}
            checked={selectedAnswer === secondAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          <Form.Check
            type="radio"
            label={thirdAnswer}
            name="answer"
            id="thirdAnswer"
            value={thirdAnswer}
            checked={selectedAnswer === thirdAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          <Form.Check
            type="radio"
            label={fourthAnswer}
            name="answer"
            id="fourthAnswer"
            value={fourthAnswer}
            checked={selectedAnswer === fourthAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        </Form>
        <Button variant="primary" onClick={() => console.log(selectedAnswer)}>
          Submit
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Question;
