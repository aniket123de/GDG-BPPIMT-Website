import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { leadsAndOrganizer } from "../data/team";
import Particles from "./Particles";

const TeamMember = lazy(() => import("../components/TeamMember"));

const TeamSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative font-GSD_Regular w-full flex flex-col bg-black py-12 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#4285F4', '#EA4335', '#FBBC04', '#34A853']}
          particleCount={800}
          particleSpread={10}
          speed={0.5}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <p className="text-center text-4xl md:text-5xl font-bold mb-8 text-white">
          MEET OUR TEAM
        </p>
        
        <div className="w-full">
          {leadsAndOrganizer.map((member, index) => (
            <Suspense
              key={index}
              fallback={<div className="m-6 p-6 text-center">Loading...</div>}
            >
              <TeamMember {...member} />
            </Suspense>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/team")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Team Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
