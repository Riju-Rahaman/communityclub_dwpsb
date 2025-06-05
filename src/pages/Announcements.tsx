
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Bell, Sparkles, Megaphone, Clock } from "lucide-react";

const announcements = [
  {
    title: "New Event Registration Open",
    content: "Registration for the upcoming Beach Cleanup Drive is now open. Limited spots available! Don't miss this opportunity to make a difference.",
    date: "April 19, 2025",
    priority: "high",
    icon: Bell,
    gradient: "from-red-400 to-pink-500",
  },
  {
    title: "Monthly Meeting Update",
    content: "Our monthly club meeting will be held next Monday at 3 PM in the school auditorium. All members are encouraged to attend.",
    date: "April 18, 2025",
    priority: "medium",
    icon: CalendarDays,
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    title: "Volunteer Recognition Ceremony",
    content: "Join us in celebrating our outstanding volunteers at the annual recognition ceremony. Awards and certificates will be presented.",
    date: "April 17, 2025",
    priority: "medium",
    icon: Sparkles,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "New Community Partnership",
    content: "We're excited to announce our new partnership with local environmental organizations to expand our impact.",
    date: "April 16, 2025",
    priority: "low",
    icon: Megaphone,
    gradient: "from-green-400 to-emerald-500",
  },
];

const Announcements = () => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    }
  };

  return (
    <div className="min-h-screen relative">
      <MainNav />
      
      {/* Hero Section */}
      <div className="w-full py-20 px-4 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <Megaphone className="h-8 w-8 text-secondary animate-float" />
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text animate-glow text-shadow-lg">
            Announcements
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest news and important information from our community service club
          </p>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-8">
          {announcements.map((announcement, index) => (
            <Card
              key={announcement.title}
              className="glass-card hover-scale hover-glow transition-all duration-500 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex">
                <div className={`w-2 bg-gradient-to-b ${announcement.gradient} group-hover:w-4 transition-all duration-500`}></div>
                
                <div className="flex-1 p-8">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${announcement.gradient} group-hover:scale-110 transition-transform duration-300`}>
                          <announcement.icon className="h-6 w-6 text-white" />
                        </div>
                        
                        <div>
                          <CardTitle className="text-2xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
                            {announcement.title}
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getPriorityBadge(announcement.priority)}`}>
                              {announcement.priority} Priority
                            </span>
                            <div className="flex items-center gap-2 text-foreground/60">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">Posted on {announcement.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <p className="text-foreground/80 text-lg leading-relaxed">
                      {announcement.content}
                    </p>
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

export default Announcements;
