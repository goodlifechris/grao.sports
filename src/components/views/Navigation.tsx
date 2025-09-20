
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            Grao.sports
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
          <a href="#sports" className="text-gray-600 hover:text-green-600 transition-colors">Sports</a>
          <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome back!</span>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleSignIn}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
        
        <div className="md:hidden">
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
