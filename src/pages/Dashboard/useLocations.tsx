'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '@/lib/api/location';

export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      try {
        return await fetchLocations();
      } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to load locations. Check console for details.');
      }
    },
    refetchInterval: 3000,
    retry: 1, // Only retry once on failure
    retryDelay: 1000,
  });
};