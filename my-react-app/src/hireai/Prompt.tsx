import React, { useState } from 'react';

const Prompt: React.FC = () => {
  const [questions, setQuestions] = useState(['', '', '']);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    // Send questions to backend or process them here
    console.log("Submitted questions:", questions);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Ask Questions Based on the Prompt</h2>
      <p className="mb-4">
        Based on the historical event provided, please ask three questions to gain more information.
      </p>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Questions
      </button>
    </div>
  );
};

export default Prompt;
