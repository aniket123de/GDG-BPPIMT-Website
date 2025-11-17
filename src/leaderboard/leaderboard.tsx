import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

interface Participant {
  rank: number;
  name: string;
  email: string;
  progress: number;
  badges: number;
  score: number;
  total: number;
  completed: boolean;
  lastUpdated: string;
  initials: string;
  proofSent?: boolean;
}

// ----------------------- Particle Background -----------------------
const ParticleBackground: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const canvas = ref.current;
    if (!canvas || isMobile) return; // Skip particles on mobile
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Narrow types for inner closures to avoid 'possibly null' TypeScript errors
    const canvasEl = canvas as HTMLCanvasElement;
    const ctx2 = ctx as CanvasRenderingContext2D;

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x:number;y:number;vx:number;vy:number;r:number };
    const particles: P[] = [];
    // Reduce particle count for better performance
    const count = window.innerWidth > 1200 ? 50 : 30;
    for (let i=0;i<count;i++) particles.push({ x: Math.random()*canvasEl.width, y: Math.random()*canvasEl.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, r: Math.random()*1.5+0.5 });

    const colors = ['rgba(66,133,244,0.25)','rgba(52,168,83,0.25)','rgba(251,188,4,0.25)','rgba(234,67,53,0.25)'];
    const maxDist = 120;

    let raf = 0;
    let lastTime = 0;
    const targetFPS = 30; // Limit FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    function loop(currentTime: number){
      if (currentTime - lastTime < frameInterval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastTime = currentTime;
      
      ctx2.clearRect(0,0,canvasEl.width,canvasEl.height);
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvasEl.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvasEl.height) p.vy *= -1;
        ctx2.beginPath(); ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx2.fillStyle = colors[i % colors.length];
        ctx2.fill();
        
        // Reduce connection calculations for performance
        for (let j=i+1;j<Math.min(i+5, particles.length);j++){
          const q = particles[j];
          const dx = q.x-p.x; const dy = q.y-p.y; const d = Math.hypot(dx,dy);
          if (d < maxDist) {
            const op = 0.15*(1-d/maxDist);
            ctx2.strokeStyle = `rgba(66,133,244,${op})`;
            ctx2.lineWidth = 0.5; ctx2.beginPath(); ctx2.moveTo(p.x,p.y); ctx2.lineTo(q.x,q.y); ctx2.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render canvas on mobile
  if (isMobile) return null;

  return <canvas ref={ref} className="particle-canvas" aria-hidden />;
};

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [autoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25); // Start with fewer items for better mobile performance
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    above50Progress: 0,
    totalBadges: 0,
    completed: 0,
    averageProgress: 0,
    tier: 0,
    tierProgress: 0,
    nextTierThreshold: 50
  });

  // Check if device is mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inject styles helper
  const useInjectStyles = (css: string) => {
    useEffect(() => {
      const el = document.createElement('style');
      el.setAttribute('data-injected', 'leaderboard-styles');
      el.textContent = css;
      document.head.appendChild(el);
      return () => { document.head.removeChild(el); };
    }, [css]);
  };

  // CSS styles from Home.tsx
  const inlineStyles = `
    :root { --bg: #ffffff; }
    *{box-sizing:border-box;margin:0;padding:0}
    body{margin:0;font-family:'GSD-Regular', 'Google Sans', sans-serif}
    .leaderboard-root{font-family:'GSD-Regular', 'Google Sans', sans-serif; background:#fff; color:#202124; min-height:100vh;position:relative}

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4); }
      50% { box-shadow: 0 8px 32px rgba(255, 215, 0, 0.7); }
    }
    .particle-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}

    /* Header */
    .header{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:1.75rem 0;background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);box-shadow:0 2px 10px rgba(0,0,0,0.1)}
    .scroll-progress-bar{position:absolute;bottom:0;left:0;height:4px;background:linear-gradient(90deg,#4285f4 0%,#ea4335 25%,#fbbc04 50%,#34a853 75%,#4285f4 100%);transition:width 0.1s ease-out;box-shadow:0 0 10px rgba(66,133,244,0.5)}
    .header-content{max-width:1400px;margin:0 auto;padding:0 2rem;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:2rem}
    .logo-section{display:flex;align-items:center;gap:1.5rem;flex-shrink:0}
    .chapter-logo{width:65px;height:65px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(66,133,244,0.4));border-radius:16px;background:rgba(255,255,255,0.1);padding:8px;animation:float 3s ease-in-out infinite;transition:all 0.3s ease}
    .chapter-logo:hover{transform:translateY(-5px) scale(1.05);filter:drop-shadow(0 8px 20px rgba(66,133,244,0.6))}
    .logo-divider{width:2px;height:55px;background:linear-gradient(180deg,transparent,rgba(255,255,255,0.3),transparent)}
    .hero-section{flex-grow:1;text-align:center}
    .main-heading{font-size:2.25rem;font-weight:700;color:#202124;margin-bottom:0.25rem;animation:fadeInUp 0.8s ease-out}
    .subtitle{font-size:1.05rem;color:#5f6368;font-weight:400;animation:fadeInUp 0.8s ease-out 0.2s both}
    .whatsapp-btn{display:inline-flex;align-items:center;gap:0.75rem;padding:0.875rem 1.75rem;background:linear-gradient(135deg,#25d366 0%,#128c7e 100%);color:white;border-radius:50px;font-weight:500;font-size:1rem;box-shadow:0 4px 15px rgba(37,211,102,0.4);transition:all 0.3s ease;animation:fadeInUp 0.8s ease-out 0.4s both;flex-shrink:0;text-decoration:none}
    .whatsapp-btn:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(37,211,102,0.6)}
    .whatsapp-btn svg{width:24px;height:24px}

    /* Container */
    .container{max-width:1200px;margin:0 auto;padding:0 2rem}

    /* Stats Section */
    .stats-section{position:relative;z-index:10;padding:6rem 0 4rem;margin-top:2rem}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:4rem}
    .stat-card{background:#ffffff;backdrop-filter:blur(10px);border-radius:24px;padding:2.5rem 2rem;display:flex;flex-direction:row;align-items:center;gap:1.5rem;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);border:1px solid #e8eaed;box-shadow:0 1px 3px rgba(60,64,67,0.15),0 4px 8px rgba(60,64,67,0.1);position:relative;overflow:hidden}
    .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;border-radius:24px;padding:2px;background:linear-gradient(135deg,#4285f4,#34a853,#fbbc04,#ea4335);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:opacity 0.4s ease}
    .stat-card:hover{background:#ffffff;transform:translateY(-8px) scale(1.02);box-shadow:0 8px 16px rgba(60,64,67,0.2),0 12px 24px rgba(66,133,244,0.15);border-color:rgba(66,133,244,0.3)}
    .stat-card:hover::before{opacity:1}
    .stat-icon{width:80px;height:80px;min-width:80px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#4285f4,#34a853);border-radius:20px;color:#fff;box-shadow:0 8px 24px rgba(66,133,244,0.4);transition:all 0.6s ease}
    .stat-card:hover .stat-icon{transform:rotate(360deg);box-shadow:0 12px 32px rgba(66,133,244,0.6),0 0 40px rgba(66,133,244,0.3)}
    .stat-icon svg{filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));width:45px;height:45px}
    .stat-content{text-align:left;flex:1}
    .stat-value{font-size:3rem;font-weight:700;color:#202124;margin-bottom:0.5rem;font-family:'GSD-Bold', 'Google Sans',sans-serif;line-height:1}
    .stat-label{font-size:1.15rem;font-weight:500;color:#202124;margin-bottom:0.25rem;line-height:1.2}
    .stat-sublabel{font-size:0.95rem;color:#5f6368;font-weight:400;line-height:1.2}
    .percent-sign{font-size:2rem;margin-left:0.1rem}

    /* Leaderboard Table */
    .leaderboard-table{background:#ffffff;backdrop-filter:blur(10px);border-radius:24px;padding:2rem;border:1px solid #e8eaed;box-shadow:0 1px 3px rgba(60,64,67,0.15),0 4px 8px rgba(60,64,67,0.1);transition:all 0.3s ease}
    .leaderboard-table:hover{transform:translateY(-4px);box-shadow:0 8px 16px rgba(60,64,67,0.2),0 12px 24px rgba(60,64,67,0.15)}

    /* Responsive Media Queries */
    @media (max-width: 1024px) {
      .stats-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem}
    }

    @media (max-width: 768px) {
      /* Disable heavy animations on mobile for performance */
      .stat-card{animation:none !important;transition:none !important}
      .stat-card:hover{transform:none !important;animation:none !important}
      .stat-card:hover .stat-icon{transform:none !important;animation:none !important}
      .stat-card::before{display:none !important}
      .leaderboard-table:hover{transform:none !important}
      .main-heading{animation:none !important}
      .subtitle{animation:none !important}
      .whatsapp-btn{animation:none !important}
      
      .header{padding:1rem 0}
      .header-content{padding:0 1rem;flex-direction:column;gap:1.25rem}
      .logo-section{width:100%;justify-content:center;gap:1rem}
      .chapter-logo{width:55px;height:55px}
      .logo-divider{display:none}
      .hero-section{width:100%;text-align:center;order:1}
      .main-heading{font-size:1.4rem;line-height:1.3;margin-bottom:0.5rem}
      .subtitle{font-size:0.8rem;line-height:1.5;padding:0 0.5rem}
      .whatsapp-btn{order:2;align-self:center;padding:0.75rem 1.5rem;font-size:0.9rem}
      .whatsapp-btn svg{width:20px;height:20px}
      .stats-section{padding:3rem 0;margin-top:2rem}
      .container{padding:0 1rem}
      .stats-grid{grid-template-columns:repeat(2,1fr);gap:1.25rem}
      .stat-card{padding:2rem 1.5rem;flex-direction:column;text-align:center}
      .stat-content{text-align:center}
      .stat-value{font-size:2.5rem}
      .stat-label{font-size:1rem}
      .stat-sublabel{font-size:0.85rem}
      .stat-icon{width:70px;height:70px;min-width:70px}
      .stat-icon svg{width:40px;height:40px}
    }

    @media (max-width: 480px) {
      .header{padding:0.875rem 0}
      .header-content{gap:1rem}
      .chapter-logo{width:50px;height:50px}
      .main-heading{font-size:1.2rem;line-height:1.3}
      .subtitle{font-size:0.75rem;line-height:1.4}
      .whatsapp-btn{padding:0.65rem 1.25rem;font-size:0.85rem}
      .whatsapp-btn svg{width:18px;height:18px}
      .stats-section{padding:2rem 0;margin-top:2rem}
      .stats-grid{grid-template-columns:1fr;gap:1rem}
      .stat-card{padding:1.5rem 1.25rem}
      .stat-value{font-size:2.25rem}
      .stat-label{font-size:0.95rem}
      .stat-sublabel{font-size:0.8rem}
      .stat-icon{width:65px;height:65px;min-width:65px}
      .stat-icon svg{width:36px;height:36px}
    }
  `;

  // Inject styles
  useInjectStyles(inlineStyles);

  // SVG Icons from Home.tsx
  const UserGroupIcon = () => (
    <svg viewBox="0 0 24 24" width="40" height="40">
      <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );

  const StarIcon = () => (
    <svg viewBox="0 0 24 24" width="40" height="40">
      <path fill="currentColor" d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="40" height="40">
      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg viewBox="0 0 24 24" width="40" height="40">
      <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  );

  // ----------------------- StatCard Component -----------------------
  interface StatCardProps {
    icon: React.ReactNode;
    value: number | null;
    textValue?: string;
    label: string;
    sublabel?: string;
    isPercentage?: boolean;
    delay?: number;
    animated?: boolean;
    gradientColors?: string[];
  }

  const StatCard = ({
    icon,
    value,
    textValue,
    label,
    sublabel,
    isPercentage = false,
    delay = 0,
    animated = true,
    gradientColors = ['#4285f4', '#34a853'],
  }: StatCardProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!animated || value === null) {
        if (value !== null) setDisplayValue(value);
        return;
      }

      let startTime: number;
      const duration = 2000; // 2 seconds
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (endValue - startValue) * easeOut;

        setDisplayValue(Math.floor(current));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [value, animated]);

    const cardVariants = {
      hidden: { 
        opacity: 0, 
        y: 50 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay: delay,
          ease: "easeOut" as const,
        }
      }
    };

    return (
      <motion.div 
        className="stat-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div 
          className="stat-icon"
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            boxShadow: `0 8px 24px ${gradientColors[0]}66`
          }}
        >
          {icon}
        </div>
        <div className="stat-content">
          <h3 className="stat-value">
            {textValue ? textValue : displayValue}
            {isPercentage && !textValue && <span className="percent-sign">%</span>}
          </h3>
          <p className="stat-label">{label}</p>
          {sublabel && <p className="stat-sublabel">{sublabel}</p>}
        </div>
      </motion.div>
    );
  };

  // Google Sheets CSV URL
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmW5aXF3MXdxw-tvh7C7L8lYBWCs23jFwBztWGMzqxhf_syNYLf7fkKWgg3wnw1jkEeSKHpIEDpDo/pub?output=csv";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_CSV_URL);
      const csv = await response.text();
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const transformedData: Participant[] = results.data.map((row: any, index: number) => {
            // Extract initials from name - using actual Google Sheets column names
            const name = row['User Name'] || row['Name'] || row['Student Name'] || '';
            
            const initials = name ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : '??';
            
            // Parse numeric values - using actual Google Sheets column names
            const badges = parseInt(row['# of Skill Badges Completed'] || row['Badges'] || '0');
            const arcadeGames = parseInt(row['# of Arcade Games Completed'] || '0');
            const totalScore = badges + arcadeGames; // Total score is badges + arcade games
            const total = 20; // Assuming 20 is the max possible score
            
            // Check if marked as completed in the sheet OR if they actually have 20/20
            const allLabsDone = row['All Skill Badges & Games Completed']?.toLowerCase() === 'yes';
            const finalScore = allLabsDone ? 20 : totalScore; // Show 20 if marked as completed
            const progress = total > 0 ? Math.round((finalScore / total) * 100) : 0;
            
            return {
              rank: index + 1,
              name: name || `Participant ${index + 1}`,
              email: row['User Email'] || row['Email'] || '',
              progress: progress,
              badges: badges,
              score: finalScore,
              total: total,
              completed: allLabsDone || totalScore >= total,
              lastUpdated: 'Just now', // Google Sheets doesn't have this column
              initials: initials,
              proofSent: row['Access Code Redemption Status'] === 'Redeemed' || 
                        row['Profile URL Status'] === 'Valid'
            };
          });

          // Sort by rank/score
          transformedData.sort((a, b) => b.score - a.score);
          transformedData.forEach((participant, index) => {
            participant.rank = index + 1;
          });

          setData(transformedData);
          
          // Calculate stats
          const above50Progress = transformedData.filter(p => p.progress >= 50).length;
          const totalBadges = transformedData.reduce((sum, p) => sum + p.badges, 0);
          const averageProgress = Math.round(transformedData.reduce((sum, p) => sum + p.progress, 0) / transformedData.length);
          
          // Calculate tier system based on completed participants (20/20 or marked as "Yes")
          const completedParticipants = transformedData.filter(p => p.completed).length;
          let tier = 0;
          let tierProgress = 0;
          let nextTierThreshold = 50;
          
          if (completedParticipants >= 100) {
            tier = 1;
            tierProgress = 100;
            nextTierThreshold = 100;
          } else if (completedParticipants >= 75) {
            tier = 2;
            tierProgress = Math.round((completedParticipants / 100) * 100);
            nextTierThreshold = 100;
          } else if (completedParticipants >= 50) {
            tier = 3;
            tierProgress = Math.round((completedParticipants / 75) * 100);
            nextTierThreshold = 75;
          } else {
            tier = 0;
            tierProgress = Math.round((completedParticipants / 50) * 100);
            nextTierThreshold = 50;
          }
          
          setStats({
            above50Progress,
            totalBadges,
            completed: completedParticipants,
            averageProgress,
            tier,
            tierProgress,
            nextTierThreshold
          });
          
          setLastUpdated(new Date().toLocaleString());
          setLoading(false);
        },
        error: (error: any) => {
          console.error('Error parsing CSV:', error);
          // Fallback to mock data for testing
          const mockData: Participant[] = [
            {
              rank: 1,
              name: 'Krish Gupta',
              email: 'krish.gupta@example.com',
              progress: 100,
              badges: 19,
              score: 20,
              total: 20,
              completed: true,
              lastUpdated: 'Just now',
              initials: 'KG',
              proofSent: true
            },
            {
              rank: 2,
              name: 'Siddhesh Katale',
              email: 'siddhesh.katale@example.com',
              progress: 95,
              badges: 18,
              score: 19,
              total: 20,
              completed: false,
              lastUpdated: '2 minutes ago',
              initials: 'SK',
              proofSent: false
            },
            {
              rank: 3,
              name: 'Ansari Mohd Rahil Zakir Hussain',
              email: 'ansari.hussain@example.com',
              progress: 90,
              badges: 17,
              score: 18,
              total: 20,
              completed: false,
              lastUpdated: '5 minutes ago',
              initials: 'AH',
              proofSent: true
            }
          ];
          setData(mockData);
          setStats({
            above50Progress: 3,
            totalBadges: 54,
            completed: 1, // 1 person completed 19 skill badges
            averageProgress: 95,
            tier: 0,
            tierProgress: 2,
            nextTierThreshold: 50
          });
          setLastUpdated(new Date().toLocaleString());
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data for testing
      const mockData: Participant[] = [
        {
          rank: 1,
          name: 'Krish Gupta',
          email: 'krish.gupta@example.com',
          progress: 100,
          badges: 19,
          score: 20,
          total: 20,
          completed: true,
          lastUpdated: 'Just now',
          initials: 'KG',
          proofSent: true
        },
        {
          rank: 2,
          name: 'Siddhesh Katale',
          email: 'siddhesh.katale@example.com',
          progress: 95,
          badges: 18,
          score: 19,
          total: 20,
          completed: false,
          lastUpdated: '2 minutes ago',
          initials: 'SK',
          proofSent: false
        },
        {
          rank: 3,
          name: 'Ansari Mohd Rahil Zakir Hussain',
          email: 'ansari.hussain@example.com',
          progress: 90,
          badges: 17,
          score: 18,
          total: 20,
          completed: false,
          lastUpdated: '5 minutes ago',
          initials: 'AH',
          proofSent: true
        }
      ];
      setData(mockData);
      setStats({
        above50Progress: 3,
        totalBadges: 54,
        completed: 1, // 1 person completed 19 skill badges
        averageProgress: 95,
        tier: 0,
        tierProgress: 2,
        nextTierThreshold: 50
      });
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh - longer interval on mobile for better performance
    const refreshInterval = isMobile ? 120000 : 60000; // 2 minutes on mobile, 1 minute on desktop
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredData = data.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'All' || 
                         (filter === 'Complete (20/20)' && participant.completed) ||
                         (filter === 'Beginner' && participant.progress < 50) ||
                         (filter === 'Advanced' && participant.progress >= 50 && participant.progress < 100) ||
                         (filter === '✓ Proof Sent' && participant.proofSent);
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  // Memoize filtered data for better performance
  const filteredDataMemo = useMemo(() => filteredData, [data, searchTerm, filter]);
  const paginatedDataMemo = useMemo(() => paginatedData, [filteredDataMemo, currentPage, itemsPerPage]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getInitialsColor = (initials: string) => {
    const colors = [
      'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-yellow-500', 'bg-cyan-500'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getTierInfo = (tier: number) => {
    switch (tier) {
      case 1:
        return {
          name: 'Tier 1 - Elite',
          color: 'from-yellow-400 to-yellow-600',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: '👑',
          description: '100+ participants completed 19 skill badges'
        };
      case 2:
        return {
          name: 'Tier 2 - Advanced',
          color: 'from-blue-400 to-blue-600',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: '🥈',
          description: '75+ participants completed 19 skill badges'
        };
      case 3:
        return {
          name: 'Tier 3 - Rising',
          color: 'from-green-400 to-green-600',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '🥉',
          description: '50+ participants completed 19 skill badges'
        };
      default:
        return {
          name: 'No Tier',
          color: 'from-gray-400 to-gray-600',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '',
          description: 'Working towards Tier 3'
        };
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Rank', 'Name', 'Email', 'Progress', 'Skill Badges', 'Arcade Games', 'Total Score', 'Completed', 'Proof Sent', 'Status'],
      ...filteredData.map(p => [
        p.rank, p.name, p.email, p.progress, p.badges, p.score - p.badges, p.score, p.completed ? 'Yes' : 'No', p.proofSent ? 'Yes' : 'No', p.lastUpdated
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    window.print();
  };

  const resetData = () => {
    setSearchTerm('');
    setFilter('All');
    setCurrentPage(1);
  };

  return (
    <div className="leaderboard-root">
      <ParticleBackground />
      
      {/* Header */}
      <header className="header" id="header">
        <div className="scroll-progress-bar" style={{ width: '100%' }}></div>
        <div className="header-content">
          <div className="logo-section">
            <img 
              src="/images/Header_Logo.svg" 
              alt="Chapter Logo" 
              className="chapter-logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="logo-divider" id="logoDivider"></div>
          </div>

          <div className="hero-section">
            <h1 className="main-heading">Live Leaderboard</h1>
            <p className="subtitle">
              Track your progress and compete with {data.length} participants!
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/JA9clPhV4gz3bJekLY3t9a?mode=wwc" 
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            title="Join WhatsApp Group"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Join Group</span>
          </a>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section" id="statsSection">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Last Updated: {lastUpdated}
            </div>
          </div>

          <motion.div 
            className="stats-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <StatCard
              icon={<UserGroupIcon />}
              value={stats.above50Progress}
              label="Above 50% Progress"
              sublabel="Active Learners"
              delay={0}
              gradientColors={['#4285f4', '#34a853']}
            />

            <StatCard
              icon={<StarIcon />}
              value={stats.totalBadges}
              label="Total Badges Earned"
              sublabel="Skill Achievements"
              delay={0.1}
              gradientColors={['#ea4335', '#fbbc04']}
            />

            <StatCard
              icon={<CheckIcon />}
              value={stats.completed}
              label="Completed (20/20)"
              sublabel="Full Course Masters"
              delay={0.2}
              gradientColors={['#34a853', '#4285f4']}
            />

            <StatCard
              icon={<TrendingUpIcon />}
              value={stats.averageProgress}
              label="Average Progress"
              sublabel="Overall Performance"
              isPercentage
              delay={0.3}
              gradientColors={['#fbbc04', '#ea4335']}
            />
          </motion.div>
        </div>
      </section>

        {/* Tier System Progress */}
        <div className="container">
          <div className="stat-card mb-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{getTierInfo(stats.tier).icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{getTierInfo(stats.tier).name}</h2>
                <p className="text-gray-600">{getTierInfo(stats.tier).description}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress to Next Tier</span>
                <span className="text-sm font-bold text-gray-900">{stats.tierProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getTierInfo(stats.tier).color} transition-all duration-1000 ease-out`}
                  style={{ width: `${stats.tierProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{stats.completed} completed 19 skill badges</span>
                <span>{stats.nextTierThreshold} needed for next tier</span>
              </div>
            </div>

            {/* Tier Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${stats.tier === 3 ? getTierInfo(3).bgColor : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">🥉</span>
                  <div>
                    <p className={`font-semibold ${stats.tier === 3 ? getTierInfo(3).textColor : 'text-gray-600'}`}>
                      Tier 3 - Rising
                    </p>
                    <p className="text-xs text-gray-500">50+ completed 19 badges</p>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stats.tier === 2 ? getTierInfo(2).bgColor : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">🥈</span>
                  <div>
                    <p className={`font-semibold ${stats.tier === 2 ? getTierInfo(2).textColor : 'text-gray-600'}`}>
                      Tier 2 - Advanced
                    </p>
                    <p className="text-xs text-gray-500">75+ completed 19 badges</p>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stats.tier === 1 ? getTierInfo(1).bgColor : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">👑</span>
                  <div>
                    <p className={`font-semibold ${stats.tier === 1 ? getTierInfo(1).textColor : 'text-gray-600'}`}>
                      Tier 1 - Elite
                    </p>
                    <p className="text-xs text-gray-500">100+ completed 19 badges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* All Students Progress Section */}
        <div className="container">
          <div className="leaderboard-table">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <h2 className="text-xl font-bold text-gray-900">All Students Progress</h2>
            </div>
            <p className="text-gray-600 mb-6">See where you stand! Find your name and track your progress 👉</p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Advanced', 'Complete (20/20)', '✓ Proof Sent'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
              
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center">
                Sort by Rank
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Refresh Data
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              PDF
            </button>
            <button
              onClick={resetData}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center border border-red-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Reset
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} participants
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-500">Per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">RANK</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PARTICIPANT</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PROGRESS</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">SKILL BADGES</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">ARCADE GAMES</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">TOTAL SCORE</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">COMPLETED</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PROOF SENT</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDataMemo.map((participant, index) => {
                    const rowContent = (
                      <>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-gray-900 mr-2">
                              {participant.rank}
                            </span>
                            {getRankIcon(participant.rank) && (
                              <span className="text-xl">{getRankIcon(participant.rank)}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 ${getInitialsColor(participant.initials)} rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3`}>
                              {participant.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{participant.name}</p>
                              <p className="text-sm text-gray-500">{participant.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-green-500 h-2 rounded-full ${!isMobile ? 'transition-all duration-500' : ''}`}
                              style={{ width: `${participant.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 ml-2">{participant.progress}%</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-lg font-semibold text-gray-900">{participant.badges}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-lg font-semibold text-gray-900">{participant.score - participant.badges}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-lg font-semibold text-gray-900">{participant.score}/{participant.total}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            participant.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {participant.completed ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            participant.proofSent 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {participant.proofSent ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{participant.lastUpdated}</span>
                        </td>
                      </>
                    );

                    return isMobile ? (
                      <tr
                        key={`${participant.email}-${participant.rank}-${index}`}
                        className="border-b border-gray-100"
                      >
                        {rowContent}
                      </tr>
                    ) : (
                      <motion.tr
                        key={`${participant.email}-${participant.rank}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.5) }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        {rowContent}
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Auto-refresh notification */}
          {autoRefresh && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900">Auto-Refreshing Data</h3>
                  <p className="text-sm text-blue-700">This leaderboard automatically updates every 60 seconds to show the latest progress.</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-blue-600">Auto-refreshing every 60s</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              </div>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
          </div>
        </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            <a href="/" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span className="text-xs mt-1">Home</span>
            </a>
            <a href="/syllabus" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <span className="text-xs mt-1">Syllabus</span>
            </a>
            <a href="/leaderboard" className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <span className="text-xs mt-1">Leaderboard</span>
            </a>
            <a href="/winners" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-xs mt-1">Winners</span>
            </a>
            <a href="/rules" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs mt-1">Guide</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
