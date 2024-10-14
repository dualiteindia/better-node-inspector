
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  icon?: string; 
}

export const Button = ({ children}: ButtonProps) => {
  return (
    <button className="ui-bg-red-600">
      {children}
    </button>
  );
};