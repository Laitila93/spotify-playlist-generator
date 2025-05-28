const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Route
app.get("/", (req, res) => {
    res.send("Welcome to the node server!!");
});

app.get("/login", (req, res) => {
    const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private"
    const authUrl = `https://accounts.spotify.com/authorize?${qs.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
    })}`;
    res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", qs.stringify({
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;
    res.redirect(
  `${process.env.FRONTEND_URI}/?${qs.stringify({
    access_token,
    refresh_token,
    expires_in,
  })}`
);

  } catch (error) {
    console.error("Token error", error.response?.data || error.message);
    res.sendStatus(400);
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});