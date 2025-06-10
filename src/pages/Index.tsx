
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, MessageSquare, Wrench, Clock, Heart, Calendar, Flag, Users, Leaf, HandHelping } from "lucide-react";
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
  },
  {
    title: "Tree Plantation",
    description: "Environmental awareness and green initiatives",
    icon: Leaf,
  },
  {
    title: "Donation Drives",
    description: "Collection and distribution of essential items",
    icon: HandHelping,
  },
  {
    title: "Community Support",
    description: "Assistance to orphanages and old age homes",
    icon: Users,
  },
];

const skills = [
  {
    title: "Leadership",
    description: "Organize events, delegate tasks, and inspire your team",
    icon: Award,
    color: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "Teamwork", 
    description: "Collaborate effectively with diverse groups of peers",
    icon: Users,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    title: "Communication",
    description: "Build confidence in public speaking, writing, and outreach",
    icon: MessageSquare,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    title: "Problem-Solving",
    description: "Tackle real-world challenges during drives and initiatives",
    icon: Wrench,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Time Management",
    description: "Balance academics and service work effectively",
    icon: Clock,
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    title: "Empathy",
    description: "Understand and respond to the needs of others compassionately",
    icon: Heart,
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
  },
  {
    title: "Event Planning",
    description: "Learn to coordinate logistics, people, and promotions",
    icon: Calendar,
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
  },
  {
    title: "Civic Awareness",
    description: "Gain deeper understanding of social issues and responsibilities",
    icon: Flag,
    color: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
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
    <div className="min-h-screen flex flex-col items-center text-center transition-colors duration-500">
      <MainNav />
      
      {/* Hero Section */}
      <div className="w-full py-20 px-4 flex flex-col items-center bg-gradient-to-b from-primary/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent animate-text-glow text-shadow-md">
            Community Service Club
          </h1>
          <p className="text-2xl mb-4 text-accent font-medium tracking-wide animate-fade-in">
            Delhi World Public School, Barasat
          </p>
          <p className="text-lg max-w-2xl mx-auto text-foreground/90 font-light">
            Empowering students to make a difference through compassion, responsibility, and active citizenship in our school and local communities.
          </p>
        </div>
      </div>

      {/* Group Chat Section - Only shown when logged in */}
      {session && (
        <div className="w-full py-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground animate-fade-in text-shadow-sm">Club Community Chat</h2>
          <div className="max-w-2xl w-full mx-auto glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <MessageList />
            <div className="mt-6">
              <MessageInput />
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="w-full py-16">
        <h2 className="text-3xl font-bold mb-12 text-foreground animate-fade-in text-shadow-sm">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {activities.map((activity) => (
            <Card
              key={activity.title}
              className="glass-card hover-scale hover-glow transition-all duration-300 backdrop-blur-lg bg-gradient-to-br from-card/80 to-card/40"
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2 text-center">
                  <activity.icon className="h-8 w-8 text-accent animate-pulse" />
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-secondary/90 bg-clip-text text-transparent">
                    {activity.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 font-light">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills You Gain Section */}
      <div className="w-full py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent animate-text-glow">
              Skills You Gain
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto px-4">
              Develop essential life skills through meaningful community service
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className={`group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br ${skill.color} border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="flex flex-col items-center gap-4 text-center">
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br from-card/50 to-transparent border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110`}>
                      <skill.icon className={`h-8 w-8 ${skill.iconColor} transition-all duration-300 group-hover:drop-shadow-lg`} />
                      
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 rounded-xl ${skill.iconColor.replace('text-', 'bg-')} opacity-20 blur-xl scale-150 group-hover:opacity-40 transition-opacity duration-500`} />
                    </div>
                    
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-foreground/90 bg-clip-text text-transparent group-hover:from-accent group-hover:to-secondary transition-all duration-300">
                      {skill.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0 pb-6">
                  <p className="text-foreground/80 text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                    {skill.description}
                  </p>
                </CardContent>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.iconColor.replace('text-', 'from-')} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full py-16">
        <h2 className="text-3xl font-bold mb-12 text-foreground animate-fade-in text-shadow-sm">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl mx-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card hover-scale hover-glow transition-all duration-300 backdrop-blur-lg bg-gradient-to-br from-card/80 to-card/40 cursor-pointer">
                <CardContent className="p-0">
                  <img 
                    src="https://i.ibb.co/cct0whjT/idk.jpg" 
                    alt="Community Service Activity 1"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="text-foreground/80 font-light">Community Service in Action</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full p-2 bg-transparent border-none">
              <img 
                src="https://i.ibb.co/cct0whjT/idk.jpg" 
                alt="Community Service Activity 1"
                className="w-full h-auto object-contain rounded-lg border-2 border-white/20"
              />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card hover-scale hover-glow transition-all duration-300 backdrop-blur-lg bg-gradient-to-br from-card/80 to-card/40 cursor-pointer">
                <CardContent className="p-0">
                  <img 
                    src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                    alt="Community Service Activity 2"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="text-foreground/80 font-light">Making a Difference Together</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full p-2 bg-transparent border-none">
              <img 
                src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                alt="Community Service Activity 2"
                className="w-full h-auto object-contain rounded-lg border-2 border-white/20"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Index;
