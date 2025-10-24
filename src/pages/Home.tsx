import { HeroSection, Event, TeamSection, Footer } from "../components/index";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-screen">
        <HeroSection />
        <Event />
        <TeamSection />
        <Footer />
        
        {/* Floating Test Button for Leaderboard */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <span className="text-xl">📊</span>
            <span>Test Leaderboard</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
