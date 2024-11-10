import React from 'react';

const Summary: React.FC = () => {
  

  const handleViewReport = () => {
    window.open('http://10.205.228.19:8501', '_blank');
  };

  return (
    <div className="items-center justify-center bg-white-100 text-center px-4">
      <div className="bg-white">
        <br></br>
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">Thank You for Your Response!</h2>
        <p className="text-lg font-medium mb-4 text-gray-800">Check your feedback report below.</p>

        <button
          onClick={handleViewReport}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          View Feedback Report
        </button>
      </div>
    </div>
  );
};

export default Summary;
