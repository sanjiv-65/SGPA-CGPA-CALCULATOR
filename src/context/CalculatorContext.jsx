// src/context/CalculatorContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export const useCalculator = () => useContext(CalculatorContext);

export const CalculatorProvider = ({ children }) => {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState({
    sgpa: 0,
    cgpa: 0,
    subjectResults: []
  });
  const [semesters, setSemesters] = useState([]);
  
  // GPA Point conversion
  const gradePoints = {
    'O': 10,
    'E': 9,
    'A': 8,
    'B': 7,
    'C': 6,
    'D': 5,
    'F': 0
  };

  const calculateSGPA = (subjectResults) => {
    // Filter out any subjects without grades (should already be filtered, but just in case)
    const validSubjects = subjectResults.filter(subject => subject.grade !== '');
    
    if (validSubjects.length === 0) {
      return "0.00";
    }
    
    let totalCredits = 0;
    let totalPoints = 0;

    validSubjects.forEach(subject => {
      totalCredits += subject.credits;
      totalPoints += subject.credits * gradePoints[subject.grade];
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const calculateCGPA = (allSemesters) => {
    let totalCredits = 0;
    let totalPoints = 0;

    allSemesters.forEach(sem => {
      // Filter subjects that have grades
      const validSubjects = sem.subjects.filter(subject => subject.grade && subject.grade !== '');
      
      validSubjects.forEach(subject => {
        totalCredits += subject.credits;
        totalPoints += subject.credits * gradePoints[subject.grade];
      });
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <CalculatorContext.Provider
      value={{
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
        gradePoints,
        calculateSGPA,
        calculateCGPA
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};