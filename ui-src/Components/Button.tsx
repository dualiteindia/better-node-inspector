import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  icon?: string;
}

export const Button = ({ children, icon }: ButtonProps) => {
  return (
    <div>
      <button className="bg-gradient-to-b from-buttonBlue1 to-buttonBlue2 text-white font-bold rounded flex justify-between items-center gap-1 py-2 text-xs px-3">
        <img src={icon} alt="shineIcon" className="h-[10px] w-[10px]" />
        {children}
      </button>
    </div>
  );
};
