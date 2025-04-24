import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, MessageSquare, Wrench, Clock, Heart, Calendar, Flag, Users, Leaf, HandHelp } from "lucide-react";
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
    icon: HandHelp,
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
  },
  {
    title: "Teamwork",
    description: "Collaborate effectively with diverse groups of peers",
    icon: Users,
  },
  {
    title: "Communication",
    description: "Build confidence in public speaking, writing, and outreach",
    icon: MessageSquare,
  },
  {
    title: "Problem-Solving",
    description: "Tackle real-world challenges during drives and initiatives",
    icon: Wrench,
  },
  {
    title: "Time Management",
    description: "Balance academics and service work effectively",
    icon: Clock,
  },
  {
    title: "Empathy",
    description: "Understand and respond to the needs of others compassionately",
    icon: Heart,
  },
  {
    title: "Event Planning",
    description: "Learn to coordinate logistics, people, and promotions",
    icon: Calendar,
  },
  {
    title: "Civic Awareness",
    description: "Gain deeper understanding of social issues and responsibilities",
    icon: Flag,
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
      <div className="w-full py-16 bg-gradient-to-b from-transparent to-primary/10">
        <h2 className="text-3xl font-bold mb-12 text-foreground animate-fade-in text-shadow-sm">
          Skills You Gain
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {skills.map((skill) => (
            <Card
              key={skill.title}
              className="glass-card hover-scale hover-glow transition-all duration-300 backdrop-blur-lg bg-gradient-to-br from-card/80 to-card/40 border-white/5"
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 rounded-full bg-accent/10 backdrop-blur-sm">
                    <skill.icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-white to-secondary/90 bg-clip-text text-transparent">
                    {skill.title}
                  </span>
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
  );
};

export default Index;
