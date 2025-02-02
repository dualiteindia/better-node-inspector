import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  icon?: string;
  onClick?: () => void;
}

export const Button = ({ onClick, children, icon }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-gradient-to-b from-buttonBlue1 to-buttonBlue2 text-white font-bold rounded flex justify-between items-center gap-1 py-2 text-xs px-3 dropshadow-glowMedium "
      >
        {children}
      </button>
    </div>
  );
};
