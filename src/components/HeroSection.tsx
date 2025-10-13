import { useState, useEffect, memo, useMemo } from "react";
import { FaRegSquare } from "react-icons/fa6";
import p1 from "/images/left_kite.svg";
import p2 from "/images/right_kite.svg";
import p3 from "/images/planets.svg";
import p4 from "/images/boysitting.svg";
import p6 from "/images/cloud_2.svg";
import p7 from "/images/cloud_3.svg";
import p8 from "/images/react_icon.svg";
import p9 from "/images/programming.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import am1 from "../assets/amongus1.png";
import am2 from "../assets/amongus2.png";
import am3 from "../assets/amongus3.png";
import { Link } from "react-router-dom";
import Squares from "./Squares";
import AmongUsButton from "./AmongUsButton";
import DecryptedText from "./DecryptedText";

const MemoizedFaRegSquare = memo(FaRegSquare);

const HeroSection = () => {
  const [boldLetters, setBoldLetters] = useState(Array(15).fill(true));
  const [direction, setDirection] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  // Title letter animation logic (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setBoldLetters((prev) => {
        const nextBoldLetters = [...prev];
        if (direction) {
          const lastTrueIndex = nextBoldLetters.lastIndexOf(true);
          if (lastTrueIndex !== -1) {
            nextBoldLetters[lastTrueIndex] = false;
            if (lastTrueIndex === 0) {
              setDirection(false);
              setVibrate(true);
            }
          }
        } else {
          const firstFalseIndex = nextBoldLetters.indexOf(false);
          if (firstFalseIndex !== -1) {
            for (let i = 0; i <= firstFalseIndex; i++) {
              nextBoldLetters[i] = true;
            }
            if (nextBoldLetters.every((isBold) => isBold)) {
              setDirection(true);
              setVibrate(true);
            }
          }
        }
        return nextBoldLetters;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    if (vibrate) {
      const timeout = setTimeout(() => {
        setVibrate(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [vibrate]);

  const titleLetters = [
    { letter: "“", color: "text-red-500" },
    { letter: "G", color: "text-green-600" },
    { letter: "D", color: "text-green-600" },
    { letter: "G", color: "text-green-600" },
    { letter: "\u00A0", color: "text-black" },
    { letter: "O", color: "text-yellow-500" },
    { letter: "N", color: "text-yellow-500" },
    { letter: "\u00A0", color: "text-black" },
    { letter: "C", color: "text-blue-500" },
    { letter: "A", color: "text-blue-500" },
    { letter: "M", color: "text-blue-500" },
    { letter: "P", color: "text-blue-500" },
    { letter: "U", color: "text-blue-500" },
    { letter: "S", color: "text-blue-500" },
    { letter: "”", color: "text-red-600" },
  ];

  // Scroll-based animation hooks
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Simple starfield positions
  const stars = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1,
    delay: (i % 10) * 0.4,
  }));

  // Randomized Among Us sprite paths (non-repeating, sometimes offscreen)
  const amongSprites = useMemo(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const edges = ["left", "right", "top", "bottom"] as const;

    const startFromEdge = (edge: typeof edges[number]) => {
      switch (edge) {
        case "left":
          return { x: "-15vw", y: `${rand(0, 100)}vh` };
        case "right":
          return { x: "115vw", y: `${rand(0, 100)}vh` };
        case "top":
          return { x: `${rand(0, 100)}vw`, y: "-15vh" };
        case "bottom":
          return { x: `${rand(0, 100)}vw`, y: "115vh" };
      }
    };

    const exitToEdge = (edge: typeof edges[number]) => {
      switch (edge) {
        case "left":
          return { x: "-20vw", y: `${rand(0, 100)}vh` };
        case "right":
          return { x: "120vw", y: `${rand(0, 100)}vh` };
        case "top":
          return { x: `${rand(0, 100)}vw`, y: "-20vh" };
        case "bottom":
          return { x: `${rand(0, 100)}vw`, y: "120vh" };
      }
    };

    const sprites = Array.from({ length: 3 }).map((_, i) => {
      const startEdge = edges[i % edges.length];
      const exitEdge = edges[(i + 1 + Math.floor(rand(0, 3))) % edges.length];
      const start = startFromEdge(startEdge);
      const mid1 = { x: `${rand(5, 95)}vw`, y: `${rand(5, 95)}vh` };
      const mid2 = { x: `${rand(0, 100)}vw`, y: `${rand(0, 100)}vh` };
      const exit = exitToEdge(exitEdge);

      return {
        id: `ams-${i}`,
        img: [am1, am2, am3][Math.floor(rand(0, 3))],
        sizeVw: rand(5, 9),
        lefts: [start.x, mid1.x, mid2.x, exit.x],
        tops: [start.y, mid1.y, mid2.y, exit.y],
        rotate: [0, rand(-20, 20), rand(-30, 30), 0],
        duration: rand(14, 24),
        delay: rand(0, 6),
      };
    });

    return sprites;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full min-h-screen font-GSD_Regular flex items-center justify-center flex-col overflow-hidden bg-white"
    >
      {/* Squares grid background */}
      <div className="absolute inset-0 z-0">
        <Squares
          direction="down"
          speed={0.1}
          squareSize={70}
          borderColor="#C8C3C1"
          hoverFillColor="#ea4335"
          hoverColors={["#4285f4", "#34a853", "#f9ab00", "#ea4335"]}
        />
      </div>
      {/* Starfield background (kept subtle to preserve existing artwork) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            className="absolute rounded-full bg-white/80"
          />
        ))}
      </div>

      {/* Chaotic Among Us sprites drifting with random, non-repeating paths */}
      {amongSprites.map((s) => (
        <motion.img
          key={s.id}
          src={s.img}
          alt="amongus"
          className="absolute select-none pointer-events-none z-[1]"
          style={{ width: `${s.sizeVw}vw` }}
          initial={{ left: s.lefts[0], top: s.tops[0], rotate: 0 }}
          animate={{ left: s.lefts, top: s.tops, rotate: s.rotate }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
      {/* Left Kite with continuous up/down and left/right motion */}
      <motion.img
        src={p1}
        alt="left_kite"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] sm:top-[33%] left-[0%] w-[15vw] sm:w-[10vw]"
      />

      {/* Right Kite with continuous up/down and right/left motion */}
      <motion.img
        src={p2}
        alt="right_kite"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[44%] right-[0%] w-[15vw] sm:w-[10vw]"
      />

      {/* Other decorative images combining scroll-based and keyframe animations */}
      <motion.img
        src={p3}
        alt="planets"
        style={{ scale }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] right-[10%] w-[15vw] sm:w-[8vw]"
      />

      <motion.img
        src={p4}
        alt="boy_sitting"
        style={{ x: rotate }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[0%] left-[0%] w-[30vw] sm:w-[18vw]"
      />
      <motion.img
        src={p6}
        alt="Cloud_2"
        style={{ rotate }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[3%] right-[25%] w-[8vw] sm:w-[3vw]"
      />
      <motion.img
        src={p7}
        alt="Cloud_3"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[6%] left-[10%] w-[18vw] sm:w-[9vw]"
      />
      <motion.img
        src={p8}
        alt="react_icon"
        style={{ scale }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[3%] w-[4vw] sm:w-[2vw] hidden sm:block"
      />
      <motion.img
        src={p8}
        alt="react_icon"
        style={{ scale }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] left-[3%] w-[4vw] sm:w-[2vw] hidden sm:block"
      />
      <motion.img
        src={p8}
        alt="react_icon"
        style={{ scale }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[27%] w-[4vw] sm:w-[2vw]"
      />
      <motion.img
        src={p9}
        alt="programming"
        style={{ rotate }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[0%] right-[0%] w-[30vw] sm:w-[22vw]"
      />

      {/* Removed red crewmate and grey spaceship per request */}

      {/* Title Section */}
      <div className="text-[11vw] sm:text-[8vw] flex justify-center items-center leading-none mb-0 text-center mt-6 w-[92%] sm:w-[72%] mx-auto z-10">
        {titleLetters.map((item, index) => (
          <span
            key={index}
            className={`${item.color} ${boldLetters[index] ? "font-extrabold" : "font-medium"}`}
            style={{ letterSpacing: "0.05em" }}
          >
            {item.letter}
          </span>
        ))}
      </div>

      {/* BPPIMT title (red circle removed) */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative z-10 uppercase text-[10vw] sm:text-[8vw] font-GSD_Regular leading-none mb-10 text-center font-extrabold">
          <DecryptedText
            text="BPPIMT"
            speed={185}
            maxIterations={15}
            sequential
            revealDirection="start"
            useOriginalCharsOnly={false}
            animateOn="both"
          />
        </div>
      </div>

      <div className="font-GSD-Regular text-[4vw] sm:text-[20px] w-[80vw] sm:w-[50vw] leading-none mb-10 text-center text-grey-700 z-10">
        By offering seminars, mentorship initiatives, and forums for exchanging
        insights, we strive to foster a community that embraces lifelong
        learning and the sharing of knowledge.
      </div>

      {/* Animated Icons Row */}
      <motion.div
        className="font-GSD-Regular text-[3.5vw] sm:text-[1vw] w-[90%] sm:w-[85%] flex items-center justify-center mb-8 text-grey-700 z-10"
        style={{ scale }}
      >
        <span className="px-4 text-grey-700">LEARN</span>
        <motion.div style={{ rotate }}>
          <MemoizedFaRegSquare />
        </motion.div>
        <span className="px-4 text-grey-700">GROW</span>
        <motion.div style={{ rotate }}>
          <MemoizedFaRegSquare />
        </motion.div>
        <span className="px-4 text-grey-700">BUILD</span>
      </motion.div>

      {/* Animated Call-to-Action Button */}
      <Link to="https://gdg.community.dev/gdg-on-campus-bppimt-kolkata-india/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="transition-transform duration-300 ease-in-out z-10"
        >
          <AmongUsButton />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default HeroSection;