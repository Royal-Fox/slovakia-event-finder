import { useQuery } from "@tanstack/react-query";
import type { CulturalEvent } from "@/types/event";

const API_URL = "https://primary-production-d8933.up.railway.app/webhook/kulturni-akce";

export function useEvents() {
  return useQuery<CulturalEvent[]>({
    queryKey: ["cultural-events"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      
      // Handle both single object and array responses
      if (Array.isArray(data)) {
        return data;
      }
      // If it's a single object, wrap it in an array
      return [data];
    },
    staleTime: 5 * 60 * 1000,
  });
}
