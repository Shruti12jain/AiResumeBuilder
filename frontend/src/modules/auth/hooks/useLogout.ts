"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthStore } from "@/hooks/useStore";
import { authService } from "@/services/authService";

export function useLogout() {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // Always clear local state regardless of API success/failure
      authStore.logout();
      queryClient.clear(); // purge all cached server state
      toast.success("You've been signed out.");
      // Hard redirect so the middleware re-runs and cookie absence is enforced
      window.location.href = "/login";
    },
  });
}
