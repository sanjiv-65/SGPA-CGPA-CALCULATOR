// src/components/Calculator.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';
import { departments, semesterData, subjectsByDepartmentAndSemester } from '../data/courseData';

const Calculator = () => {
  const navigate = useNavigate();
  const {
    department,
    setDepartment,
    semester,
    setSemester,
    subjects,
    setSubjects,
    results,
    setResults,
    semesters,
    setSemesters,
    calculateSGPA,
    calculateCGPA
  } = useCalculator();

  const [formData, setFormData] = useState([]);
  const [previousSemesters, setPreviousSemesters] = useState([]);
  const [showPreviousSGPA, setShowPreviousSGPA] = useState(false);

  useEffect(() => {
    if (department && semester) {
      const departmentSubjects = subjectsByDepartmentAndSemester[department][semester] || [];
      setSubjects(departmentSubjects);
      setFormData(departmentSubjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        credits: subject.credits,
        grade: '',
        isSelected: false
      })));
    }
  }, [department, semester, setSubjects]);

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setSemester('');
    setFormData([]);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleGradeChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].grade = value;
    updatedFormData[index].isSelected = value !== '';
    setFormData(updatedFormData);
  };

  const handleAddPreviousSemester = () => {
    if (previousSemesters.length < parseInt(semester.replace('sem', '')) - 1) {
      setPreviousSemesters([...previousSemesters, { id: previousSemesters.length + 1, sgpa: '' }]);
    }
  };

  const handlePreviousSGPAChange = (index, value) => {
    const updatedPreviousSemesters = [...previousSemesters];
    updatedPreviousSemesters[index].sgpa = value;
    setPreviousSemesters(updatedPreviousSemesters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter subjects that have grades selected
    const selectedSubjects = formData.filter(subject => subject.grade !== '');
    
    // Check if at least one subject is selected
    if (selectedSubjects.length === 0) {
      alert('Please select a grade for at least one subject.');
      return;
    }

    // Calculate SGPA for selected subjects only
    const sgpa = calculateSGPA(selectedSubjects);
    
    // Calculate CGPA if previous semesters data is available
    let cgpa = sgpa;
    if (showPreviousSGPA && previousSemesters.length > 0) {
      // For simplicity, we'll take average of all SGPAs
      const totalSGPA = parseFloat(sgpa) + previousSemesters.reduce((sum, sem) => sum + parseFloat(sem.sgpa || 0), 0);
      cgpa = (totalSGPA / (previousSemesters.length + 1)).toFixed(2);
    }

    // Set results in context with only selected subjects
    setResults({
      sgpa,
      cgpa,
      subjectResults: selectedSubjects
    });

    // Add current semester to semesters list
    setSemesters([...semesters, {
      department,
      semester,
      subjects: selectedSubjects,
      sgpa
    }]);

    // Navigate to results page
    navigate('/results');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Calculate Your GPA</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Select Department</label>
              <select
                value={department}
                onChange={handleDepartmentChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Select Semester</label>
              <select
                value={semester}
                onChange={handleSemesterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!department}
              >
                <option value="">Select Semester</option>
                {semesterData.map(sem => (
                  <option key={sem.id} value={sem.id}>{sem.name}</option>
                ))}
              </select>
            </div>
          </div>

          {semester && parseInt(semester.replace('sem', '')) > 1 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="previousSGPA"
                  checked={showPreviousSGPA}
                  onChange={() => setShowPreviousSGPA(!showPreviousSGPA)}
                  className="mr-2"
                />
                <label htmlFor="previousSGPA">Include previous semesters for CGPA calculation</label>
              </div>
              
              {showPreviousSGPA && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-3">Previous Semesters</h3>
                  
                  {previousSemesters.map((sem, index) => (
                    <div key={index} className="flex mb-2 items-center">
                      <span className="w-32">Semester {sem.id}:</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value={sem.sgpa}
                        onChange={(e) => handlePreviousSGPAChange(index, e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SGPA"
                        required
                      />
                    </div>
                  ))}
                  
                  {previousSemesters.length < parseInt(semester.replace('sem', '')) - 1 && (
                    <button
                      type="button"
                      onClick={handleAddPreviousSemester}
                      className="mt-2 bg-gray-200 px-3 py-1 rounded text-sm"
                    >
                      + Add Previous Semester
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {subjects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Enter Grades</h3>
              <p className="text-sm text-gray-600 mb-3">Select grades only for the subjects you want to include in the calculation. Leave others blank to exclude them.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-12 gap-2 font-semibold mb-2 text-gray-600">
                  <div className="col-span-5">Subject</div>
                  <div className="col-span-2">Credits</div>
                  <div className="col-span-5">Grade</div>
                </div>
                
                {formData.map((subject, index) => (
                  <div key={subject.id} className="grid grid-cols-12 gap-2 mb-3 items-center">
                    <div className="col-span-5">{subject.name}</div>
                    <div className="col-span-2">{subject.credits}</div>
                    <div className="col-span-5">
                      <select
                        value={subject.grade}
                        onChange={(e) => handleGradeChange(index, e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Not Selected</option>
                        <option value="O">O {/*(Outstanding)*/} </option>
                        <option value="E">E {/*(Excellent)*/}</option>
                        <option value="A">A {/*(Very Good)*/}</option>
                        <option value="B">B {/*(Good)*/}</option>
                        <option value="C">C {/*(Average)*/}</option>
                        <option value="D">D {/*(Pass)*/}</option>
                        <option value="F">F {/*(Fail)*/}</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subjects.length > 0 && (
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Calculate
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Calculator;