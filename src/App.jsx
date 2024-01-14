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
  const [inputText, setInputText] = useState(""); // New state to hold input text

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

  function handleClick() {
    // Add the input text to enteredTexts
    setEnteredTexts((prevTexts) => [...prevTexts, inputText]);
    // Clear the input field
    setInputText("");
  }

  return (
    <div className='container'>
      <div className="toDo-wrapper">
        {enteredTexts.map((enteredText, index) => (
          <div className='list' key={index}>{enteredText}</div>
        ))}
      </div>
      <button onClick={handleStart}>
        {listening ? 'tinglashda...' : 'Ovozli qoshish'}
      </button>
      <div className="ToDoInput">
        <input
          type="search"
          className='Search'
          placeholder='Malumot kiriting'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleClick}>Saqlash</button>
      </div>
    </div>
  );
}

export default App;
