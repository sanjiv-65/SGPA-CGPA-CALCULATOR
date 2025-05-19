// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">CGPA & SGPA Calculator</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/*<p className="text-lg mb-6">
          Welcome to the B.Tech CGPA Calculator. This tool helps engineering students calculate their 
          Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) based on their 
          department, semester, and course credits.
        </p>*/}
       {/* <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">Grading System:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">O:</span> 10 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">E:</span> 9 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">A:</span> 8 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">B:</span> 7 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">C:</span> 6 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">D:</span> 5 points
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-bold">F:</span> 0 points
            </div>
          </div>
        </div>*/}
        <Link to="/calculator" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition inline-block">
          Start Calculating
        </Link>
      </div>
    </div>
  );
};

export default Home;