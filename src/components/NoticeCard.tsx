import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, Calendar, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoticeCardProps {
  title: string;
  content: string;
  category: "urgent" | "general" | "event";
  timestamp: string;
  className?: string;
}

export const NoticeCard = ({ title, content, category, timestamp, className }: NoticeCardProps) => {
  const categoryConfig = {
    urgent: {
      icon: AlertCircle,
      label: "Urgent",
      className: "bg-urgent text-urgent-foreground",
    },
    general: {
      icon: Info,
      label: "General",
      className: "bg-primary text-primary-foreground",
    },
    event: {
      icon: Calendar,
      label: "Event",
      className: "bg-secondary text-secondary-foreground",
    },
  };

  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Badge className={cn("px-3 py-1 flex items-center gap-2", config.className)}>
            <Icon className="w-4 h-4" />
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-base leading-relaxed text-foreground/90">{content}</p>
    </Card>
  );
};
