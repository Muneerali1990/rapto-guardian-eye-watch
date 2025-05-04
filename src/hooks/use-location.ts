'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLocations, postLocation, type LocationData } from '@/lib/api/location';

export const useLocations = () => {
  const queryClient = useQueryClient();

  const { data: locations = [], isLoading, error } = useQuery<LocationData[]>({
    queryKey: ['locations'],
    queryFn: fetchLocations,
    refetchInterval: 3000
  });

  const { mutate: saveLocation } = useMutation({
    mutationFn: postLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    }
  });

  return { locations, isLoading, error, saveLocation };
};