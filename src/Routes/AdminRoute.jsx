import { Navigate } from "react-router-dom";

export default function AdminRoute({ children, currentUser }) {
  if (currentUser === undefined) return <div>Loading...</div>;

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
