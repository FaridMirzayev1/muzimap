export default function SelectedArtistsList({
  selectedArtists,
  formatFollowers,
  removeArtist,
  clearAll,
}) {
  if (selectedArtists.length === 0) return null;
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          Selected Artists ({selectedArtists.length}/6)
        </div>
        <button className="btn btn-sm btn-ghost" onClick={clearAll}>
          Clear all
        </button>
      </div>
      <div className="card-content">
        <div className="selected-artists">
          {selectedArtists.map((artist) => (
            <div key={artist.id} className="selected-artist">
              <div className="avatar avatar-sm">
                {artist.images[0] ? (
                  <img
                    src={artist.images[0].url || "/placeholder.svg"}
                    alt={artist.name}
                  />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                   
                  </svg>
                )}
              </div>
              <div className="artist-info">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-meta">
                  <span>
                    {formatFollowers(artist.followers?.total || 0)} followers
                  </span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-icon btn-remove"
                onClick={() => removeArtist(artist.id)}
                aria-label={`Remove ${artist.name}`}
                >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
