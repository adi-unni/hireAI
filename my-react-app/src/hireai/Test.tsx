import React, { useState } from 'react';

const Test: React.FC = () => {
  const [summary, setSummary] = useState('');

  const handleSubmit = () => {
    // Send summary to backend or process it
    console.log("Submitted summary:", summary);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Provide a Summary</h2>
      <p className="mb-4">Summarize the historical event in your own words (around 50 words).</p>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write your summary here..."
        className="w-full px-3 py-2 border rounded mb-4"
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Summary
      </button>
    </div>
  );
};

export default Test;
