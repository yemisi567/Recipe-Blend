import React from "react";

interface AuthLayoutProps {
  children: JSX.Element;
}
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="h-screen bg-[#F6F7F9] ">{children}</div>;
};
