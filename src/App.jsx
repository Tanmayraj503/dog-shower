import { useState, useEffect } from 'react';

export default function RandomDogShower() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [error, setError] = useState(null);

  const fetchDog = async () => {
    try {
      setError(null);
      const response = await fetch('https://dog.ceo/api/breeds/image/random', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.message) {
        const newDog = { 
          url: data.message, 
          id: Date.now() + Math.random() 
        };
        setDogs(prev => [newDog, ...prev].slice(0, 12));
        return true;
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error fetching dog:', error);
      setError(`Failed to fetch: ${error.message}`);
      return false;
    }
  };

  const handleGetDog = async () => {
    setLoading(true);
    await fetchDog();
    setLoading(false);
  };

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        fetchDog();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [autoPlay]);

  const clearDogs = () => {
    setDogs([]);
    setError(null);
  };

  const toggleAutoPlay = () => {
    if (!autoPlay && dogs.length === 0) {
      fetchDog();
    }
    setAutoPlay(!autoPlay);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">🐕 Random Dog Shower</h1>
          <p className="text-gray-600">Click to shower yourself with adorable dogs!</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleGetDog}
            disabled={loading || autoPlay}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Loading...' : '🎲 Get Random Dog'}
          </button>
          
          <button
            onClick={toggleAutoPlay}
            className={`${autoPlay ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105`}
          >
            {autoPlay ? '⏸️ Stop Shower' : '▶️ Start Shower'}
          </button>

          {dogs.length > 0 && (
            <button
              onClick={clearDogs}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              🗑️ Clear All
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">Check browser console for more details</p>
          </div>
        )}

        {dogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">🐶</div>
            <p className="text-gray-500 text-xl mb-2">No dogs yet! Click the button to start the shower 🚿</p>
            <p className="text-gray-400 text-sm">Using Dog CEO API: https://dog.ceo/api/breeds/image/random</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl animate-fade-in"
              >
                <img
                  src={dog.url}
                  alt="Random dog"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error('Image failed to load:', dog.url);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {dogs.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-500">
            🐕 Showing {dogs.length} {dogs.length === 1 ? 'dog' : 'dogs'}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
