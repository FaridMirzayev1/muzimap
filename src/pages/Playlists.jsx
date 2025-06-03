import { useState, useEffect } from "react";
import "./Playlists.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("playlists") || "{}");
    setPlaylists(data);
  }, []);

  function handleRemoveTrack(playlistName, trackId) {
    const updated = { ...playlists };
    updated[playlistName] = updated[playlistName].filter((t) => t.id !== trackId);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  }

  function handleRemovePlaylist(playlistName) {
    const updated = { ...playlists };
    delete updated[playlistName];
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  }

  if (!Object.keys(playlists).length) {
    return (
      <div className="playlists-container">
        <div className="playlists-box">
          <h2>Your Playlists</h2>
          <div className="no-playlists">No playlists found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="playlists-container">
      <div className="playlists-box">
        <h2 className="playlist-h">Your Playlists</h2>
        {Object.entries(playlists).map(([name, tracks]) => (
          <div key={name} className="playlist-section">
            <div className="playlist-header">
              <h3 className="playlist-title">{name}</h3>
              <button className="delete-playlist-btn" onClick={() => handleRemovePlaylist(name)}>
                Delete Playlist
              </button>
            </div>
            {tracks.length === 0 ? (
              <div className="no-tracks">No tracks in this playlist.</div>
            ) : (
              <ul className="tracks-list">
                {tracks.map((track) => (
                  <li key={track.id} className="track-item">
                    <div className="track-top">
                      <div>
                        <strong>{track.name}</strong> by {track.artists.map((a) => a.name).join(", ")}
                      </div>
                      <button
                        className="remove-track-btn"
                        onClick={() => handleRemoveTrack(name, track.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <iframe
                        src={`https://open.spotify.com/embed/track/${track.id}`}
                        width="300"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media"
                        title={track.name}
                        className="track-embed"
                      ></iframe>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
