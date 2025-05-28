import { useEffect } from "react";

function App() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login"; // ✅ Fixed protocol and port
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token"); // ✅ Correct param name (lowercase)

    if (accessToken) {
      localStorage.setItem("spotify_token", accessToken);
    }
  }, []);

  return (
    <div className="App">
      <h1>Spotify Playlist Generator</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default App;
