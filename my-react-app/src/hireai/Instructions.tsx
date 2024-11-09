import React from 'react';
import { Link } from 'react-router-dom';

const Instructions: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <p className="mb-4">
        Welcome to the recruitment tool! Follow the instructions below to complete your assessment:
      </p>
      <ul className="list-disc list-inside text-left mb-4">
        <li>Read the prompts carefully and ask relevant questions.</li>
        <li>Complete the recall test by answering True/False questions.</li>
        <li>Summarize the information provided in your own words.</li>
        <li>Submit your answers and review the report at the end.</li>
      </ul>
      <Link to="/questions" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Assessment
      </Link>
    </div>
  );
};

export default Instructions;
