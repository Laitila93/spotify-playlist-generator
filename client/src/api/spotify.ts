// client/src/api/spotify.ts
import axios from "axios";

// Get current user's Spotify profile
export const getUserProfile = async (token: string) => {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get user's playlists
export const getUserPlaylists = async (token: string) => {
  const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create a new playlist for the given user
export const createPlaylist = async (token: string, userId: string, name = "My Generated Playlist") => {
  const response = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      name,
      description: "Created with Spotify Playlist Generator",
      public: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Add tracks to a playlist
export const addTracksToPlaylist = async (token: string, playlistId: string, trackUris: string[]) => {
  const response = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris: trackUris,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
