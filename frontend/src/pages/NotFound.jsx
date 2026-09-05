import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold text-slate-800 mt-4">
          Page Not Found 😔
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          🏠 Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;