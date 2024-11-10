import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Test: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const navigate = useNavigate();

  // Fetch questions when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/generate')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setAnswers(Array(data.questions.length).fill(null));
      })
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const handleAnswerChange = (index: number, response: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = response;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      
      const data = await response.json();
      // Navigate to summary page with the score data
      navigate('/summary', { state: { score: data.score } });
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="text-left max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Test</h2>
      <p className="mb-4 text-center">Answer the following True/False questions based on the topic you just studied:</p>

      {questions.map((question, index) => (
        <div key={question.id} className="mb-6">
          <p className="text-lg font-medium mb-2">{question.question}</p>
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
