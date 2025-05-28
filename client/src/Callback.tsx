import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`http://localhost:5000/callback?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("spotify_token", data.access_token);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Error exchanging code:", err);
        });
    }
  }, [navigate]);

  return <p>Logging in...</p>;
}

export default Callback;

