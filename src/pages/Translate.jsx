import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import NavbarComponent from "../components/Navbar";

import "./Translate.css";

function Translate() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translationDirection, setTranslationDirection] = useState("id");
  const [audioTranslated, setAudioTranslated] = useState("");

  const audioRef = useRef();

  const { listening, finalTranscript } = useSpeechRecognition();

  const translate = async (e) => {
    await axios
      .post(`http://localhost:8080/translate`, {
        text: text,
        translate_to: translationDirection,
      })
      .then((response) => {
        setTranslatedText(response.data.translated_text);
        setAudioTranslated(response.data.audio_path);
      })
      .catch((error) => console.log(error));
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTranslationDirectionChange = (e) => {
    setTranslationDirection(e.target.value);
  };

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleRecord = () => {
    setText(finalTranscript);
  };

  return (
    <div>
      <NavbarComponent />
      <div className="translate">
        <Container>
          <h1>Translate</h1>

          <p>Microphone: {listening ? "on" : "off"}</p>
          <Button
            variant="primary"
            onClick={() => {
              SpeechRecognition.startListening();
            }}
          >
            Start
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              SpeechRecognition.stopListening();
              handleRecord();
            }}
          >
            Stop
          </Button>

          <Form.Group>
            <Form.Label>Translation Direction:</Form.Label>
            <Form.Control
              as="select"
              value={translationDirection}
              onChange={handleTranslationDirectionChange}
            >
              <option value="id">English to Indonesian</option>
              <option value="en">Indonesian to English</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Text to Translate:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={handleTextChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={translate}>
            Translate
          </Button>
          <Form.Group className="mt-3">
            <Form.Label>Translated Text:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={translatedText}
              readOnly
            />
          </Form.Group>
          {audioTranslated && (
            <div>
              <audio ref={audioRef} src={audioTranslated} />
              <Button className="mr-2" onClick={handlePlay}>
                Play
              </Button>
              <Button onClick={handlePause}>Pause</Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Translate;
