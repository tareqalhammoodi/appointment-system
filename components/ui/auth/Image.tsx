import React from 'react';

const Image: React.FC = () => {
  return (
    <div className="hidden lg:flex w-3/5 relative bg-clear">
      <div className="w-full h-screen p-8 relative">
        <img
          src="/assets/components/main-image.webp"
          alt="mext"
          className="w-full h-full object-cover rounded-3xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Image;
