import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Footer, Articles, FeedbackForm, IndividualPastEvent, IndividualUpcomingEvent, ScrollProgress, ScrollToTop, Loader } from "./components/index.ts";
import {Home, Team , Events } from "./pages/index.ts"
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

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
          <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/contact" element={<Footer />} />
        <Route
          path="/events/PastEvents/:id"
          element={<IndividualPastEvent />}
        />
        <Route
          path="/events/UpcomingEvents/:id"
          element={<IndividualUpcomingEvent />}
        />
          </Routes>
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
