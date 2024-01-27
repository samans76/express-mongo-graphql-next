import React from "react";

type ButtonProps = {
  title: string;
  onClick: () => void;
  className?: string;
  icon?: string;
};

function Button({ className, title, icon, onClick }: ButtonProps) {
  return (
    <div
      className={`w-fit p-2 flex gap-2 justify-center items-center rounded-md bg-purple-500 hover:bg-purple-800 text-white text-[16px] shadow-md cursor-pointer ${className}`}
      onClick={onClick}
    >
      {title}
      {icon && icon}
    </div>
  );
}

export default Button;
