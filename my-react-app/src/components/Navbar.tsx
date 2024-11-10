import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-white font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          HireAI
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 