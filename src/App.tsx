
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Footer, Articles, FeedbackForm, IndividualPastEvent, IndividualUpcomingEvent, ScrollProgress, ScrollToTop, Loader } from "./components/index.ts";
import {Home, Team , Events } from "./pages/index.ts"
import Hackathon from "./hackathon/Hackathon";
import LeaderboardHome from "./leaderboard/Home";
import LeaderboardTable from "./leaderboard/leaderboard";
import Winners from "./leaderboard/Winners";
import Rules from "./leaderboard/Rules";
import Campaign from "./leaderboard/Campaign";
import FloatingNavbar from "./leaderboard/FloatingNavbar";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";
import "./leaderboard/leaderboard-global.css";

import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Check if current route is a leaderboard page
  const isLeaderboardPage = location.pathname.startsWith('/leaderboard') || 
                             location.pathname === '/winners' || 
                             location.pathname === '/rules' || 
                             location.pathname === '/syllabus';

  // Handle loading for initial page load and route changes
  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  })

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [location.pathname]);

  return (
    <>
      <Loader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
          <ScrollProgress />
          <Navbar />
          <div className={`w-full min-h-screen ${isLeaderboardPage ? 'leaderboard-page' : ''}`}>
            <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/leaderboard" element={<LeaderboardHome />} />
          <Route path="/leaderboard/table" element={<LeaderboardTable />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/syllabus" element={<Campaign />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route
            path="/events/PastEvents/:id"
            element={<IndividualPastEvent />}
          />
          <Route
            path="/events/UpcomingEvents/:id"
            element={<IndividualUpcomingEvent />}
          />
            </Routes>
          </div>
          <Footer />
          {isLeaderboardPage && <FloatingNavbar />}
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
