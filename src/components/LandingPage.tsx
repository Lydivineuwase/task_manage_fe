// src/components/LandingPage.tsx
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Stay on Top of Your Tasks
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          Study Task is the perfect solution for students to manage academic tasks with deadlines and completion tracking. Organize your work and boost your productivity.
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <Link to="/login">
            <button className="px-8 py-3 text-lg font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 text-lg font-semibold bg-green-600 rounded-full hover:bg-green-700 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm">
        <p>&copy; 2025 Study Task. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
