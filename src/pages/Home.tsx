import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
        <p className="text-gray-600 mb-8">
          Please register or login to access your dashboard.
        </p>
        <div className="space-y-4">
          <Link
            to="/register"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}