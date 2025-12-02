import { useQuery } from "@tanstack/react-query";
import type { CulturalEvent } from "@/types/event";

const API_URL = "https://primary-production-d8933.up.railway.app/webhook/kulturni-akce";

export function useEvents() {
  return useQuery<CulturalEvent[]>({
    queryKey: ["cultural-events"],
    queryFn: async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both single object and array responses
        if (Array.isArray(data)) {
          return data;
        }
        // If it's a single object, wrap it in an array
        if (data && typeof data === 'object') {
          return [data];
        }
        return [];
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // CORS or network error
        throw new Error("Nepodarilo sa načítať dáta. Skontrolujte CORS nastavenia vášho n8n webhooku.");
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
