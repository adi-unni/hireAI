import React, { useState } from 'react';

const Prompt: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const historicalEvent = "The fall of the Berlin Wall in 1989 marked a significant event in history, symbolizing the end of the Cold War and the reunification of Germany.";

  const handleSubmit = () => {
    if (input.trim()) {
      // Add the user question to the list of questions
      setQuestions([...questions, input]);
      // Simulate a GPT response (replace this with an API call in a real app)
      const newResponse = `This is a response from GPT based on your question: "${input}"`;
      setResponses([...responses, newResponse]);
      setInput(''); // Clear input
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Section with Title and Historical Event */}
      <div className="bg-white shadow-md p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">HireAI</h1>
        <p className="text-lg font-medium text-blue-600">{historicalEvent}</p>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col">
              {/* User Question */}
              <div className="self-start bg-blue-100 text-gray-800 p-3 rounded-lg mb-2 max-w-xs">
                <p><strong>You:</strong> {question}</p>
              </div>
              {/* GPT Response */}
              {responses[index] && (
                <div className="self-end bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p><strong>GPT:</strong> {responses[index]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex items-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-lg"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
