import React, { useState } from 'react';

const Test: React.FC = () => {
  const questions = [
    "The Berlin Wall was erected to protect East Germany from foreign influence.",
    "The fall of the Berlin Wall marked the end of the Cold War.",
    "The Berlin Wall separated East and West Berlin.",
    "The Berlin Wall was demolished in 1989.",
    "The Berlin Wall was built to keep East Germans from defecting to the West.",
    "The fall of the Berlin Wall led to the reunification of Germany.",
    "The Berlin Wall was originally built in 1961.",
    "The Berlin Wall was a symbol of division between the Soviet Union and the Western world."
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));

  const handleAnswerChange = (index: number, response: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = response;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    // Optionally send answers to the backend here
  };

  return (
    <div className="text-left max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Test</h2>
      <p className="mb-4 text-center">Answer the following True/False questions based on the topic you just studied:</p>

      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="text-lg font-medium mb-2">{question}</p>
          <div className="flex flex-col space-y-2 pl-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${index}`}
                value="True"
                checked={answers[index] === 'True'}
                onChange={() => handleAnswerChange(index, 'True')}
              />
              <span>True</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${index}`}
                value="False"
                checked={answers[index] === 'False'}
                onChange={() => handleAnswerChange(index, 'False')}
              />
              <span>False</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default Test;
