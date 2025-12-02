import { useState, useMemo } from "react";
import { useEvents } from "@/hooks/useEvents";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { EventGrid } from "@/components/EventGrid";

const Index = () => {
  const { data, isLoading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("all");

  // Ensure events is always an array
  const events = Array.isArray(data) ? data : [];

  // Get unique days for filter
  const availableDays = useMemo(() => {
    const days = [...new Set(events.map((e) => e.den))];
    return days.sort();
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        event.nazov.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Day filter
      const matchesDay = selectedDay === "all" || event.den === selectedDay;

      return matchesSearch && matchesDay;
    });
  }, [events, searchQuery, selectedDay]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <FilterBar
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
        availableDays={availableDays}
        totalEvents={events.length}
        filteredCount={filteredEvents.length}
      />

      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <EventGrid 
          events={filteredEvents} 
          isLoading={isLoading} 
          error={error as Error | null} 
        />
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Kultúrne Akcie Slovensko
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
