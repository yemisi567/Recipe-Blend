import React from "react";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (Boolean(token)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};
