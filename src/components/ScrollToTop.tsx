import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group relative w-12 h-12 rounded-full bg-[#0F9D58] hover:bg-[#EA4335] border-none font-semibold flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden hover:w-36 hover:rounded-full"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-4 h-4 transition-all duration-300 group-hover:-translate-y-8 fill-white" 
            viewBox="0 0 384 512"
          >
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
          <span className="absolute bottom-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            Back to Top
          </span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
