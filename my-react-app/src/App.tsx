
import { useState } from 'react'
import axios from 'axios';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Instructions from './hireai/Instructions';
import Prompt from './hireai/Prompt';
import Summary from './hireai/Summary';
import Test from './hireai/Test';

  const fetchAPI = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await response.json()
    console.log(data)
  }


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
  <span className="text-gray-800">Hire</span>
  <span className="text-blue-600">AI</span>
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