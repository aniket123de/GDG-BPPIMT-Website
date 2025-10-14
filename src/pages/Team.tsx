import MOTImage from "../assets/mot.svg";
import { useEffect, useState, lazy, Suspense, useRef, useCallback } from "react";
import { coreTeamMembers, juniorTeamMembers } from "../data/team";
import { TeamSidebar } from "../components/index";

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
        className="flex-1 md:h-screen md:p-8 no-scrollbar"
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
      // Allow the pixel trail to be visible while still disabling scroll
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
        {/* Sidebar */}
        <div className="w-auto h-full">
          <TeamSidebar />
        </div>

        {/* Left Side - Static */}
        <div className="md:w-1/3 md:flex md:flex-col md:justify-between md:p-8 md:sticky md:top-0 md:h-screen">
          <p className="text-4xl xl:text-5xl font-bold">
            MEET OUR TEAM:
          </p>
          <div className="flex-1 flex items-end justify-center pb-4">
            <img loading="lazy" className="w-full max-w-[85%] h-auto object-contain" src={MOTImage} alt="team illustration" />
          </div>
        </div>

        {/* Right Side - Always scrollable with hidden scrollbar; scroll via mouse wheel */}
        <ScrollArea>
          {/* Team Members Organized by Teams */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
            
            {/* Organizer Section */}
            <div id="team-section-organizer" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Leadership</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.includes("Organizer"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* Tech Team Section - First */}
            <div id="team-section-tech" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-purple-600">Tech Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("tech"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* Marketing Team Section - Second */}
            <div id="team-section-marketing" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-orange-600">Marketing Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("marketing"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* AI/ML Team Section */}
            <div id="team-section-ai-ml" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-red-600">AI/ML Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("ai/ml"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* Cloud Team Section */}
            <div id="team-section-cloud" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-blue-600">Cloud Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("cloud"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* Design Team Section */}
            <div id="team-section-design" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-yellow-600">Design Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("design"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>

            {/* Management Team Section */}
            <div id="team-section-management" className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-4 text-green-600">Management Team</h3>
              {[...coreTeamMembers, ...juniorTeamMembers]
                .filter(member => member.Role.toLowerCase().includes("management"))
                .map((member, index) => (
                <Suspense
                  key={index}
                  fallback={<div className="m-6 p-6 text-center">Loading...</div>}
                >
                  <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                    <TeamMember {...member} />
                  </div>
                </Suspense>
              ))}
            </div>
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
              <div id={`member-${member.MemberName.replace(/\s+/g, '-')}`}>
                <TeamMember {...member} />
              </div>
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
