import { Calendar, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CulturalEvent } from "@/types/event";

interface EventCardProps {
  event: CulturalEvent;
  index: number;
}

// Decode HTML entities
function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function EventCard({ event, index }: EventCardProps) {
  const decodedName = decodeHtml(event.nazov);

  return (
    <Card
      className="group gradient-card border-border/50 hover:shadow-elevated hover:border-gold/30 transition-all duration-300 overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-0">
        <div className="p-5 md:p-6">
          {/* Date badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-wine/10 text-wine text-sm font-medium">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {event.datum}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/15 text-accent-foreground text-sm font-medium">
              {event.den}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-3 group-hover:text-wine transition-colors line-clamp-2">
            {decodedName}
          </h3>

          {/* Time */}
          <div className="flex items-center text-muted-foreground mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.cas}</span>
          </div>

          {/* Action */}
          <Button
            asChild
            className="w-full bg-wine hover:bg-wine-dark text-primary-foreground group-hover:shadow-glow transition-all"
          >
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Zobraziť detail
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
