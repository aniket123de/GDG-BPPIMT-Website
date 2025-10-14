import MOTImage from "../assets/mot.svg";
import { useEffect, useState, lazy, Suspense, useRef, useCallback } from "react";
import { coreTeamMembers, juniorTeamMembers } from "../data/team";
import { TeamSidebar } from "../components/index";

const TeamMember = lazy(() => import("../components/TeamMember"));

const Team = () => {

  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  const [activeSection, setActiveSection] = useState<string>('organizer');

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
  
    return () => {
      window.matchMedia("(min-width: 768px)").removeEventListener('change', handler);
    };
  }, [matches]);

  // Mobile scroll tracking for active section highlighting
  useEffect(() => {
    if (matches) return; // Only for mobile

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let sectionId = entry.target.id.replace('mobile-team-section-', '');
          // Handle special case for AI/ML section
          if (sectionId === 'ai-ml') {
            setActiveSection('ai-ml');
          } else {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [
      'mobile-team-section-organizer',
      'mobile-team-section-tech', 
      'mobile-team-section-marketing',
      'mobile-team-section-ai-ml',
      'mobile-team-section-cloud',
      'mobile-team-section-design',
      'mobile-team-section-management'
    ];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
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
        
        {/* Mobile Team Navigation */}
        <div className="sticky top-0 z-10 bg-[#D8E2F9] bg-opacity-95 backdrop-blur-md border-b border-gray-200 mt-4 shadow-sm">
          <div className="relative">
            <div className="px-3 py-3">
              <div className="flex overflow-x-auto space-x-2 scrollbar-hide pb-2">
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-organizer');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'organizer' 
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white ring-2 ring-slate-400 scale-105' 
                    : 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700 hover:scale-105'
                }`}
              >
                Leadership
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-tech');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'tech' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white ring-2 ring-indigo-400 scale-105' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 hover:scale-105'
                }`}
              >
                Tech
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-marketing');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'marketing' 
                    ? 'bg-gradient-to-r from-rose-600 to-pink-700 text-white ring-2 ring-rose-400 scale-105' 
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-400 hover:to-pink-500 hover:scale-105'
                }`}
              >
                Marketing
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-ai-ml');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'ai-ml' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white ring-2 ring-emerald-400 scale-105' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 hover:scale-105'
                }`}
              >
                AI/ML
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-cloud');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'cloud' 
                    ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white ring-2 ring-sky-400 scale-105' 
                    : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 hover:scale-105'
                }`}
              >
                Cloud
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-design');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'design' 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white ring-2 ring-amber-400 scale-105' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 hover:scale-105'
                }`}
              >
                Design
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('mobile-team-section-management');
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-md ${
                  activeSection === 'management' 
                    ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white ring-2 ring-violet-400 scale-105' 
                    : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 hover:scale-105'
                }`}
              >
                Management
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Mobile Team Members Organized by Teams */}
        <div className="mb-8 mt-4">
          <h2 className="text-3xl font-bold text-center mb-6 px-6">Our Team</h2>
          
          {/* Organizer Section */}
          <div id="mobile-team-section-organizer" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent px-6">Leadership</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.includes("Organizer"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* Tech Team Section */}
          <div id="mobile-team-section-tech" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent px-6">Tech Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("tech"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* Marketing Team Section */}
          <div id="mobile-team-section-marketing" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent px-6">Marketing Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("marketing"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* AI/ML Team Section */}
          <div id="mobile-team-section-ai-ml" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent px-6">AI/ML Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("ai/ml"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* Cloud Team Section */}
          <div id="mobile-team-section-cloud" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent px-6">Cloud Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("cloud"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* Design Team Section */}
          <div id="mobile-team-section-design" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent px-6">Design Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("design"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>

          {/* Management Team Section */}
          <div id="mobile-team-section-management" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent px-6">Management Team</h3>
            {[...coreTeamMembers, ...juniorTeamMembers]
              .filter(member => member.Role.toLowerCase().includes("management"))
              .map((member, index) => (
              <Suspense
                key={index}
                fallback={<div className="m-6 p-6 text-center">Loading...</div>}
              >
                <div id={`mobile-member-${member.MemberName.replace(/\s+/g, '-')}`}>
                  <TeamMember {...member} />
                </div>
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
