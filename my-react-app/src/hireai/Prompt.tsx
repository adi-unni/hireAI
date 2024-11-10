import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Prompt: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  const historicalEvent = "The fall of the Berlin Wall in 1989 marked a significant event in history, symbolizing the end of the Cold War and the reunification of Germany.";

  const handleSubmit = () => {
    if (input.trim() && questions.length < 3) {
      setQuestions([...questions, input]);
      const newResponse = `This is a response from GPT based on your question: "${input}"`;
      setResponses([...responses, newResponse]);
      setInput('');
    }
  };

  // Trigger countdown and redirection after the text box is disabled
  useEffect(() => {
    if (questions.length >= 3) {
      setCountdown(10); // Start the countdown from 10 seconds

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(interval); // Clear interval at 1 to avoid extra count
            navigate('/test'); // Redirect to the test page
          }
          return prevCountdown !== null ? prevCountdown - 1 : null;
        });
      }, 1000);

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [questions.length, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">HireAI</h1>
        <p className="text-lg font-medium text-blue-600">{historicalEvent}</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col">
              <div className="self-start bg-blue-100 text-gray-800 p-3 rounded-lg mb-2 max-w-xs">
                <p><strong>You:</strong> {question}</p>
              </div>
              {responses[index] && (
                <div className="self-end bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p><strong>GPT:</strong> {responses[index]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 shadow-md">
        <div className="flex items-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-lg"
            disabled={questions.length >= 3}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            disabled={questions.length >= 3}
          >
            Send
          </button>
        </div>
        {questions.length >= 3 && countdown !== null && (
          <p className="text-center text-gray-500 mt-2">
            Redirecting to the test page in {countdown} seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Prompt;
