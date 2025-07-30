import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Calendar, MapPin } from "lucide-react";
import churchHero from "@/assets/church-hero.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${churchHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Vietnamese Hope
              <br />
              <span className="text-accent">Baptist Church</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Welcome to our church directory - a place where our community connects, 
              grows, and serves together in faith and love.
            </p>
            <div className="animate-slide-up delay-300">
              <Button 
                variant="church" 
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg px-12 py-6 h-auto"
              >
                Go into VNHBC
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Church Directory</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay connected with our church family through our comprehensive member directory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Member Directory",
                description: "Find and connect with fellow church members"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Events & Announcements",
                description: "Stay updated with latest church activities"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Location Search",
                description: "Find members by location and state"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Community Care",
                description: "Support and care for one another"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Join Our Church Family</h2>
          <p className="text-xl mb-8 opacity-90">
            Access our member directory to connect, fellowship, and grow together in faith
          </p>
          <Button 
            variant="gold" 
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-4 h-auto"
          >
            Access Directory
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-foreground border-t py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-primary mb-2">Vietnamese Hope Baptist Church</h3>
          <p className="text-muted-foreground">Building community through faith, hope, and love</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;