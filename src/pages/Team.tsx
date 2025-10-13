import MOTImage from "../assets/mot.svg";
import { useEffect, useState, lazy, Suspense, useRef, useCallback } from "react";
import { coreTeamMembers, juniorTeamMembers } from "../data/team";

const TeamMember = lazy(() => import("../components/TeamMember"));

const Team = () => {

  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
  
    return () => {
      window.matchMedia("(min-width: 768px)").removeEventListener('change', handler);
    };
  }, [matches]);

  const ScrollArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
      // Prevent page from scrolling; scroll the list instead
      e.preventDefault();
      e.stopPropagation();
      const el = containerRef.current;
      if (!el) return;
      el.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    }, []);

    return (
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="md:w-1/2 md:h-screen md:p-8 no-scrollbar"
        style={{ overflowY: 'auto' }}
      >
        {children}
      </div>
    );
  };

  // Disable browser scrolling on desktop; restore on cleanup
  useEffect(() => {
    if (matches) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [matches]);

  return (
    <div className="relative font-GSD_Regular w-full bg-[#D8E2F9] min-h-screen md:h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex md:h-screen md:overflow-hidden">
        {/* Left Side - Static */}
        <div className="md:w-1/2 md:flex md:flex-col md:justify-between md:p-8 md:sticky md:top-0">
          <p className="text-5xl font-bold">
            MEET OUR TEAM:
          </p>
          <img loading="lazy" className="w-full max-w-[70%] self-center" src={MOTImage} alt="team illustration" />
        </div>

        {/* Right Side - Always scrollable with hidden scrollbar; scroll via mouse wheel */}
        <ScrollArea>
          {/* All Team Members */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
            {[...coreTeamMembers, ...juniorTeamMembers].map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <TeamMember {...member} />
              </Suspense>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col">
        <p className="pl-6 pt-12 text-center text-4xl font-bold">
          MEET OUR TEAM:
        </p>
        
        {/* All Team Members */}
        <div className="mb-8 mt-8">
          <h2 className="text-3xl font-bold text-center mb-6 px-6">Our Team</h2>
          {[...coreTeamMembers, ...juniorTeamMembers].map((member, index) => (
            <Suspense
              key={index}
              fallback={<div className="m-6 p-6 text-center">Loading...</div>}
            >
              <TeamMember {...member} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
