import { BrowserRouter, Routes, Route } from "react-router-dom";
import Callback from "./Callback.tsx";


function Home() {
  const token = localStorage.getItem("spotify_token");

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div>
      <h1>Spotify Playlist Generator</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <p>You are logged in!</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}