import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Calendar, Bell } from "lucide-react";
import AnnouncementCarousel from "@/components/AnnouncementCarousel";
import MemberDirectory from "@/components/MemberDirectory";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<"announcements" | "directory">("announcements");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">VNHBC Directory</h1>
              <p className="text-muted-foreground">Vietnamese Hope Baptist Church</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-primary hover:text-primary/80"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView("announcements")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeView === "announcements"
                  ? "border-accent text-accent"
                  : "border-transparent hover:border-white/50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Announcements</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView("directory")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeView === "directory"
                  ? "border-accent text-accent"
                  : "border-transparent hover:border-white/50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Member Directory</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeView === "announcements" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">Church Announcements</h2>
              <p className="text-muted-foreground">Stay updated with the latest church news and events</p>
            </div>
            <AnnouncementCarousel />
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "Total Members", value: "247", icon: <Users className="w-6 h-6" /> },
                { title: "Active Events", value: "8", icon: <Calendar className="w-6 h-6" /> },
                { title: "New Announcements", value: "3", icon: <Bell className="w-6 h-6" /> }
              ].map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === "directory" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">Member Directory</h2>
              <p className="text-muted-foreground">Find and connect with our church family</p>
            </div>
            <MemberDirectory />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;