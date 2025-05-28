// client/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists } from "./api/spotify"; // <-- Import here
import { createPlaylist, addTracksToPlaylist } from "./api/spotify";


function Home() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("spotify_token"));
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      sessionStorage.setItem("spotify_token", accessToken);
      setToken(accessToken);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const userData = await getUserProfile(token);
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [token]);

      const fetchPlaylists = async () => {
      if (!token) return;

      try {
        const playlistData = await getUserPlaylists(token);
        console.log("Raw playlist data:", playlistData); // <-- Inspect this in the browser console
        setPlaylists(playlistData.items);
      } catch (err) {
        console.error("Failed to fetch playlists", err);
      }
    };

    const handleCreatePlaylist = async () => {
      if (!token || !user?.id) return;

      try {
        const playlist = await createPlaylist(token, user.id);
        console.log("Created playlist:", playlist);

        await addTracksToPlaylist(token, playlist.id, ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"]);
        console.log("Tracks added!");
      } catch (err) {
        console.error(err);
      }
    };


  return (
    <div>
      <h1>Spotify Playlist Generator</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <p>You are logged in!</p>
          {user && (
            <div>
              <h2>Welcome, {user.display_name}</h2>
              <p>Email: {user.email}</p>
              {user.images?.[0]?.url && (
                <img src={user.images[0].url} alt="User avatar" width="100" />
              )}
              
              <button onClick={fetchPlaylists}>get playlists</button>
              <p>Click the button to create a playlist and add a sample track.</p>
              <button onClick={handleCreatePlaylist}>create playlist</button>
                <p>
                  Playlists:
                  <br />
                  {playlists.map((playlist, index) => (
                    <span key={playlist.id || index}>
                      {playlist.name}
                      <br />
                    </span>
                  ))}
                </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
