import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../lib/api/profile";

export function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
}

export function useUpdateProfile(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) => updateProfile(userId, updates),
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile", userId], profile);
    },
  });
}
