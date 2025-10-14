import React, { useEffect, useState } from 'react';
import googleGif from '../assets/google.gif';

interface LoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full" style={{ backgroundColor: '#FCFCFE' }}>
      <img 
        src={googleGif} 
        alt="Loading..." 
        className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] 2xl:w-[40rem] 2xl:h-[40rem] object-contain"
      />
    </div>
  );
};

export default Loader;
