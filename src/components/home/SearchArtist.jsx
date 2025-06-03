import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchArtist.css";
import TracksList from "./SearchArtist/TrackList";
import RecommendationsButton from "./SearchArtist/RecommendationsButton";
import SelectedArtistsList from "./SearchArtist/SelectedArtistList";
import ArtistSearchInput from "./SearchArtist/ArtistSearchInput";

const SpotifyArtistSearch = () => {
  const accessToken = localStorage.getItem("spotify-token");
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isGettingRecommendations, setIsGettingRecommendations] =
    useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setArtists([]);
      setShowDropdown(false);
      return;
    }
    const searchArtists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: debouncedQuery,
            type: "artist",
            limit: 8,
          },
        });
        setArtists(response.data.artists.items);
        setShowDropdown(true);
        setError("");
      } catch (err) {
        setError(
          "Failed to fetch artists. Please check your connection and try again."
        );
        setArtists([]);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    };
    searchArtists();
  }, [debouncedQuery, accessToken]);

  const formatFollowers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handleArtistSelect = (artist, onlyShowDropdown = false) => {
    if (onlyShowDropdown) {
      setShowDropdown(true);
      return;
    }
    if (selectedArtists.some((a) => a.id === artist.id)) {
      setError("Artist already selected");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (selectedArtists.length >= 6) {
      setError("Maximum 6 artists can be selected");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setSelectedArtists([...selectedArtists, artist]);
    setQuery("");
    setArtists([]);
    setShowDropdown(false);
    setError("");
    inputRef.current?.focus();
  };

  const removeArtist = (artistId) => {
    setSelectedArtists(selectedArtists.filter((a) => a.id !== artistId));
  };

  const clearAll = () => {
    setSelectedArtists([]);
    setQuery("");
    setArtists([]);
    setShowDropdown(false);
    setError("");
    setTracks([]);
  };

  const handleSubmit = () => {
    if (selectedArtists.length < 3) {
      setError("Please select at least 3 artists to get recommendations");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setIsGettingRecommendations(true);
    setTracks([]);
    Promise.all(
      selectedArtists.map((artist) =>
        fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        ).then((res) => res.json())
      )
    )
      .then((results) => {
        const allTracks = results.flatMap((data) => data.tracks || []);
        setTracks(allTracks);
      })
      .catch(() => setError("Failed to fetch tracks."))
      .finally(() => setIsGettingRecommendations(false));
  };

  return (
    <div className="s-container">
      <div className="spotify-search">
        <div className="header">
          <div className="s-header-content">
            <div className="header-icon-wrapper"></div>
            <h1 className="header-title">
              MuziMap Artist Recommendation System
            </h1>
          </div>
          <p className="header-subtitle">
            Select 3-6 artists to discover your next favorite songs
          </p>
        </div>

        <div className="card">
          <div
            className="card-content"
            style={{
              height: showDropdown && artists.length > 0 ? "400px" : "auto",
            }}>
            <ArtistSearchInput
              query={query}
              setQuery={setQuery}
              artists={artists}
              isLoading={isLoading}
              showDropdown={showDropdown}
              onArtistSelect={handleArtistSelect}
              dropdownRef={dropdownRef}
              inputRef={inputRef}
              formatFollowers={formatFollowers}
            />
          </div>
        </div>
        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}
        <SelectedArtistsList
          selectedArtists={selectedArtists}
          formatFollowers={formatFollowers}
          removeArtist={removeArtist}
          clearAll={clearAll}
        />

        <RecommendationsButton
          selectedArtists={selectedArtists}
          isGettingRecommendations={isGettingRecommendations}
          handleSubmit={handleSubmit}
        />
        {selectedArtists.length === 0 && !query && (
          <div className="card">
            <div className="card-content">
              <div className="empty-state">
                <div className="empty-icon-wrapper">{/* ...SVG icon... */}</div>
                <h3 className="empty-title">Start Your Musical Journey</h3>
                <p className="empty-description">
                  Search and select your favorite artists to get personalized
                  music recommendations
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <TracksList tracks={tracks} />
    </div>
  );
};

export default SpotifyArtistSearch;
