import { useEffect, useState } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
}

function App() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [enteredTexts, setEnteredTexts] = useState([]);

  const handleStart = () => recognition.start();

  useEffect(() => {
    recognition.addEventListener('result', (e) => {
      const newText = e.results[0][0].transcript;
      setText(newText);
      setEnteredTexts((prevTexts) => [...prevTexts, newText]);
    });

    recognition.addEventListener('start', () => setListening(true));
    recognition.addEventListener('end', () => setListening(false));
  }, []);

  return (
    <div className='container'>
      <div className="toDo-wrapper">
        {enteredTexts.map((enteredText, index) => (
          <div className='list' key={index}>{enteredText}</div>
        ))}
      </div>
      <button onClick={handleStart}>
        {listening ? 'tinglashda...' : 'Boshlash'}
      </button>
    </div>
  );
}

export default App;
