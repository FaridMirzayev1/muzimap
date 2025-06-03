export default function RecommendationsButton({
  selectedArtists,
  isGettingRecommendations,
  handleSubmit,
}) {
  if (selectedArtists.length === 0) return null;
  return (
    <div className="card">
      <div className="card-content">
        <button
          className={`btn btn-primary ${selectedArtists.length < 3 ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={selectedArtists.length < 3 || isGettingRecommendations}
        >
          {isGettingRecommendations ? (
            <span className="btn-flex">
             
              Finding Your Music...
            </span>
          ) : (
            <span className="btn-flex">
             
              Get Recommendations ({selectedArtists.length} selected)
            </span>
          )}
        </button>
        {selectedArtists.length < 3 && (
          <p className="text-center mt-2">
            Select {3 - selectedArtists.length} more artist
            {3 - selectedArtists.length !== 1 ? "s" : ""} to continue
          </p>
        )}
      </div>
    </div>
  );
}