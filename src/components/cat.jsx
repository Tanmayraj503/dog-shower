import { useState, useEffect, useRef } from 'react';

export default function Cat() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // ✅ Fetch random cat image using .then()
  const fetchCat = () => {
    setError(null);

    return fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data[0]?.url) {
          const newCat = {
            url: data[0].url,
            id: Date.now() + Math.random(),
          };
          setCats((prev) => [newCat, ...prev].slice(0, 12));
        } else {
          throw new Error('Invalid response from Cat API');
        }
      })
      .catch((err) => {
        console.error('Error fetching cat image:', err);
        setError(`Network error: ${err.message}`);
      });
  };

  // ✅ Manual fetch button
  const handleGetCat = () => {
    setLoading(true);
    fetchCat().finally(() => setLoading(false));
  };

  // ✅ Clear all cats
  const clearCats = () => {
    setCats([]);
    setError(null);
  };

  // ✅ Toggle autoplay
  const toggleAutoPlay = () => {
    if (!autoPlay && cats.length === 0) {
      fetchCat();
    }
    setAutoPlay((prev) => !prev);
  };

  // ✅ Autoplay effect
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        fetchCat();
      }, 1500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoPlay]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 pt-17">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-900 mb-2">😺 Random Cat Shower</h1>
          <p className="text-gray-600">Click or auto-shower yourself with adorable cats!</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleGetCat}
            disabled={loading || autoPlay}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Loading...' : '🎲 Get Random Cat'}
          </button>

          <button
            onClick={toggleAutoPlay}
            disabled={error !== null}
            className={`${autoPlay
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
              } disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100`}
          >
            {autoPlay ? '⏸️ Stop Shower' : '▶️ Start Shower'}
          </button>

          {cats.length > 0 && (
            <button
              onClick={clearCats}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              🗑️ Clear All
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p className="font-bold">⚠️ Unable to Fetch Cats</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Image Grid */}
        {cats.length === 0 && !error ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-4 animate-bounce">😺</div>
            <p className="text-gray-500 text-xl mb-2">No cats yet! Click the button to start the shower 🚿</p>
            <p className="text-gray-400 text-sm mt-4">API: https://api.thecatapi.com/v1/images/search</p>
          </div>
        ) : cats.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cats.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl animate-fade-in"
                >
                  <img
                    src={cat.url}
                    alt="Random cat"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', cat.url);
                      e.target.parentElement.innerHTML =
                        '<div class="w-full h-64 flex items-center justify-center bg-gray-200 text-6xl">😿</div>';
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-6 pb-1 text-sm text-gray-500">
              😺 Showing {cats.length} {cats.length === 1 ? 'cat' : 'cats'}
            </div>
          </>
        ) : null}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
