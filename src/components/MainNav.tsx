import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AiAssistant from "./AiAssistant";
const MainNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    checkSession();
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    try {
      const {
        error
      } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout failed', {
          description: error.message
        });
      } else {
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred');
    }
  };
  return <>
      <nav className="backdrop-blur-xl bg-gradient-to-r from-primary/60 to-secondary/30 shadow-lg transition-all duration-300 sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-opacity-0 bg-transparent">
          <div className="flex justify-between items-center h-16 bg-transparent px-[44px]">
            <div className="flex items-center space-x-4">
              <Link to="/" title="Home" className="text-foreground hover:text-accent transition-colors duration-300 p-2 rounded-full hover:bg-white/5 px-[10px] mx-[6px] my-0 py-px">
                <Home className="h-5 w-5 px-px mx-[2px] my-0 py-0" />
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? <Button variant="secondary" onClick={() => navigate('/auth')} className="bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-secondary/20 py-0 px-[25px]">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button> : <Button variant="secondary" className="bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-secondary/20" onClick={handleLogout}>
                  Logout
                </Button>}
            </div>
          </div>
        </div>
      </nav>
      <AiAssistant />
    </>;
};
export default MainNav;