import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Instructions from './hireai/Instructions';
import Prompt from './hireai/Prompt';
import Summary from './hireai/Summary';
import Test from './hireai/Test';



const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Recruitment Tool
          </h1>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            {/* Define routes for each page */}
            <Routes>
              <Route path="/" element={<Instructions />} />
              <Route path="/questions" element={<Prompt />} />
              <Route path="/recall-test" element={<Summary />} />
              <Route path="/summary" element={<Test />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;