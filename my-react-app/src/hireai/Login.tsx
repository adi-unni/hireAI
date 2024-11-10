import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/instructions');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to HireAI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Please log in using the button in the navigation bar to access the application.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 text-yellow-700">
          <p className="font-medium">Note</p>
          <p>You need to be authenticated to access the features of HireAI.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
