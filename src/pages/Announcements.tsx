
import MainNav from "@/components/MainNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const Announcements = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Announcements</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-secondary" />
                New Event Registration Open
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Registration for the upcoming Beach Cleanup Drive is now open.
                Limited spots available!
              </p>
              <p className="text-sm text-gray-500">Posted on April 19, 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-secondary" />
                Monthly Meeting Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Our monthly club meeting will be held next Monday at 3 PM in the
                school auditorium.
              </p>
              <p className="text-sm text-gray-500">Posted on April 18, 2025</p>
            </CardContent>
          </Card>

          {/* More announcement cards can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
