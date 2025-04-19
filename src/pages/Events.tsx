
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Beach Cleanup Drive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Saturday, April 27, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>Digha Beach, West Bengal</span>
                </div>
                <p className="text-gray-600">
                  Join us for our monthly beach cleanup initiative. Help us keep our
                  beaches clean and protect marine life.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90">
                  Register Now
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* More event cards can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Events;
