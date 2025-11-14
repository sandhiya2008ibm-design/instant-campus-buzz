import { useState, useEffect } from "react";
import { NoticeCard } from "@/components/NoticeCard";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "urgent" | "general" | "event";
  timestamp: string;
}

const Display = () => {
  // Mock data - will be replaced with real data from backend
  const [notices] = useState<Notice[]>([
    {
      id: "1",
      title: "School Assembly Tomorrow",
      content: "All students are required to attend the morning assembly at 8:00 AM in the main auditorium. Please be on time.",
      category: "general",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Science Fair Next Week",
      content: "The annual Science Fair will be held on Friday, March 15th. Students interested in participating should register with Ms. Johnson by Monday.",
      category: "event",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      title: "Exam Schedule Change",
      content: "Due to unforeseen circumstances, the Math exam has been rescheduled from Tuesday to Thursday. Please check the updated timetable on the notice board.",
      category: "urgent",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digital Notice Board
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Stay updated with latest announcements
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {currentTime.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTime.toLocaleDateString([], { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <Link to="/admin">
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Notices Grid */}
      <main className="container mx-auto px-6 py-8">
        {notices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No notices to display</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                title={notice.title}
                content={notice.content}
                category={notice.category}
                timestamp={notice.timestamp}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Display;
