import React from 'react';
import { Link } from 'react-router-dom';

const Instructions: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <p className="mb-4">
        Welcome to the HireAI!
      </p>
      <p>Follow the instructions below to complete your assessment:</p>
      <br></br>
      <ul className="list-disc list-inside text-left mb-4">
        <li>Read the historic information carefully and ask relevant questions. <b>Note: You will only be allowed to type in 3 prompts</b></li>
        <li>You will be given 10 minutes after your last prompt to go through all the questions and answers. </li>
        <li>After 10 minutes you will automatically be redirected to the test page. Complete the test by answering True/False questions.</li>
        <li>Submit your answers and review the report at the end.</li>
      </ul>
      <Link to="/questions" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Assessment
      </Link>
    </div>
  );
};

export default Instructions;
