import { useState, useEffect } from 'react';

export default function RandomDogShower() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [error, setError] = useState(null);

  const fetchDog = async () => {
    try {
      setError(null);
      
      // Try direct API call first
      let response = await fetch('https://dog.ceo/api/breeds/image/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.status === 'success' && data.message) {
        const newDog = { 
          url: data.message, 
          id: Date.now() + Math.random() 
        };
        console.log('Adding dog:', newDog);
        setDogs(prev => [newDog, ...prev].slice(0, 12));
        return true;
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Full error details:', error);
      setError(`Network error: ${error.message}. The artifact environment may block external API calls.`);
      return false;
    }
  };

  const handleGetDog = async () => {
    setLoading(true);
    const success = await fetchDog();
    setLoading(false);
    
    if (!success) {
      console.log('Failed to fetch dog. Check console for details.');
    }
  };

  useEffect(() => {
    // Component mounted
    console.log('Component mounted, ready to fetch dogs');
  }, []);

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
            disabled={error !== null}
            className={`${autoPlay ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100`}
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
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p className="font-bold">⚠️ Unable to Fetch Dogs</p>
            <p className="text-sm mt-2">{error}</p>
            <p className="text-xs mt-3 text-red-600">
              <strong>Note:</strong> Claude artifacts have network restrictions that may prevent external API calls. 
              This code will work perfectly when copied to your own environment (local HTML file, CodePen, etc).
            </p>
            <p className="text-xs mt-2">Open browser console (F12) for detailed error logs.</p>
          </div>
        )}

        {dogs.length === 0 && !error ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-4 animate-bounce">🐶</div>
            <p className="text-gray-500 text-xl mb-2">No dogs yet! Click the button to start the shower 🚿</p>
            <p className="text-gray-400 text-sm mt-4">API: https://dog.ceo/api/breeds/image/random</p>
          </div>
        ) : dogs.length > 0 ? (
          <>
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
                    onLoad={() => console.log('Image loaded:', dog.url)}
                    onError={(e) => {
                      console.error('Image failed to load:', dog.url);
                      e.target.parentElement.innerHTML = '<div class="w-full h-64 flex items-center justify-center bg-gray-200 text-6xl">🐕</div>';
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8 text-sm text-gray-500">
              🐕 Showing {dogs.length} {dogs.length === 1 ? 'dog' : 'dogs'}
            </div>
          </>
        ) : null}
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
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}