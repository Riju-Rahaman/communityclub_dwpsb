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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url, bio, role')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfile(data as Profile);
          setIsAdmin(data.role === 'admin');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          bio: profile.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      navigate('/'); // Redirect to home/message page after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="bg-card rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold animate-fade-in flex items-center justify-center">
            Profile Settings 
            {isAdmin && (
              <Star className="ml-2 text-yellow-500" title="Admin User" />
            )}
          </CardTitle>
          <div className="flex justify-center">
            <Avatar className="w-24 h-24 transition-transform duration-300 hover:scale-105">
              {profile.avatar_url ? (
                <AvatarImage src={profile.avatar_url} />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  <User className="w-12 h-12 text-primary/80" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={profile.username || ''}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-lg font-medium">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={loading}
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
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
                className="transition-all duration-300 hover:scale-105"
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
