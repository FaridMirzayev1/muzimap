import { useState, useEffect } from "react";
import "./TrackList.css";

const getPlaylists = () => {
  return JSON.parse(localStorage.getItem("playlists") || "{}");
};

const savePlaylists = (playlists) => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

export default function HorizontalTracksList({ tracks }) {
  const [playlists, setPlaylists] = useState(getPlaylists());
  const [expandedTrack, setExpandedTrack] = useState(null);

  function refreshPlaylists() {
    const updated = getPlaylists();
    setPlaylists(updated);
  }

  function handleAddTrackToPlaylist(track, playlistName, newPlaylistName) {
    let name = playlistName;
    if (name === "__new__") {
      if (!newPlaylistName.trim()) return;
      name = newPlaylistName.trim();
    }
    if (!name) return;

    const updatedPlaylists = { ...getPlaylists() };
    if (!updatedPlaylists[name]) updatedPlaylists[name] = [];
    if (!updatedPlaylists[name].some((t) => t.id === track.id)) {
      updatedPlaylists[name].push(track);
      savePlaylists(updatedPlaylists);
      setPlaylists(updatedPlaylists);
    }
  }

  if (tracks.length === 0) return null;

  return (
    <div className="horizontal-tracks-container">
      <div className="tracks-header">
        <h2>Featured Tracks</h2>
        <button className="view-all-button">View All</button>
      </div>
      
      <div className="tracks-scroller">
        {tracks.map((track) => (
          <HorizontalTrack
            key={track.id}
            track={track}
            playlists={playlists}
            onAddToPlaylist={handleAddTrackToPlaylist}
            refreshPlaylists={refreshPlaylists}
            isExpanded={expandedTrack === track.id}
            onExpand={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
          />
        ))}
      </div>
    </div>
  );
}

const HorizontalTrack = ({ track, playlists, onAddToPlaylist, isExpanded, onExpand }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("");
  const [addedTo, setAddedTo] = useState([]);

  function updateAddedTo() {
    const inPlaylists = Object.entries(playlists)
      .filter(([name, tracks]) => tracks.some((t) => t.id === track.id))
      .map(([name]) => name);
    setAddedTo(inPlaylists);
  }

  useEffect(() => {
    updateAddedTo();
  }, [playlists, track.id]);

  function handleAddToPlaylist(e) {
    e.stopPropagation();
    onAddToPlaylist(track, selectedPlaylist, newPlaylist);
    setNewPlaylist("");
    setSelectedPlaylist("");
  }

  function handleSelectChange(e) {
    setSelectedPlaylist(e.target.value);
    setNewPlaylist("");
  }

  function handleNewPlaylistChange(e) {
    setNewPlaylist(e.target.value);
  }

  const playlistNames = Object.keys(playlists);

  return (
    <div className={`track-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="track-image" onClick={onExpand}>
        {track.album?.images?.[0]?.url ? (
          <img src={track.album.images[0].url} alt={track.name} />
        ) : (
          <div className="image-placeholder"></div>
        )}
        <button className="play-button">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      
      <div className="track-info" onClick={onExpand}>
        <h3 className="track-name">{track.name}</h3>
        <p className="track-artist">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      
      {isExpanded && (
        <div className="track-controls">
          <div className="playlist-selector">
            <select
              className="playlist-select"
              value={selectedPlaylist}
              onChange={handleSelectChange}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="">Select playlist</option>
              {playlistNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="__new__">+ Create new playlist</option>
            </select>
            
            {selectedPlaylist === "__new__" && (
              <input
                className="playlist-input"
                type="text"
                placeholder="New playlist name"
                value={newPlaylist}
                onChange={handleNewPlaylistChange}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
          
          <button
            className={`add-button ${
              (!selectedPlaylist && !newPlaylist.trim()) ||
              (selectedPlaylist !== "__new__" && addedTo.includes(selectedPlaylist)) ||
              (selectedPlaylist === "__new__" && playlistNames.includes(newPlaylist.trim()))
                ? 'disabled' : ''
            }`}
            onClick={handleAddToPlaylist}
            disabled={
              (!selectedPlaylist && !newPlaylist.trim()) ||
              (selectedPlaylist !== "__new__" && addedTo.includes(selectedPlaylist)) ||
              (selectedPlaylist === "__new__" && playlistNames.includes(newPlaylist.trim()))
            }
          >
            {selectedPlaylist === "__new__"
              ? playlistNames.includes(newPlaylist.trim())
                ? "Exists"
                : "Create"
              : addedTo.includes(selectedPlaylist)
              ? "✓ Added"
              : "Add"}
          </button>
          
          {addedTo.length > 0 && (
            <div className="added-to">
              In: {addedTo.join(", ")}
            </div>
          )}
        </div>
      )}
      
      {isExpanded && (
        <div className="spotify-embed">
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}`}
            frameBorder="0"
            allow="encrypted-media"
            title={track.name}
          ></iframe>
        </div>
      )}
    </div>
  );
};