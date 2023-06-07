import { getDecodedJwt, isAuthenticated } from "../utils/auth";
import { useQuery } from "react-query";
import { useAlert } from "../context/NotificationProvider";
import handleApiError from "../utils/handleApiError";
import { fetchUser } from "../services/authService";

export const useAuthenticatedUser = () => {
  const decodedUser = getDecodedJwt();
  const { showNotification } = useAlert();
  const userId = decodedUser.id;

  const { isLoading, data } = useQuery(["user_by_id", { userId }], fetchUser, {
    enabled: isAuthenticated() && userId !== null && userId !== undefined,
    onError: (error) => {
      showNotification?.(handleApiError(error), { type: "error" });
    },
  });

  return { isLoading, userDetails: data };
};
