
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TreePine, Handshake, Users, Calendar } from "lucide-react";

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

      {/* Upcoming Events Preview */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Beach Cleanup Drive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Join us this weekend for our monthly beach cleanup initiative.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Tree Planting Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Help us make our community greener by participating in our tree planting event.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Food Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monthly food distribution drive at local orphanages.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
