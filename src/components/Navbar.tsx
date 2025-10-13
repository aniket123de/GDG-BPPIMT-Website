import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "/images/Header_Logo.svg";

// Color palette for randomized buttons
const BUTTON_COLORS = [
  { bg: '#4285f4', hover: '#3367d6', text: 'white' }, // Blue 500
  { bg: '#34a853', hover: '#2d8f47', text: 'white' }, // Green 500
  { bg: '#f9ab00', hover: '#e09a00', text: 'white' }, // Yellow 600
  { bg: '#ea4335', hover: '#d33b2c', text: 'white' }, // Red 500
];

// Function to get random colors for buttons
const getRandomButtonColors = () => {
  const loginColor = BUTTON_COLORS[Math.floor(Math.random() * BUTTON_COLORS.length)];
  const signupColor = BUTTON_COLORS[Math.floor(Math.random() * BUTTON_COLORS.length)];
  return { loginColor, signupColor };
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonColors, setButtonColors] = useState(() => getRandomButtonColors());

  useEffect(() => {
    setMenuOpen(false); // Close menu when location changes
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const regenerateColors = () => {
    setButtonColors(getRandomButtonColors());
  };

  return (
    <nav className="navbar relative bg-white p-4 flex justify-between items-center w-full shadow-md px-[5vw] font-GSD_Regular z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <button onClick={() => navigate("/")}>
          <img src={Logo} alt="GDG logo" className="h-12 mr-2" />
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8 text-lg">
        <button
          className="nav-links text-gray-800 relative"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="nav-links text-gray-800 relative"
          onClick={() => navigate("/events")}
        >
          Events
        </button>
        <button
          className="text-gray-800 nav-links relative"
          onClick={() => navigate("/team")}
        >
          Team
        </button>
        {/* <button
          className="text-gray-800 nav-links relative"
          onClick={() => navigate("/articles")}
        >
          Articles
        </button> */}
        <button
          className="text-gray-800 nav-links relative"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <AiOutlineClose className="w-6 h-6 text-gray-800" />
          ) : (
            <AiOutlineMenu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-opacity-70 backdrop-blur-lg text-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } z-50`}
        style={{
          background: "rgba(66, 133, 244, 0.55)", // Glassmorphic background
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Close Button Inside the Overlay */}
        <button
          className="absolute top-6 right-8 text-white text-3xl"
          onClick={toggleMenu}
        >
          <AiOutlineClose className="w-8 h-8" />
        </button>

        {/* Menu Links */}
        <button
          className="text-white text-3xl mb-6 transition relative"
          onClick={() => {
            navigate("/");
            toggleMenu();
          }}
        >
          Home
        </button>
        <button
          className="text-white text-3xl mb-6 transition relative"
          onClick={() => {
            navigate("/events");
            toggleMenu();
          }}
        >
          Events
        </button>
        <button
          className="text-white text-3xl mb-6 transition relative"
          onClick={() => {
            navigate("/team");
            toggleMenu();
          }}
        >
          Team
        </button>
        {/* <button
          className="text-white text-3xl mb-6 transition relative"
          onClick={() => {
            navigate("/articles");
            toggleMenu();
          }}
        >
          Articles
        </button> */}
        <button
          className="text-white text-3xl transition relative"
          onClick={() => {
            navigate("/contact");
            toggleMenu();
          }}
        >
          Contact Us
        </button>
        
        {/* Mobile Login/Signup Buttons */}
        <div className="flex flex-col space-y-4 mt-8">
          <button
            className="px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg text-xl"
            style={{
              backgroundColor: buttonColors.loginColor.bg,
              color: buttonColors.loginColor.text,
              border: `2px solid ${buttonColors.loginColor.bg}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.loginColor.hover;
              e.currentTarget.style.borderColor = buttonColors.loginColor.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.loginColor.bg;
              e.currentTarget.style.borderColor = buttonColors.loginColor.bg;
            }}
            onClick={() => {
              console.log("Login clicked");
              regenerateColors();
              toggleMenu();
            }}
          >
            Login
          </button>
          <button
            className="px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg text-xl"
            style={{
              backgroundColor: buttonColors.signupColor.bg,
              color: buttonColors.signupColor.text,
              border: `2px solid ${buttonColors.signupColor.bg}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.signupColor.hover;
              e.currentTarget.style.borderColor = buttonColors.signupColor.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonColors.signupColor.bg;
              e.currentTarget.style.borderColor = buttonColors.signupColor.bg;
            }}
            onClick={() => {
              console.log("Signup clicked");
              regenerateColors();
              toggleMenu();
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
