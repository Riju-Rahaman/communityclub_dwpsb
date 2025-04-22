
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, Save, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminImageUpload from "@/components/AdminImageUpload";
import type { Profile } from "@/types/profile";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
    bio: null,
    role: 'member'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // First check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          throw authError;
        }
        
        if (!user) {
          console.log("No authenticated user found, redirecting to auth");
          navigate('/auth');
          return;
        }

        console.log("Authenticated user found:", user.id);

        // Check if profile exists
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url, bio, role')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }
        
        if (data) {
          console.log("Profile found:", data);
          setProfile(data as Profile);
          setIsAdmin(data.role === 'admin');
        } else {
          console.log("Profile not found, creating new profile for user:", user.id);
          
          // Default username from email or a fallback
          const defaultUsername = user.email ? user.email.split('@')[0] : 'user';
          
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              username: defaultUsername,
              avatar_url: null,
              bio: null,
              role: 'member'
            });

          if (insertError) {
            console.error("Error creating profile:", insertError);
            throw insertError;
          }
          
          // Set default profile values after successful creation
          setProfile({
            username: defaultUsername,
            avatar_url: null,
            bio: null,
            role: 'member'
          });
        }
      } catch (error: any) {
        console.error('Error in profile loading process:', error);
        toast.error('Failed to load profile', { 
          description: error.message || 'Please try again or contact support'
        });
        // Redirect to auth page if there's an authentication issue
        if (error.code === 'PGRST404' || error.code?.includes('auth')) {
          navigate('/auth');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error('Authentication error', { 
          description: 'Please log in again to update your profile'
        });
        navigate('/auth');
        return;
      }

      console.log("Updating profile for user:", user.id);
      console.log("Profile data to update:", { username: profile.username, bio: profile.bio });

      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          bio: profile.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      
      toast.success('Profile updated successfully');
      setTimeout(() => navigate('/'), 1500); // Give toast time to show
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile', { 
        description: error.message || 'Please try again' 
      });
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="bg-background/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold animate-fade-in flex items-center justify-center text-foreground dark:text-white">
            Profile Settings 
            {isAdmin && (
              <Star className="ml-2 text-yellow-500" aria-label="Admin User" />
            )}
          </CardTitle>
          <div className="flex justify-center">
            <Avatar className="w-24 h-24 transition-transform duration-300 hover:scale-105 ring-2 ring-primary/20 dark:ring-blue-500/30">
              {profile.avatar_url ? (
                <AvatarImage src={profile.avatar_url} />
              ) : (
                <AvatarFallback className="bg-primary/10 dark:bg-blue-900/30">
                  <User className="w-12 h-12 text-primary/80 dark:text-blue-400" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg font-medium text-foreground dark:text-gray-200">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={profile.username || ''}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary dark:bg-gray-700/50 bg-background/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-lg font-medium text-foreground dark:text-gray-200">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={loading}
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary dark:bg-gray-700/50 bg-background/30"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button 
                type="submit"
                className="bg-primary/80 hover:bg-primary dark:bg-blue-600/80 dark:hover:bg-blue-500 text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                disabled={loading}
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
                className="transition-all duration-300 hover:scale-105 dark:bg-gray-700/50 backdrop-blur-sm"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Messages
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isAdmin && (
        <div className="mt-8">
          <AdminImageUpload />
        </div>
      )}
    </div>
  );
};

export default Profile;
