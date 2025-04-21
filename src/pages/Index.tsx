
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TreePine, Handshake, Users } from "lucide-react";
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
    icon: TreePine,
  },
  {
    title: "Donation Drives",
    description: "Collection and distribution of essential items",
    icon: Handshake,
  },
  {
    title: "Community Support",
    description: "Assistance to orphanages and old age homes",
    icon: Users,
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
    <div className="min-h-screen bg-gradient-to-br from-[#181728] via-[#10131A] to-[#232635] flex flex-col items-center text-center transition-colors duration-500">
      <MainNav />
      {/* Hero Section */}
      <div className="w-full py-20 px-4 flex flex-col items-center glass-morphism rounded-none">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gradient-primary animate-text-glow drop-shadow-lg">
            Community Service Club
          </h1>
          <p className="text-2xl mb-4 text-accent font-semibold tracking-wide animate-fade-in">
            Delhi World Public School, Barasat
          </p>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80">
            Empowering students to make a difference through compassion, responsibility, and active citizenship in our school and local communities.
          </p>
        </div>
      </div>

      {/* Group Chat Section - Only shown when logged in */}
      {session && (
        <div className="w-full py-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient-primary animate-fade-in">Club Community Chat</h2>
          <div className="max-w-2xl w-full mx-auto glass-morphism bg-[#181728]/70 shadow-xl rounded-xl p-6">
            <MessageList />
            <div className="mt-4">
              <MessageInput />
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="w-full py-16">
        <h2 className="text-3xl font-bold mb-12 text-gradient-primary animate-fade-in">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {activities.map((activity) => (
            <Card
              key={activity.title}
              className="glass-morphism bg-[#232635]/50 hover:scale-105 hover:shadow-2xl transition-all text-center mx-auto"
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2 text-center">
                  <activity.icon className="h-8 w-8 text-accent mb-1" />
                  <span className="text-xl font-bold">{activity.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

