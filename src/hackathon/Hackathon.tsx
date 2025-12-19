import { useState, useEffect } from "react";
import pcBanner from "../assets/Techsprint/techsprint-pc-banner.png";
import mobileBanner from "../assets/Techsprint/techsprint-mobile-banner.png";
import {
  Calendar,
  Users,
  UserPlus,
  AlertCircle,
  Trophy,
  ArrowRight,
  Sparkles,
  Code,
  Rocket
} from "lucide-react";

// --- Google Brand Colors & Assets ---
const COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC04",
  green: "#34A853",
  gray: "#5F6368",
  bg: "#F8F9FA",
};

interface GeometricShapeProps {
  className?: string;
  color: string;
  delay?: number;
}

const GeometricShape = ({
  className = "",
  color,
  delay = 0,
}: GeometricShapeProps) => (
  <div
    className={`absolute opacity-20 pointer-events-none animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="50" fill={color} />
    </svg>
  </div>
);


interface FloatingPlusProps {
  className?: string;
  color: string;
  delay?: number;
}

const FloatingPlus = ({
  className = "",
  color,
  delay = 0,
}: FloatingPlusProps) => (
  <div
    className={`absolute text-4xl font-bold opacity-30 pointer-events-none animate-pulse ${className}`}
    style={{ color, animationDelay: `${delay}s` }}
  >
    +
  </div>
);


// --- Main Component ---

const Hackathon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Target: Dec 31, 2025 05:30:00 IST
    const targetDate = new Date("2025-12-31T05:30:00+05:30").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const timelineEvents = [
    { date: "14 Dec - 31 Dec '25", title: "Registration & Team Formation", color: COLORS.blue, icon: Users },
    { date: "01 Jan - 05 Jan '26", title: "Project Submission", color: COLORS.red, icon: Code },
    { date: "10 Jan '26", title: "Hacking & Pitching Round", color: COLORS.yellow, icon: Rocket },
    { date: "11 Jan - 12 Jan '26", title: "Improvement – Round 2 Eval", color: COLORS.green, icon: Sparkles },
    { date: "13 Jan - 14 Jan '26", title: "Top 3 Announcement – Final", color: COLORS.blue, icon: Trophy },
  ];

  const steps = [
    {
      title: "Create a Team",
      role: "Leader",
      color: "bg-green-500",
      border: "border-green-200",
      shadow: "shadow-green-100",
      icon: Users,
      points: [
        "Go to Dashboard → Team Management",
        "Click 'Create Team' → Accept Rules",
        "Enter Team Name → Create",
        "You represent the team as Leader",
      ],
      note: "Once created, you cannot join another team.",
    },
    {
      title: "Invite Members",
      role: "Leader",
      color: "bg-blue-500",
      border: "border-blue-200",
      shadow: "shadow-blue-100",
      icon: UserPlus,
      points: [
        "Copy your unique Invite Link",
        "Share it with your teammates",
        "Or invite directly via email",
      ],
    },
    {
      title: "Join a Team",
      role: "Member",
      color: "bg-purple-500",
      border: "border-purple-200",
      shadow: "shadow-purple-100",
      icon: ArrowRight,
      points: [
        "Go to 'Looking for a Team'",
        "Search & Request to Join",
        "Or ask Leader for an invite link",
      ],
    },
    {
      title: "Rules & Notes",
      role: "Everyone",
      color: "bg-yellow-500",
      border: "border-yellow-200",
      shadow: "shadow-yellow-100",
      icon: AlertCircle,
      points: [
        "1 Team = 1 Project Submission",
        "Any member can submit the project",
        "Only the last submission counts 🚀",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] overflow-x-hidden font-sans selection:bg-blue-200">

      {/* ================= BACKGROUND ELEMENTS ================= */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        {/* Abstract Google Shapes */}
        <GeometricShape className="w-64 h-64 -top-20 -left-20" color={COLORS.blue} delay={0} />
        <GeometricShape className="w-96 h-96 top-1/2 -right-32" color={COLORS.red} delay={2} />
        <GeometricShape className="w-48 h-48 bottom-10 left-20" color={COLORS.yellow} delay={4} />
        <GeometricShape className="w-32 h-32 top-20 right-1/4" color={COLORS.green} delay={1} />

        <FloatingPlus className="top-32 left-1/4" color={COLORS.red} delay={0.5} />
        <FloatingPlus className="bottom-1/3 right-1/3" color={COLORS.blue} delay={1.5} />
        <FloatingPlus className="top-10 right-10" color={COLORS.green} delay={2.5} />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">

        {/* ================= BANNERS ================= */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {/* PC Banner */}
          <img
            src={pcBanner}
            alt="TechSprint Hackathon Banner"
            className="hidden md:block w-full h-auto object-cover"
          />
          {/* Mobile Banner */}
          <img
            src={mobileBanner}
            alt="TechSprint Hackathon Banner"
            className="block md:hidden w-full h-auto object-cover"
          />
        </div>

        {/* ================= HERO SECTION (Compacted) ================= */}
        <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-white/50 backdrop-blur-sm group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50 opacity-80" />

          {/* Decorative Corner splotches */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Drastically reduced padding: py-8 md:py-10 */}
          <div className="relative px-6 py-8 md:py-10 flex flex-col items-center text-center">

            {/* GDG / TechSprint Logo Construction */}
            <div className="flex items-center gap-3 mb-3 animate-fade-in-up">
              <span className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-3 h-3 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-3 h-3 rounded-full bg-[#FBBC04] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </span>
              <span className="text-gray-500 font-medium tracking-wider text-xs md:text-sm uppercase">Official Hackathon Event</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 text-gray-900 leading-tight">
              <span className="text-[#4285F4]">Tech</span>
              <span className="text-[#EA4335]">Sprint</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
              Build the future with <span className="font-semibold text-[#4285F4]">Google Developer Groups</span>.
              Join us for an innovation marathon packed with mentoring, hacking and prizes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="https://vision.hack2skill.com/event/gdgoc-25-techsprint-bppimt"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 bg-[#1A73E8] text-white rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="flex items-center gap-2">
                  Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= COUNTDOWN CARD (Compacted) ================= */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-[2rem] blur-xl opacity-20 transform scale-95 translate-y-4" />
          {/* Reduced padding: p-6 */}
          <div className="relative bg-white rounded-[2rem] shadow-xl p-6 text-center border border-gray-100">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-xs mb-4 border border-red-100 animate-pulse">
              Running Out of Time!
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Registration Closes In</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Days", value: timeLeft.days, color: "text-[#4285F4]", bg: "bg-blue-50" },
                { label: "Hours", value: timeLeft.hours, color: "text-[#EA4335]", bg: "bg-red-50" },
                { label: "Minutes", value: timeLeft.minutes, color: "text-[#FBBC04]", bg: "bg-yellow-50" },
                { label: "Seconds", value: timeLeft.seconds, color: "text-[#34A853]", bg: "bg-green-50" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${item.bg} flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-1 duration-300`}>
                    <span className={`text-2xl md:text-4xl font-black ${item.color} tabular-nums`}>
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-gray-500 font-medium uppercase tracking-widest text-[10px] md:text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TIMELINE & STEPS GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Timeline - Left Side */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 h-full">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-[#4285F4]" />
              <h2 className="text-3xl font-bold text-gray-800">Event Timeline</h2>
            </div>

            <div className="relative pl-4 space-y-10">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-gray-100 rounded-full" />

              {timelineEvents.map((event, i) => (
                <div key={i} className="relative flex items-start gap-6 group">
                  {/* Dot */}
                  <div
                    className="relative z-10 w-4 h-4 rounded-full mt-1.5 ring-4 ring-white transition-all group-hover:scale-125"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1 p-4 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all border border-transparent group-hover:border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: event.color }}>
                        {event.date.split(" ")[0]} {event.date.split(" ")[1]}
                      </span>
                      <event.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{event.date}</p>
                    <p className="text-lg font-bold text-gray-800 leading-tight">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps to Register - Right Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Rocket className="w-6 h-6 text-[#34A853]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">How to Participate</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((card, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 ${card.border} group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${card.color} text-white p-3 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-gray-100 text-gray-600`}>
                      {card.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#1A73E8] transition-colors">
                    {card.title}
                  </h3>

                  <ul className="space-y-3">
                    {card.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${card.color} flex-shrink-0`} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {card.note && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {card.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="relative py-12 text-center">
          {/* Background blobs for footer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-blue-400/20 via-red-400/20 to-yellow-400/20 blur-3xl rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to <span className="text-[#4285F4]">Innovate?</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
              Don't miss the chance to showcase your skills, win prizes, and connect with the developer community.
            </p>

            <a
              href="https://vision.hack2skill.com/event/gdgoc-25-techsprint-bppimt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white text-xl font-bold px-10 py-5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Register on Hack2Skill
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 GDG TechSprint. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
            <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
            <div className="w-2 h-2 rounded-full bg-[#FBBC04]" />
            <div className="w-2 h-2 rounded-full bg-[#34A853]" />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -20px) rotate(5deg); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        /* Global selector to ensure external helper components pick up this animation */
        :global(.animate-float) {
          animation: float 6s ease-in-out infinite;
        }
        :global(.animate-shimmer) {
          animation: shimmer 2s infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hackathon;