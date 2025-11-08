import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className=" pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 mb-7 text-center">
        🐾 Welcome to the Animal Shower 🐾
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-{46rem} ">
        {/* Cat Card */}
        <Link
          to="/cat"
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 overflow-hidden"
        >
          <img
            src="https://ih1.redbubble.net/image.3127270095.9781/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            alt="Cat"
            className="w-full h-68 object-fit group-hover:opacity-90"
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">😺 Random Cat Shower</h2>
            <p className="text-gray-600">See adorable cats appear instantly!</p>
          </div>
        </Link>

        {/* Dog Card */}
        <Link
          to="/dog"
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 overflow-hidden"
        >
          <img
            src="https://media.tenor.com/yXoCJGLi2Y8AAAAe/smiling-dog-good-morning.png"
            alt="Dog"
            className="w-full h-68 object-fit group-hover:opacity-90"
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">🐶 Random Dog Shower</h2>
            <p className="text-gray-600">Enjoy endless cute dogs on demand!</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
