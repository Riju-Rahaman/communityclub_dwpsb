
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout failed', { description: error.message });
      } else {
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              DWPS Community Service Club
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            {isLoggedIn && (
              <>
                <Link to="/events" className="text-white hover:text-gray-200">Events</Link>
                <Link to="/announcements" className="text-white hover:text-gray-200">Announcements</Link>
              </>
            )}
            {isLoggedIn ? (
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/90"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/90"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
            <Link
              to="/"
              className="text-white block px-3 py-2 rounded-md hover:bg-primary/90"
            >
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/events"
                  className="text-white block px-3 py-2 rounded-md hover:bg-primary/90"
                >
                  Events
                </Link>
                <Link
                  to="/announcements"
                  className="text-white block px-3 py-2 rounded-md hover:bg-primary/90"
                >
                  Announcements
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <Button 
                variant="secondary" 
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
