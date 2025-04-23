
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MainNav = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-accent transition-colors duration-300"
              title="Home"
            >
              <Home className="h-6 w-6" />
            </Link>
            
            {!isLoggedIn ? (
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
          
          <Link to="/" className="text-foreground text-xl font-bold hover:text-white/90 transition-colors absolute left-1/2 transform -translate-x-1/2">
            <span className="animate-text-glow font-poppins">DWPS Community Service Club</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
