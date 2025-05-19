// src/components/Results.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';

const Results = () => {
  const navigate = useNavigate();
  const { department, semester, results } = useCalculator();
  
  useEffect(() => {
    // Redirect if no results available
    if (!results.sgpa) {
      navigate('/calculator');
    }
  }, [results, navigate]);

  // Find the department name from the department ID
  const getDepartmentName = (deptId) => {
    const departments = {
      'cse': 'Computer Science Engineering',
      'ece': 'Electronics & Communication Engineering',
      'ee': 'Electrical Engineering',
      'me': 'Mechanical Engineering',
      'ce': 'Civil Engineering',
    };
    return departments[deptId] || deptId;
  };

  // Format semester name
  const getSemesterName = (semId) => {
    return semId.replace('sem', 'Semester ');
  };

  // Function to get CGPA class description
  const getCGPAClass = (cgpa) => {
    const cgpaNum = parseFloat(cgpa);
    if (cgpaNum >= 9.5) return 'Outstanding';
    if (cgpaNum >= 8.5) return 'Excellent';
    if (cgpaNum >= 7.5) return 'Very Good';
    if (cgpaNum >= 6.5) return 'Good';
    if (cgpaNum >= 5.5) return 'Above Average';
    if (cgpaNum >= 5.0) return 'Average';
    return 'Below Average';
  };

  // Calculate performance percent
  const calculatePercentage = (gpa) => {
    return (parseFloat(gpa) * 10).toFixed(2);
  };

  if (!results.sgpa) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Your GPA Results</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <p className="mb-2"><span className="font-medium">Department:</span> {getDepartmentName(department)}</p>
          <p className="mb-2"><span className="font-medium">Semester:</span> {getSemesterName(semester)}</p>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Subject Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Subject</th>
                <th className="py-2 px-4 text-center">Credits</th>
                <th className="py-2 px-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.subjectResults.map((subject) => (
                <tr key={subject.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{subject.name}</td>
                  <td className="py-2 px-4 text-center">{subject.credits}</td>
                  <td className="py-2 px-4 text-center">{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="mb-2">
              <span className="text-lg font-medium">SGPA:</span> 
              <span className="text-2xl font-bold ml-2">{results.sgpa}</span>
              <span className="text-sm ml-2">({calculatePercentage(results.sgpa)}%)</span>
            </div>
            
            <div>
              <span className="text-lg font-medium">CGPA:</span> 
              <span className="text-2xl font-bold ml-2">{results.cgpa}</span>
              <span className="text-sm ml-2">({calculatePercentage(results.cgpa)}%)</span>
            </div>
            
            <div className="mt-2 text-blue-700">
              {getCGPAClass(results.cgpa)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => navigate('/calculator')}
          className="bg-blue-100 text-blue-700 px-6 py-2 rounded-md hover:bg-blue-200 transition"
        >
          Calculate Another Semester
        </button>
        
        <button 
          onClick={() => window.print()}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Print Results
        </button>
      </div>
    </div>
  );
};

export default Results;