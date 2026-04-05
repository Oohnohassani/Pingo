// Import 📩
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";
// import { useEffect } from "react";

function ProtectedRoute({ children }) {
  // Consume context
  const { isAuthenticated } = useAuth();

  // const navigate = useNavigate();

  // 1. DO
  // Redirect path id not Authenticated (Remember: use <Navigate/> component for re-direction during render!)
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // 2. DO NOT
  // useEffect(() => {
  //   if (!isAuthenticated) return navigate("/", { replace: true });
  // }, [isAuthenticated, navigate]); // Avoid: The problem with this is, effects run after render(useNavigate too runs after render and commit phase) so you will see the protected route / component flashing for a sec before redirection. BIG MISTAKE!

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

/* Note: <Navigate /> works during render, while navigate() runs after render—and that timing difference is usually why one works and the other doesn’t in protected routes.

  🔹 1. <Navigate /> (component)
      - Runs during render
      - React Router sees it immediately and redirects before anything else renders
      - Perfect for protected routes

      Example:

      if (!user) {
           return <Navigate to="/login" replace />;
      }

    👉 This prevents the protected page from ever rendering.


    🔹 2. navigate() (function from useNavigate)
      - Runs imperatively (after render)
      - Usually used inside useEffect or event handlers

    Example: 

    const navigate = useNavigate();

    useEffect(() => {
       if (!user) {
           navigate("/login");
        }
    }, [user]);

  👉 Problem: the component renders first, then redirects.

*/
