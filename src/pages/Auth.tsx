
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast.error('Login failed', { description: error.message });
        } else {
          toast.success('Logged in successfully');
          navigate('/');
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: email.split('@')[0],
              full_name: 'New User'
            }
          }
        });

        if (error) {
          toast.error('Signup failed', { description: error.message });
        } else {
          toast.success('Account created successfully');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        toast.error('Password reset failed', { description: error.message });
      } else {
        toast.success('Password reset email sent', { 
          description: 'Please check your email for the reset link' 
        });
        setIsResetPassword(false);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#181728] via-[#10131A] to-[#232635] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1C1F2D]/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 text-center relative">
        <Button 
          variant="ghost" 
          className="absolute left-4 top-4 text-gray-400 hover:text-white"
          onClick={() => {
            if (isResetPassword) {
              setIsResetPassword(false);
            } else {
              navigate('/');
            }
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h2 className="text-3xl font-extrabold text-white mb-6">
          {isResetPassword ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={isResetPassword ? handleResetPassword : handleAuth} className="space-y-6">
          <div className="text-left">
            <Label>Email</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="bg-background/60 text-white placeholder:text-muted-foreground"
            />
          </div>

          {!isResetPassword && (
            <div className="text-left">
              <Label>Password</Label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-background/60 text-white placeholder:text-muted-foreground"
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isResetPassword ? 'Send Reset Link' : isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>

        <div className="space-y-2">
          {!isResetPassword && (
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent underline hover:text-accent-foreground transition-colors"
            >
              {isLogin 
                ? 'Need an account? Sign Up' 
                : 'Already have an account? Login'}
            </Button>
          )}

          {isLogin && !isResetPassword && (
            <div>
              <Button 
                variant="link" 
                onClick={() => setIsResetPassword(true)}
                className="text-accent underline hover:text-accent-foreground transition-colors"
              >
                Forgot password?
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
