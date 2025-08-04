import React, { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 px-3 py-2 bg-black text-white text-sm rounded-md text-center z-10">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45 mt-[-4px]"></div>
      </div>
    </div>
  );
};

export default Tooltip;
