
import React from 'react';

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="text-center my-12 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-cyan-400 border-b-cyan-400 border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-300">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
