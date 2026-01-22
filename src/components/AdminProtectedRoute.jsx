import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminProtectedRoute;
