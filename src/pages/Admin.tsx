import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoticeCard } from "@/components/NoticeCard";
import { Plus, Trash2, Monitor, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "urgent" | "general" | "event";
  timestamp: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "School Assembly Tomorrow",
      content: "All students are required to attend the morning assembly at 8:00 AM in the main auditorium.",
      category: "general",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Science Fair Next Week",
      content: "The annual Science Fair will be held on Friday, March 15th. Students interested in participating should register with Ms. Johnson.",
      category: "event",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    category: "general" as "urgent" | "general" | "event",
  });

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const notice: Notice = {
      id: Date.now().toString(),
      ...newNotice,
      timestamp: new Date().toISOString(),
    };

    setNotices([notice, ...notices]);
    setNewNotice({ title: "", content: "", category: "general" });
    
    toast({
      title: "Success",
      description: "Notice posted successfully",
    });
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id));
    toast({
      title: "Deleted",
      description: "Notice removed successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and publish notices
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Monitor className="h-4 w-4" />
                  View Display
                </Button>
              </Link>
              <Button variant="outline" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Notice Form */}
          <Card className="p-6 shadow-[var(--shadow-elevated)] h-fit">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              Create New Notice
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter notice content"
                  rows={6}
                  value={newNotice.content}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, content: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newNotice.category}
                  onValueChange={(value: "urgent" | "general" | "event") =>
                    setNewNotice({ ...newNotice, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddNotice}
                className="w-full"
                size="lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Notice
              </Button>
            </div>
          </Card>

          {/* Posted Notices */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Posted Notices ({notices.length})</h2>
            
            {notices.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No notices posted yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="relative group">
                    <NoticeCard {...notice} />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteNotice(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
