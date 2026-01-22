import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export default ProtectedRoute;
