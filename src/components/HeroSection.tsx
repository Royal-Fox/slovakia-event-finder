import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="gradient-hero py-16 md:py-24 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in">
          Kultúrne Akcie
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Objavte najlepšie kultúrne podujatia na Slovensku
        </p>
        
        <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Hľadať podľa názvu..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-lg bg-card border-none shadow-elevated rounded-xl focus-visible:ring-gold"
          />
        </div>
      </div>
    </section>
  );
}
