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
      </div>
    </>
  );
}

export default Home;
