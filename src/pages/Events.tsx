
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Sparkles } from "lucide-react";

const events = [
  {
    title: "Beach Cleanup Drive",
    date: "Saturday, April 27, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Digha Beach, West Bengal",
    description: "Join us for our monthly beach cleanup initiative. Help us keep our beaches clean and protect marine life.",
    participants: "25+ volunteers",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    title: "Tree Plantation Campaign",
    date: "Sunday, May 5, 2025",
    time: "7:00 AM - 11:00 AM",
    location: "Local Community Park",
    description: "Plant trees and contribute to a greener environment. Every tree planted makes a difference for our future.",
    participants: "40+ volunteers",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Food Distribution Drive",
    date: "Saturday, May 12, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Various Locations",
    description: "Help distribute meals to those in need. Your participation can make someone's day better.",
    participants: "30+ volunteers",
    gradient: "from-orange-400 to-red-500",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen relative">
      <MainNav />
      
      {/* Hero Section */}
      <div className="w-full py-20 px-4 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <Calendar className="h-8 w-8 text-secondary animate-float" />
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text animate-glow text-shadow-lg">
            Upcoming Events
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Join us in making a positive impact through organized community service events
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-8">
          {events.map((event, index) => (
            <Card
              key={event.title}
              className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 group overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className={`lg:w-2 w-full lg:h-auto h-2 bg-gradient-to-r lg:bg-gradient-to-b ${event.gradient} group-hover:w-4 lg:group-hover:w-4 lg:group-hover:h-auto group-hover:h-4 transition-all duration-500`}></div>
                
                <div className="flex-1 p-8">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-3xl font-bold gradient-text mb-3 group-hover:scale-105 transition-transform duration-300">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-foreground/70 mb-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{event.participants} expected</span>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${event.gradient} text-white font-medium shadow-lg`}>
                        Open for Registration
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-center gap-3 glass-card p-4 rounded-lg">
                        <Calendar className="h-5 w-5 text-accent" />
                        <span className="text-foreground/90 font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 glass-card p-4 rounded-lg">
                        <Clock className="h-5 w-5 text-secondary" />
                        <span className="text-foreground/90 font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 glass-card p-4 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-400" />
                        <span className="text-foreground/90 font-medium">{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                      {event.description}
                    </p>
                    
                    <Button className={`bg-gradient-to-r ${event.gradient} hover:scale-105 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold`}>
                      Register Now
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
