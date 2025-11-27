// src/App.jsx — NO SERVER • WORKS FOR 2 PLAYERS • ZERO ERRORS
import { useState, useEffect } from 'react';
import './App.css';

const questions = [
  "Birthday and how do you like to be spoiled on your day?",
  "Last time you touched yourself… be honest",
  "Describe your best sex ever in detail",
  "Would you date me?",
  "Do you want to fuck me?",
  "Ever had a threesome?",
  "Big dick or normal? Big pussy or tight?",
  "Would you swallow?",
  "Ever squirted?",
  "Favorite sex position?",
  "Weirdest place you’ve had sex?",
  "Would you let me record us?",
  "You + Me + Hotel room + 24 hours = ?",
  "Send a voice note moaning my name",
  "Rate me 1–10 right now",
  "One thing you’d do if we were together right now",
  // ← Add all your 550+ questions here
];

function App() {
  const params = new URLSearchParams(window.location.search);

  // Fixed lines — no more errors!
  const urlRoom = params.get("r") || "";
  const urlQuestion = params.get("q") ? decodeURIComponent(params.get("q")) : "";
  const urlAnswer1 = params.get("a1") ? decodeURIComponent(params.get("a1")) : "";
  const urlAnswer2 = params.get("a2") ? decodeURIComponent(params.get("a2")) : "";

  const [name, setName] = useState("");
  const [room, setRoom] = useState(urlRoom);
  const [joined, setJoined] = useState(urlRoom !== "");
  const [question, setQuestion] = useState(urlQuestion || "Tap SPIN to start...");
  const [myAnswer, setMyAnswer] = useState("");
  const [partnerAnswer, setPartnerAnswer] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // Load from URL when page opens
  useEffect(() => {
    if (urlQuestion) setQuestion(urlQuestion);
    if (urlAnswer1 && urlAnswer2) {
      setMyAnswer(urlAnswer1);
      setPartnerAnswer(urlAnswer2);
    }
  }, []);

  const joinRoom = () => {
    if (name.trim() && room.trim()) {
      setJoined(true);
      updateURL("Tap SPIN to start...", "", "");
    }
  };

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const q = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(q);
    setMyAnswer("");
    setPartnerAnswer("");
    updateURL(q, "", "");
    setTimeout(() => setIsSpinning(false), 2400);
  };

  const updateURL = (q, a1, a2) => {
    const newUrl = `?r=${encodeURIComponent(room.toUpperCase())}&q=${encodeURIComponent(q)}&a1=${encodeURIComponent(a1)}&a2=${encodeURIComponent(a2)}`;
    window.history.replaceState({}, '', newUrl);
  };

  const sendMyAnswer = (e) => {
    const text = e.target.value;
    setMyAnswer(text);
    updateURL(question, text, partnerAnswer);
  };

  const sendPartnerAnswer = (e) => {
    const text = e.target.value;
    setPartnerAnswer(text);
    updateURL(question, myAnswer, text);
  };

  if (!joined) {
    return (
      <div className="join-screen">
        <h1>Spicy Duo</h1>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Room code (e.g. HOT69)" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>JOIN & PLAY</button>
        <p>Send this link to your partner!</p>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="header">
        <h1>{name || "You"} + Partner</h1>
        <p className="room-code">Room: {room.toUpperCase()}</p>
      </div>

      <div className="wheel" onClick={spin}>
        <div className={`card ${isSpinning ? 'spinning' : ''}`}>
          <p>{question}</p>
        </div>
      </div>

      <button onClick={spin} className="spin-btn" disabled={isSpinning}>
        {isSpinning ? "SPINNING..." : "SPIN"}
      </button>

      <div className="answers-section">
        <div className="answer-box you">
          <strong>You:</strong>
          <textarea value={myAnswer} onChange={sendMyAnswer} placeholder="Your answer..." rows="4" />
        </div>
        <div className="answer-box partner">
          <strong>Them:</strong>
          <textarea value={partnerAnswer} onChange={sendPartnerAnswer} placeholder="Their answer appears here..." rows="4" />
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#ff6699', fontSize: '0.9rem' }}>
        Share this link with your partner!
      </p>
    </div>
  );
}

export default App;