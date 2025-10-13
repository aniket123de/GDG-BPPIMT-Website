import { HeroSection, Event, TeamSection, Footer } from "../components/index";

function Home() {
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
