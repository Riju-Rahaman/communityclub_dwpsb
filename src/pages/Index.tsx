
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TreePine, Handshake, Users, Calendar } from "lucide-react";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";

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
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Community Service Club
          </h1>
          <p className="text-xl mb-8">
            Delhi World Public School, Barasat
          </p>
          <p className="text-lg max-w-2xl">
            Empowering students to make a difference through compassion,
            responsibility, and active citizenship in our school and local
            communities.
          </p>
        </div>
      </div>

      {/* Group Chat Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Club Community Chat</h2>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <MessageList />
          <div className="mt-4">
            <MessageInput />
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <Card key={activity.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <activity.icon className="h-6 w-6 text-secondary" />
                  {activity.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
