
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
    <div className="min-h-screen flex flex-col items-center text-center transition-colors duration-500 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <MainNav />
      
      {/* Hero Section */}
      <div className="w-full py-24 px-4 flex flex-col items-center bg-gradient-to-b from-blue-50/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Community Service Club
          </h1>
          <p className="text-2xl mb-6 text-blue-700 font-semibold tracking-wide">
            Delhi World Public School, Barasat
          </p>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 leading-relaxed font-medium">
            Empowering students to make a difference through compassion, responsibility, and active citizenship in our school and local communities.
          </p>
        </div>
      </div>

      {/* Group Chat Section - Only shown when logged in */}
      {session && (
        <div className="w-full py-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Club Community Chat</h2>
          <div className="max-w-2xl w-full mx-auto bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <MessageList />
            <div className="mt-6">
              <MessageInput />
            </div>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="w-full py-20 bg-gradient-to-b from-transparent to-blue-50/30">
        <h2 className="text-4xl font-bold mb-16 text-gray-800">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <Card
              key={activity.title}
              className="bg-white hover:bg-blue-50/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-200 hover:border-blue-200 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col items-center gap-4 text-center">
                  <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                    <activity.icon className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {activity.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills You Gain Section */}
      <div className="w-full py-24 bg-gradient-to-b from-blue-50/30 via-white to-purple-50/20">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Skills You Gain
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Develop essential life skills through meaningful community service
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <Card
              key={skill.title}
              className="group bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col items-center gap-4 text-center">
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                    <skill.icon className="h-8 w-8 text-blue-600 group-hover:text-purple-600 transition-all duration-300" />
                  </div>
                  <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {skill.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full py-20 bg-gradient-to-b from-purple-50/20 to-transparent">
        <h2 className="text-4xl font-bold mb-16 text-gray-800">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 max-w-5xl mx-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="group bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://i.ibb.co/cct0whjT/idk.jpg" 
                      alt="Community Service Activity 1"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">Community Service in Action</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full p-2 bg-transparent border-none">
              <img 
                src="https://i.ibb.co/cct0whjT/idk.jpg" 
                alt="Community Service Activity 1"
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Card className="group bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                      alt="Community Service Activity 2"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors duration-300">Making a Difference Together</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full p-2 bg-transparent border-none">
              <img 
                src="https://i.ibb.co/5xMZ9NFB/idk2.jpg" 
                alt="Community Service Activity 2"
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Index;
