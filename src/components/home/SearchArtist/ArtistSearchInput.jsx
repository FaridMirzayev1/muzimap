export default function ArtistSearchInput({
    query,
    setQuery,
    artists,
    isLoading,
    showDropdown,
    onArtistSelect,
    dropdownRef,
    inputRef,
    formatFollowers,
}) {
    return (
        <div className="search-container"  ref={dropdownRef}>
            <div className="search-input-wrapper" >
                <div className="search-icon">

                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="Search for artists..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (artists.length > 0) onArtistSelect(null, true);
                    }}
                    aria-label="Search for artists"
                />
                {isLoading && (
                    <div className="search-loader">

                    </div>
                )}
            </div>

            {showDropdown && artists.length > 0 && (
                <div  className="dropdown">
                    {artists.map((artist) => (
                        <div key={artist.id} className="dropdown-item" onClick={() => onArtistSelect(artist)}>
                            <div className="avatar">
                                {artist.images[0] ? (
                                    <img src={artist.images[0].url || "/placeholder.svg"} alt={artist.name} />
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    </svg>
                                )}
                            </div>
                            <div className="artist-info">
                                <div className="artist-name">{artist.name}</div>
                                <div className="artist-meta">
                                    <div className="artist-meta-item">

                                        <span>{formatFollowers(artist.followers?.total || 0)} followers</span>
                                    </div>
                                    {artist.popularity > 70 && (
                                        <div className="badge badge-popular">Popular</div>
                                    )}
                                </div>
                                {artist.genres.length > 0 && (
                                    <div className="badges">
                                        {artist.genres.slice(0, 2).map((genre) => (
                                            <span key={genre} className="badge badge-outline">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isLoading && query && (
                <div className="dropdown">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton-row">
                            <div className="skeleton skeleton-avatar"></div>
                            <div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
