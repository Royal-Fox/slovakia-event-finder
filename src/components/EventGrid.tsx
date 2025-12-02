import { EventCard } from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { CulturalEvent } from "@/types/event";
import { CalendarX } from "lucide-react";

interface EventGridProps {
  events: CulturalEvent[];
  isLoading: boolean;
  error: Error | null;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl p-6 space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <CalendarX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Žiadne akcie nenájdené
      </h3>
      <p className="text-muted-foreground">
        Skúste upraviť vyhľadávanie alebo filtre
      </p>
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
        <CalendarX className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Chyba pri načítavaní
      </h3>
      <p className="text-muted-foreground">
        {error.message}
      </p>
    </div>
  );
}

export function EventGrid({ events, isLoading, error }: EventGridProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard key={`${event.nazov}-${event.datum}-${index}`} event={event} index={index} />
      ))}
    </div>
  );
}
