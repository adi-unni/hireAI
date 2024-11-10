import React, { useState } from 'react';

const Summary: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (response: string) => {
    setAnswer(response);
    // Optionally send the answer to backend here
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Recall Test</h2>
      <p className="mb-4">Answer the following question:</p>
      <p className="text-lg font-medium mb-4">
        True or False: The Berlin Wall was erected to protect East Germany from foreign influence.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleAnswer('True')}
          className={`px-4 py-2 rounded ${answer === 'True' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          True
        </button>
        <button
          onClick={() => handleAnswer('False')}
          className={`px-4 py-2 rounded ${answer === 'False' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          False
        </button>
      </div>
      {answer && <p className="mt-4">Your answer: {answer}</p>}
    </div>
  );
};

export default Summary;
