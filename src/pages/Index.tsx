
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, MessageSquare, Wrench, Clock, Heart, Calendar, Flag, Users, Leaf, HandHelping, Sparkles, Star } from "lucide-react";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const activities = [
  {
    title: "Cleanliness Drives",
    description: "Swachh Bharat-inspired local campaigns for a cleaner community",
    icon: Heart,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Tree Plantation",
    description: "Environmental awareness and green initiatives",
    icon: Leaf,
    gradient: "from-emerald-400 to-green-600",
  },
  {
    title: "Donation Drives",
    description: "Collection and distribution of essential items",
    icon: HandHelping,
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    title: "Community Support",
    description: "Assistance to orphanages and old age homes",
    icon: Users,
    gradient: "from-purple-400 to-pink-600",
  },
];

const skills = [
  {
    title: "Leadership",
    description: "Organize events, delegate tasks, and inspire your team",
    icon: Award,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Teamwork",
    description: "Collaborate effectively with diverse groups of peers",
    icon: Users,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "Communication",
    description: "Build confidence in public speaking, writing, and outreach",
    icon: MessageSquare,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    title: "Problem-Solving",
    description: "Tackle real-world challenges during drives and initiatives",
    icon: Wrench,
    gradient: "from-red-400 to-pink-500",
  },
  {
    title: "Time Management",
    description: "Balance academics and service work effectively",
    icon: Clock,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Empathy",
    description: "Understand and respond to the needs of others compassionately",
    icon: Heart,
    gradient: "from-pink-400 to-rose-500",
  },
  {
    title: "Event Planning",
    description: "Learn to coordinate logistics, people, and promotions",
    icon: Calendar,
    gradient: "from-purple-400 to-violet-500",
  },
  {
    title: "Civic Awareness",
    description: "Gain deeper understanding of social issues and responsibilities",
    icon: Flag,
    gradient: "from-indigo-400 to-purple-500",
  },
];

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-center transition-colors duration-500 relative">
      <MainNav />
      
      {/* Hero Section */}
      <div className="w-full py-32 px-4 flex flex-col items-center hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
            <Star className="h-6 w-6 text-secondary animate-float" />
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-bold mb-8 gradient-text animate-glow text-shadow-lg font-playfair">
            Community Service Club
          </h1>
          
          <div className="glass-card p-8 mb-8 max-w-4xl mx-auto">
            <p className="text-3xl mb-6 text-accent font-medium tracking-wide animate-fade-in">
              Delhi World Public School, Barasat
            </p>
            <p className="text-xl max-w-3xl mx-auto text-foreground/90 font-light leading-relaxed">
              Empowering students to make a difference through compassion, responsibility, and active citizenship in our school and local communities.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 animate-fade-in">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <Heart className="h-6 w-6 text-red-400 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Group Chat Section - Only shown when logged in */}
      {session && (
        <div className="w-full py-20 flex flex-col items-center text-center section-gradient">
          <h2 className="text-4xl font-bold mb-4 gradient-text animate-fade-in text-shadow-sm">Club Community Chat</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">Connect with fellow members and share your thoughts</p>
          <div className="max-w-4xl w-full mx-auto glass-card rounded-2xl p-8 hover-glow transition-all duration-500">
            <MessageList />
            <div className="mt-8">
              <MessageInput />
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="w-full py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in text-shadow-sm">Our Activities</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Making a positive impact through meaningful community service initiatives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <Card
                key={activity.title}
                className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${activity.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <activity.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold gradient-text">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 font-light leading-relaxed">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Skills You Gain Section */}
      <div className="w-full py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in text-shadow-sm">
              Skills You Gain
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Develop essential life skills through hands-on community service experience</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-14 h-14 rounded-full bg-gradient-to-r ${skill.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold gradient-text">
                    {skill.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 text-sm font-light leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in text-shadow-sm">Gallery</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Capturing moments of service and community impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 cursor-pointer group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src="https://i.ibb.co/cct0whjT/idk.jpg" 
                        alt="Community Service Activity 1"
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Community Service in Action</h3>
                        <p className="text-white/80">Making a difference together</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-2 bg-transparent border-none">
                <img 
                  src="https://i.ibb.co/cct0whjT/idk.jpg" 
                  alt="Community Service Activity 1"
                  className="w-full h-auto object-contain rounded-xl border-2 border-white/20 shadow-2xl"
                />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Card className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 cursor-pointer group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                        alt="Community Service Activity 2"
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Making a Difference Together</h3>
                        <p className="text-white/80">Building stronger communities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-2 bg-transparent border-none">
                <img 
                  src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                  alt="Community Service Activity 2"
                  className="w-full h-auto object-contain rounded-xl border-2 border-white/20 shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
