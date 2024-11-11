import React from 'react';
import { Link } from 'react-router-dom';

const Instructions: React.FC = () => {
  return (
    <div className="text-center">
      {/* Title and Subtitle Outside the White Box
      <h2 className="text-4xl font-extrabold mb-2">
        Hire<span className="text-blue-500">AI</span>
      </h2>
      <p className="text-lg font-medium text-gray-600 mb-1">
        <span className="font-bold">H</span>uman <span className="font-bold">I</span>nsights and <span className="font-bold">R</span>ecruitment <span className="font-bold">E</span>valuator <span className="text-blue-500 font-bold">AI</span>
      </p>
      <p className="text-base italic text-gray-500 mb-8">
        "Get the HIRE ground on finding the right fit!"
      </p> */}

      {/* Main Content Box */}
     
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Instructions</h3>
        <p className="mb-4 text-gray-700">Welcome to the HireAI!</p>
        <p className="text-gray-700">Follow the instructions below to complete your assessment:</p>
        <br />
        <ul className="list-disc list-inside text-left mb-4 text-gray-700">
          <li>Read the information carefully and ask relevant questions. The information can be from any period in time. <b>Note: You will only be allowed to type in 3 prompts</b></li>
          <li>You will be given 10 minutes after your last prompt to go through all the questions and answers.</li>
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
