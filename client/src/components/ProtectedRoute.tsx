import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/authStore";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, logout } = useAuthStore();

  const token = currentUser.accessToken;
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const { exp } = jwtDecode(token);

    if (Date.now() >= exp * 1000) {
      // expired
      logout();
      return <Navigate to="/" replace />;
    }
  } catch {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
