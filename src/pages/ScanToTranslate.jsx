import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Form, Container, Image } from "react-bootstrap";
import NavbarComponent from "../components/Navbar";
import "./ScanToTranslate.css";

const ScanToTranslate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translationDirection, setTranslationDirection] = useState("id");
  const [audioTranslated, setAudioTranslated] = useState("");

  const audioRef = useRef();

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    axios
      .post("http://127.0.0.1:8080/ocr", data)
      .then((response) => {
        setText(response.data.sentence);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleTranslationDirectionChange = (e) => {
    setTranslationDirection(e.target.value);
  };

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <NavbarComponent />
      <Container>
        <div className="form-container">
          <div className="image-container">
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                className="selected-image"
              />
            )}
          </div>
          <Form>
            <Form.Group>
              <Form.Label>Select an image:</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" onClick={onClickHandler}>
              Upload
            </Button>
          </Form>
        </div>
        <Form>
          <Form.Group>
            <Form.Label>OCR Result:</Form.Label>
            <Form.Control as="textarea" rows={3} value={text} readOnly />
          </Form.Group>
        </Form>
      </Container>
      <Container>
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
  );
};

export default ScanToTranslate;
