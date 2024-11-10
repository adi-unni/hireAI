import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Instructions from './hireai/Instructions';
import Prompt from './hireai/Prompt';
import Summary from './hireai/Summary';
import Test from './hireai/Test';
import Login from './hireai/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';

// Header component to conditionally render the subtitle and slogan on the Instructions page
const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="text-center mb-4">
      <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-2 tracking-wide">
        <span className="text-gray-800">Hire</span>
        <span className="text-blue-600">AI</span>
      </h1>
      {location.pathname === '/instructions' && (
        <>
          <p className="text-lg font-medium text-gray-600 mb-1">
            <span className="font-bold">H</span>uman <span className="font-bold">I</span>nsights and <span className="font-bold">R</span>ecruitment <span className="font-bold">E</span>valuator <span className="text-blue-500 font-bold">AI</span>
          </p>
          <p className="text-base italic text-gray-500 mb-4">
            "Get the HIRE ground on finding the right fit!"
          </p>
        </>
      )}
    </div>
  );
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {/* Render the Header component which includes conditional rendering */}
          <Header />
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            {/* Define routes for each page */}
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/instructions" /> : <Login />} />
              <Route path="/instructions" element={isAuthenticated ? <Instructions /> : <Navigate to="/login" />} />
              <Route path="/questions" element={isAuthenticated ? <Prompt /> : <Navigate to="/login" />} />
              <Route path="/test" element={isAuthenticated ? <Test /> : <Navigate to="/login" />} />
              <Route path="/summary" element={isAuthenticated ? <Summary /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/instructions" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
