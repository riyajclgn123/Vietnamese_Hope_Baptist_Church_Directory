import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from "lucide-react";

const mockAnnouncements = [
  {
    id: 1,
    title: "Sunday Worship Service",
    description: "Join us for our weekly worship service with Pastor John. We'll be continuing our sermon series on 'Walking in Faith'.",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    type: "Service",
    color: "bg-gradient-hero"
  },
  {
    id: 2,
    title: "Youth Bible Study",
    description: "Young adults ages 18-35 are invited to join our weekly Bible study. This week we're studying the book of Philippians.",
    date: "Wednesday, Jan 31",
    time: "7:00 PM",
    location: "Fellowship Hall",
    type: "Bible Study",
    color: "bg-gradient-accent"
  },
  {
    id: 3,
    title: "Community Outreach Event",
    description: "Help us serve our local community by volunteering at the food bank. Lunch will be provided for all volunteers.",
    date: "Saturday, Feb 3",
    time: "9:00 AM - 3:00 PM",
    location: "Local Food Bank",
    type: "Outreach",
    color: "bg-primary"
  },
  {
    id: 4,
    title: "Women's Prayer Meeting",
    description: "All women of the church are invited to join us for prayer, fellowship, and encouragement. Light refreshments will be served.",
    date: "Friday, Feb 2",
    time: "7:00 PM",
    location: "Conference Room",
    type: "Prayer",
    color: "bg-secondary"
  }
];

const AnnouncementCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockAnnouncements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockAnnouncements.length) % mockAnnouncements.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg shadow-elegant">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mockAnnouncements.map((announcement) => (
            <div key={announcement.id} className="w-full flex-shrink-0">
              <Card className={`${announcement.color} text-white border-0 h-80`}>
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {announcement.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{announcement.title}</h3>
                    <p className="text-lg opacity-90 leading-relaxed">{announcement.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/90">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-medium">{announcement.date}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">{announcement.time}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="font-medium">{announcement.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {mockAnnouncements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-muted hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCarousel;