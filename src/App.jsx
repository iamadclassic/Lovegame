// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction, update } from "firebase/database";

// ====== FIREBASE CONFIG ======
const firebaseConfig = {
  apiKey: "AIzaSyC0S_Swlmuex2H1sJAzN_TkWx2cIWV5tIY",
  authDomain: "tobiluv-d3091.firebaseapp.com",
  databaseURL: "https://tobiluv-d3091-default-rtdb.firebaseio.com",
  projectId: "tobiluv-d3091",
  storageBucket: "tobiluv-d3091.appspot.com",
  messagingSenderId: "729999841010",
  appId: "1:729999841010:web:e285d59fc7e86f9f5e226b",
  measurementId: "G-9LW01YVCRZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ====== QUESTIONS ======
const questions = [
  "What first attracted you to me?",
  "Describe our perfect date night.",
  "Name a song that always makes you think of us.",
  "What's a small thing I do that makes your day?",
  "If we had a weekend getaway, where would you take me?",
  "What's a secret skill or hobby you haven't told me about?",
  "Tell me one thing you'd like to try together.",
  "What's your favorite memory of us?",
  "Describe your ideal lazy Sunday with me.",
  "What's a compliment you wish I gave more often?",
  "Birthday and how do you like to be spoiled on your day?",
  "Worst mistake you’ve ever made in a relationship or situationship?",
  "Your greatest fear in life right now",
  "Current crush — how did y’all meet and why them?",
  "Your absolute favorite color on you and on the opposite sex",
  "Have you ever smoked? What’s your take on people who do?",
  "Do you drink? How do you really feel about drinkers?",
  "Night parties — love them or hate them? Best/worst one you’ve been to?",
  "Last time you cried and what broke you",
  "Your biggest dream in life right now",
  "Last time you touched yourself… be honest",
  "Happiest moment of your life so far",
  "Best memory that still gives you butterflies",
  "Last person you kissed and the full tea",
  "Do you watch porn? Favorite category?",
  "Your favorite body part on yourself",
  "Ever been fucked so good you cried or saw stars? Tell me about it",
  "What would actually make you cheat? Be real",
  "Are you happy where you are right now with whoever you’re talking to?",
  "Describe your best sex ever in full dirty detail",
  "Full name + nickname you actually like being called",
  "If we’re being honest… would you date me?",
  "On a scale 1–10 how much do you enjoy kissing?",
  "Kiss or cuddle — you can only pick one forever",
  "Current favorite song that’s on repeat",
  "Favorite movie that turns you on or makes you emotional",
  "Ever kissed same gender? Details or no?",
  "Do you like giving/receiving head? How good are you?",
  "Tell me one thing about your current babe/partner",
  "Ever had a full make-out session that left you shaking?",
  "Do you want to explore my body right now? Be honest",
  "Do you want to kiss me already?",
  "Straight up — do you trying to fuck me or what?",
  "Would you actually date me if I asked nicely?",
  "Ever been abused emotionally, physically, or sexually?",
  "What kind of partner do you pray for?",
  "Drop 3 of your deepest, darkest secrets right now",
  "Send me the sexiest pic you have (no pressure… but pressure)",
  "Favorite body part on the opposite gender",
  "Big dick energy or just right? Big pussy or tight?",
  "Promise you’ll kiss me the second we meet?",
  "Tell me exactly how you’re feeling about me right now",
  " Bra size + favorite color + sexiest type you own?",
  "Favorite panties/thong style you feel hottest in?",
  "Would you watch porn with me and act it out?",
  "Would you let me finger you / jerk you off on video call?",
  "Age you lost your virginity + how was it?",
  "How long is the dick / how tight are you?",
  "Player or loyal — which one are you really?",
  "Single, taken, or it’s complicated?",
  "Ever been played so bad you cried?",
  "Ever played someone and felt no remorse?",
  "Tell me your wildest sexual fantasy in detail",
  "When last did you have sex? Rate it 1–10",
  "Ever had same-gender sex or experimented?",
  "Put my picture as your DP for 1 week — yes or no?",
  "Send boobs/abs/ass pic right now (your choice)",
  "Do you sex chat? How dirty can you get?",
  "If you saw me fully naked right now, first thing you doing?",
  "Shy in person or bold as your texts?",
  "Do you sleep naked? Ever tried it?",
  "Still a virgin or nah?",
  "Biggest turn-ons and instant turn-offs?",
  "Ever begged someone for sex?",
  "Craziest thing you’ve ever done sexually or in general?",
  "Who’s your ride-or-die best friend?",
  "Real age — no cap",
  "Are you naughty or just acting like it?",
  "Naughtiest thing you’ve actually done (details!)",
  "Ever sent or received nudes?",
  "Would you let me touch you anywhere I want?",
  "Do you love me even a little bit yet?",
  "How do you like your dick/pussy — shaved, trimmed, bushy?",
  "Sex chat with me right now — yes or no?",
  "What gets you instantly wet/hard?",
  "Last time you were horny as hell?",
  "Ask me absolutely anything — I’ll answer",
  "Promise we’re having sex first chance we get?",
  "Favorite sex position — draw it if you have to",
  "How long do you want sex to last?",
  "Do you love sex or think you’re gonna love it?",
  "Spill your hottest romance story ever",
  "Describe your last sex from foreplay to finish",
  "What do you really want from me right now?",
  "Money or love — which one wins for you?",
  "Could you date a broke person?",
  "Send me a dance video — I dare you",
  "Sing me any song in voice note",
  "Have you already fantasized about me? Describe it",
  "How long could you date someone?",
  "Deep lover or casual?",
  "Would you trade love for money?",
  "What would actually make you cheat?",
  "Something your parents did that broke your heart",
  "Age you plan to marry",
  "Celebrity crush you’d let hit?",
  "Ever embarrassed yourself during sex?",
  "Ever walked in on your parents?",
  "Can you drive?",
  "Ever had car sex?",
  "Send the 7th pic in your gallery right now",
  "Describe me in one paragraph",
  "Last romantic/sexual dream — full details",
  "If I was a billionaire’s child, would you shoot your shot harder?",
  "Ever been harassed by police/SARS?",
  "Love at first sight — real or cap?",
  "Your body type — slim, thick, muscular?",
  "Would you marry who you’re talking to right now?",
  "Can you give head on period?",
  "Tattoos — yes or no?",
  "How many bodies?",
  "Money > Love or Love > Money?",
  "Scared to fall in love? Why?",
  "If I died tomorrow, what would you do?",
  "What’s my name saved as",
];

// ====== Seeded Random ======
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  s = (s * 16807) % 2147483647;
  return (s - 1) / 2147483646;
}
function getQuestionFromSeed(seed) {
  if (!seed) return "Tap SPIN to start...";
  return questions[Math.floor(seededRandom(seed) * questions.length)];
}

// ====== Persistent client ID ======
function getClientId() {
  let id = localStorage.getItem("clientId");
  if (!id) {
    id = Date.now().toString(36) + "-" + Math.floor(Math.random() * 1e9).toString(36);
    localStorage.setItem("clientId", id);
  }
  return id;
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialRoom = (params.get("r") || "").toUpperCase();

  const [name, setName] = useState("");
  const [room, setRoom] = useState(initialRoom);
  const [joined, setJoined] = useState(initialRoom !== "");
  const [clientId] = useState(getClientId);
  const [slot, setSlot] = useState(null); // "a" or "b"
  const [seed, setSeed] = useState(0);
  const [question, setQuestion] = useState("Tap SPIN to start...");
  const [myAnswer, setMyAnswer] = useState("");
  const [partnerAnswer, setPartnerAnswer] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // ====== Join Room and Claim Slot ======
  const joinRoom = async () => {
    if (!name.trim() || !room.trim()) return;
    const roomCode = room.trim().toUpperCase();
    setRoom(roomCode);
    setJoined(true);

    const roomRef = ref(db, `rooms/${roomCode}`);
    let assignedSlot = null;

    const result = await runTransaction(roomRef, (current) => {
      current = current || {};
      current.players = current.players || {};
      current.answers = current.answers || { a: "", b: "" };
      current.seed = current.seed || 0;

      if (!current.players.a) {
        current.players.a = { name, clientId, joinedAt: Date.now() };
        assignedSlot = "a";
      } else if (!current.players.b) {
        current.players.b = { name, clientId, joinedAt: Date.now() };
        assignedSlot = "b";
      }
      return current;
    });

    const players = result.snapshot.val()?.players || {};
    if (players.a?.clientId === clientId) setSlot("a");
    else if (players.b?.clientId === clientId) setSlot("b");

    window.history.replaceState({}, "", `?r=${roomCode}`);
  };

  // ====== Listen to Room Data ======
  useEffect(() => {
    if (!room) return;
    const roomRef = ref(db, `rooms/${room}`);
    const unsub = onValue(roomRef, (snapshot) => {
      const data = snapshot.val() || {};
      setSeed(data.seed || 0);
      setQuestion(getQuestionFromSeed(data.seed || 0));

      const answers = data.answers || {};
      const players = data.players || {};

      // If slot not yet assigned, detect
      if (!slot) {
        if (players.a?.clientId === clientId) setSlot("a");
        else if (players.b?.clientId === clientId) setSlot("b");
      }

      // Update partnerAnswer from DB
      if (slot === "a") setPartnerAnswer(answers.b || "");
      else if (slot === "b") setPartnerAnswer(answers.a || "");
    });
    return () => unsub();
  }, [room, slot, clientId]);

  // ====== Spin ======
  const spin = async () => {
    if (!room || isSpinning) return;
    setIsSpinning(true);
    const newSeed = Date.now();
    await update(ref(db, `rooms/${room}`), { seed: newSeed, answers: { a: "", b: "" } });
    setTimeout(() => setIsSpinning(false), 2400);
  };

  // ====== Send Answer ======
  const sendAnswer = async () => {
    if (!myAnswer.trim() || !room || !slot) return;
    await update(ref(db, `rooms/${room}/answers`), { [slot]: myAnswer.trim() });
  };

  // ====== Leave Room ======
  const leaveRoom = async () => {
    if (room && slot) await update(ref(db, `rooms/${room}/players/${slot}`), null).catch(() => {});
    setJoined(false);
    setRoom("");
    setSlot(null);
    window.history.replaceState({}, "", "/");
  };

  const slotLabel = slot === "a" ? "Player A" : slot === "b" ? "Player B" : "Spectator";

  if (!joined) {
    return (
      <div className="join-screen">
        <h1>Spicy Duo</h1>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Room code" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>JOIN & PLAY</button>
        <p>Share the link with your partner after joining.</p>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="header">
        <h1>{name} + Partner</h1>
        <p className="room-code">Room: {room}</p>
        <p style={{ fontSize: "0.9rem", color: "#ff99b3" }}>{slotLabel}</p>
      </div>

      <div className="wheel" onClick={spin}>
        <div className={`card ${isSpinning ? "spinning" : ""}`}>
          <p>{question}</p>
        </div>
      </div>

      <button onClick={spin} className="spin-btn" disabled={isSpinning}>
        {isSpinning ? "SPINNING..." : "SPIN"}
      </button>

      <div className="answers-section">
        <div className="answer-box you">
          <strong>You:</strong>
          <textarea
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows="4"
          />
          <button onClick={sendAnswer} className="send-btn" disabled={!myAnswer.trim() || !slot}>
            SEND
          </button>
        </div>

        <div className="answer-box partner">
          <strong>Partner:</strong>
          <textarea
            value={partnerAnswer}
            readOnly
            placeholder="Waiting for partner..."
            rows="4"
            style={{ cursor: "default", opacity: partnerAnswer ? 1 : 0.6 }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
        <button onClick={leaveRoom} style={{ padding: "10px 18px", borderRadius: 12 }}>Leave Room</button>
        <button
          onClick={() => {
            const shareUrl = `${window.location.origin}${window.location.pathname}?r=${room}`;
            navigator.clipboard?.writeText(shareUrl);
            alert("Link copied! Send to your partner.");
          }}
          style={{ padding: "10px 18px", borderRadius: 12 }}
        >
          Copy Invite Link
        </button>
      </div>
    </div>
  );
}
