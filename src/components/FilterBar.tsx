import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  selectedDay: string;
  onDayChange: (value: string) => void;
  availableDays: string[];
  totalEvents: number;
  filteredCount: number;
}

export function FilterBar({
  selectedDay,
  onDayChange,
  availableDays,
  totalEvents,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-10 shadow-soft">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-wine" />
            <span className="text-sm text-muted-foreground">
              Zobrazených <span className="font-semibold text-foreground">{filteredCount}</span> z{" "}
              <span className="font-semibold text-foreground">{totalEvents}</span> akcií
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedDay} onValueChange={onDayChange}>
                <SelectTrigger className="w-[160px] bg-background">
                  <SelectValue placeholder="Všetky dni" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky dni</SelectItem>
                  {availableDays.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedDay !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDayChange("all")}
                className="text-wine hover:text-wine-dark hover:bg-wine/10"
              >
                Zrušiť filter
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
