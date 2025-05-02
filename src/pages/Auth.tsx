
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
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#0f0f0f] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#111111] rounded-xl shadow-2xl border border-gray-800 text-center relative">
        <Button 
          variant="ghost" 
          className="absolute left-4 top-4 text-[#a78bfa]/70 hover:text-[#a78bfa] hover:bg-transparent"
          onClick={() => {
            if (isResetPassword) {
              setIsResetPassword(false);
            } else {
              navigate('/');
            }
          }}
        >
          <ArrowLeft className="h-5 w-5 mr-2 text-[#a78bfa]" />
          <span className="text-[#a78bfa]">Back</span>
        </Button>

        {/* Decorative elements */}
        <div className="absolute top-20 right-4 opacity-70">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#a78bfa" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="#a78bfa" strokeWidth="2" fill="none" />
            <path d="M50 20 L50 10" stroke="#a78bfa" strokeWidth="2" />
            <path d="M80 50 L90 50" stroke="#a78bfa" strokeWidth="2" />
            <path d="M50 90 L50 80" stroke="#a78bfa" strokeWidth="2" />
            <path d="M10 50 L20 50" stroke="#a78bfa" strokeWidth="2" />
          </svg>
        </div>

        <div className="absolute left-0 bottom-[30%] opacity-70">
          <svg width="100" height="300" viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 50 Q40 30 50 50 T70 50" stroke="#a78bfa" strokeWidth="2" fill="none" />
            <path d="M10 100 Q30 120 50 100" stroke="#a78bfa" strokeWidth="2" fill="none" />
            <rect x="10" y="200" width="30" height="30" stroke="#a78bfa" strokeWidth="1" fill="none" />
            <circle cx="20" cy="240" r="3" fill="#a78bfa" />
            <circle cx="30" cy="240" r="3" fill="#a78bfa" />
          </svg>
        </div>

        <div className="absolute right-[15%] bottom-[10%]">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 75 L140 75" stroke="#a78bfa" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="75" cy="140" r="5" fill="#a78bfa" opacity="0.5" />
          </svg>
        </div>

        <h2 className="text-4xl font-bold text-[#e2e2e2] mb-8 mt-10">
          {isResetPassword ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={isResetPassword ? handleResetPassword : handleAuth} className="space-y-8">
          <div className="text-left">
            <Label className="text-lg text-[#a78bfa]/80">Email</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="bg-[#1a1a1a] border-[#333] focus:border-[#a78bfa] text-[#e2e2e2] h-12 mt-2"
            />
          </div>

          {!isResetPassword && (
            <div className="text-left">
              <Label className="text-lg text-[#a78bfa]/80">Password</Label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-[#1a1a1a] border-[#333] focus:border-[#a78bfa] text-[#e2e2e2] h-12 mt-2"
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-[#3a7bdb] hover:bg-[#4a8beb] text-white text-lg h-12 font-medium"
          >
            {isResetPassword ? 'Send Reset Link' : isLogin ? 'Login' : 'Create Account'}
          </Button>

          <div className="pt-4 flex flex-col space-y-4">
            {!isResetPassword && (
              <div className="text-[#a78bfa]/70">
                {isLogin ? 'Need an account?' : 'Already have an account?'}
                {' '}
                <Button 
                  variant="link" 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#3a7bdb] hover:text-[#4a8beb] p-0"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </Button>
              </div>
            )}

            {isLogin && !isResetPassword && (
              <div>
                <Button 
                  variant="link" 
                  onClick={() => setIsResetPassword(true)}
                  className="text-[#a78bfa]/70 hover:text-[#a78bfa] p-0"
                >
                  Forgot password?
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
