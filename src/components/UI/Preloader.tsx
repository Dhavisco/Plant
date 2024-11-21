// src/components/Preloader.tsx
import React from 'react';
import Logo from '../icons/Logo';

const Preloader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="spinner-border animate-bounce inline-block w-12 h-12">
        <Logo/>
      </div>
    </div>
  );
};

export default Preloader;
