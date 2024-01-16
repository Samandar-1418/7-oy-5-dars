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
  const [inputText, setInputText] = useState("");

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
  
    setEnteredTexts((prevTexts) => [...prevTexts, inputText]);
    
    setInputText("");
  }
  function handleDelete(index) {
  x
    setEnteredTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
  }
  

  return (
    <div className='container'>
      <div className="toDo-wrapper">
      {enteredTexts.map((enteredText, index) => (
  <div className='list' key={index}>
    {enteredText} 
    <button onClick={() => handleDelete(index)}>Delete</button>
  </div>
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
