
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User, Home, Calendar, Bell } from "lucide-react";
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
    <nav className="backdrop-blur-md bg-primary/60 shadow-lg transition-all duration-300 sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-foreground text-xl font-bold hover:text-white/90 transition-colors">
              <span className="animate-text-glow font-poppins">DWPS Community Service Club</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              className="text-foreground hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? 
                <X className="h-6 w-6 animate-in fade-in duration-200" /> : 
                <Menu className="h-6 w-6 animate-in fade-in duration-200" />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        {isOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary/90 backdrop-blur-md">
            <Link
              to="/"
              className="flex items-center text-foreground/90 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/events"
                  className="flex items-center text-foreground/90 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </Link>
                <Link
                  to="/announcements"
                  className="flex items-center text-foreground/90 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Announcements
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center text-foreground/90 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <Button 
                  variant="secondary" 
                  className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <Button 
                variant="secondary" 
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 px-6 pb-2 animate-fade-in">
        <Link to="/" className="nav-link flex items-center text-foreground/90 hover:text-white transition-colors duration-200">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/events" className="nav-link flex items-center text-foreground/90 hover:text-white transition-colors duration-200">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </Link>
            <Link to="/announcements" className="nav-link flex items-center text-foreground/90 hover:text-white transition-colors duration-200">
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </Link>
            <Link to="/profile" className="nav-link flex items-center text-foreground/90 hover:text-white transition-colors duration-200">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Button 
              variant="secondary" 
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:scale-105 ml-4"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <Button 
            variant="secondary" 
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:scale-105 ml-4"
            onClick={() => navigate('/auth')}
          >
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
