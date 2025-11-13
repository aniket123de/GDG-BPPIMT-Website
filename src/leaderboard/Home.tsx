import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

/**
 * Home.tsx
 * Single-file bundle containing all components and inline CSS.
 * Drop this file into a React + TypeScript project and render <Home />
 * Required dependencies: framer-motion, react-intersection-observer
 */

const inlineStyles = `
:root { --bg: #ffffff; }
*{box-sizing:border-box;margin:0;padding:0}
body{margin:0;font-family:'GSD-Regular', 'Google Sans', sans-serif}
.allinone-root{font-family:'GSD-Regular', 'Google Sans', sans-serif; background:#fff; color:#202124; min-height:100vh;position:relative}

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
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem;margin-bottom:4rem}
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

/* Circular Progress */
.tier1-card{background:linear-gradient(135deg,rgba(212,160,23,0.08),rgba(244,196,48,0.05));border:1px solid rgba(212,160,23,0.3)}
.tier1-card:hover{background:linear-gradient(135deg,rgba(212,160,23,0.12),rgba(244,196,48,0.08));box-shadow:0 8px 16px rgba(60,64,67,0.2),0 12px 24px rgba(212,160,23,0.2);border-color:rgba(212,160,23,0.4)}
.circular-progress-wrapper{width:100px;height:100px;min-width:100px;display:flex;align-items:center;justify-content:center;transition:all 0.6s ease}
.tier1-card:hover .circular-progress-wrapper{transform:rotate(360deg)}
.circular-progress-container{margin-bottom:0.5rem}
.circular-progress{filter:drop-shadow(0 4px 12px rgba(212,160,23,0.4))}
.circular-progress-bg{opacity:1}
.circular-progress-fill{filter:drop-shadow(0 0 12px rgba(212,160,23,0.9))}
.circular-progress-text{font-family:'GSD-Bold', 'Google Sans',sans-serif;filter:drop-shadow(0 2px 6px rgba(212,160,23,0.8))}
.circular-label{font-size:1.15rem !important;color:#d4a017;text-shadow:0 2px 6px rgba(212,160,23,0.6);font-weight:600}

/* Rewards Section */
.rewards-section{position:relative;z-index:10;padding:4rem 0 6rem}
.section-header{text-align:center;margin-bottom:4rem}
.section-badge{display:inline-block;padding:0.5rem 1.5rem;background:#e8f0fe;border-radius:50px;font-weight:600;font-size:0.9rem;letter-spacing:1px;margin-bottom:1.5rem;backdrop-filter:blur(10px);border:1px solid #4285f4;color:#1967d2}
.section-main-title{font-size:3rem;font-weight:700;margin-bottom:1rem;color:#202124}
.section-description{font-size:1.2rem;color:#5f6368;max-width:700px;margin:0 auto}
.tiers-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2.5rem;margin-bottom:3rem}
.tier-card{background:#ffffff;backdrop-filter:blur(10px);border-radius:24px;padding:2rem;border:1px solid #e8eaed;box-shadow:0 1px 3px rgba(60,64,67,0.15),0 4px 8px rgba(60,64,67,0.1);transition:all 0.3s ease;display:flex;flex-direction:column}
.tier-card:hover{transform:translateY(-8px);box-shadow:0 8px 16px rgba(60,64,67,0.2),0 12px 24px rgba(60,64,67,0.15)}
.tier-1{border:2px solid #ffd700;background:linear-gradient(135deg,rgba(255,215,0,0.08),rgba(255,237,78,0.04));position:relative}
.tier-1::before{content:'';position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:linear-gradient(135deg,#ffd700,#ffed4e);border-radius:24px;z-index:-1;opacity:0;transition:opacity 0.3s ease}
.tier-1:hover::before{opacity:0.2}
.tier-2{border:2px solid #c0c0c0;background:linear-gradient(135deg,rgba(192,192,192,0.08),rgba(220,220,220,0.04));position:relative}
.tier-2::before{content:'';position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:linear-gradient(135deg,#c0c0c0,#e0e0e0);border-radius:24px;z-index:-1;opacity:0;transition:opacity 0.3s ease}
.tier-2:hover::before{opacity:0.2}
.tier-3{border:2px solid #cd7f32;background:linear-gradient(135deg,rgba(205,127,50,0.08),rgba(230,150,80,0.04));position:relative}
.tier-3::before{content:'';position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:linear-gradient(135deg,#cd7f32,#e69650);border-radius:24px;z-index:-1;opacity:0;transition:opacity 0.3s ease}
.tier-3:hover::before{opacity:0.2}
.tier-badge{display:inline-block;padding:0.5rem 1rem;background:#f1f3f4;border-radius:50px;font-weight:700;font-size:0.9rem;margin-bottom:1.5rem;text-align:center;color:#202124}
.tier-image-wrapper{width:100%;height:220px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#f8f9fa 0%,#e8eaed 100%);padding:1.5rem;box-shadow:inset 0 2px 8px rgba(60,64,67,0.1)}
.tier-image{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(60,64,67,0.15));transition:transform 0.3s ease}
.tier-card:hover .tier-image{transform:scale(1.05)}
.tier-title-wrapper{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.tier-title{font-size:1.5rem;font-weight:700;color:#202124}
.tier-progress-circle{background:#f1f3f4;padding:0.5rem 1rem;border-radius:50px;font-weight:600;font-size:0.9rem;color:#202124}
.tier-description{color:#5f6368;margin-bottom:1.5rem;line-height:1.6}
.tier-benefits{list-style:none;margin-bottom:1.5rem;flex-grow:1}
.tier-benefits li{padding:0.75rem 0;color:#202124;font-weight:400;border-bottom:1px solid #e8eaed}
.tier-benefits li:last-child{border-bottom:none}
.tier-badge-bottom{padding:1rem;background:#f1f3f4;border-radius:12px;text-align:center;font-weight:700;font-size:1.1rem;color:#202124;box-shadow:0 2px 8px rgba(60,64,67,0.15)}
.rewards-note{background:#fff8e1;backdrop-filter:blur(10px);border-radius:20px;padding:2rem;border:1px solid #ffd54f;display:flex;gap:1.5rem}
.note-icon{font-size:2rem;flex-shrink:0}
.note-content{flex-grow:1;color:#3e2723;line-height:1.8}
.note-content strong{color:#1a1a1a;font-weight:600}
.note-content ul{margin:1rem 0;padding-left:1.5rem}
.note-content li{margin:0.75rem 0}
.whatsapp-inline-link{color:#25d366;font-weight:600;text-decoration:underline;transition:opacity 0.3s ease}
.whatsapp-inline-link:hover{opacity:0.8}

/* Footer */
.footer{position:relative;z-index:10;padding:4rem 0 2rem;background:#f8f9fa;margin-top:4rem;border-top:1px solid #e8eaed}
.footer-content{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:3rem;margin-bottom:3rem}
.footer-logo{text-align:center}
.footer-logo-img{width:80px;height:80px;object-fit:contain;margin-bottom:1rem;filter:drop-shadow(0 4px 12px rgba(66,133,244,0.3));border-radius:20px;background:rgba(255,255,255,0.05);padding:10px;transition:all 0.3s ease}
.footer-logo-img:hover{transform:scale(1.1) rotate(5deg);filter:drop-shadow(0 6px 16px rgba(66,133,244,0.5))}
.footer-logo h3{font-size:1.5rem;font-weight:700;margin-bottom:0.5rem;color:#202124}
.footer-logo p{color:#5f6368;font-size:1rem}
.footer-links h4,.footer-social h4{font-size:1.2rem;font-weight:600;margin-bottom:1.5rem;color:#202124}
.footer-links ul{list-style:none}
.footer-links li{margin-bottom:0.75rem}
.footer-links a{color:#5f6368;font-size:1rem;transition:all 0.3s ease;text-decoration:none}
.footer-links a:hover{color:#4285f4;padding-left:0.5rem}
.social-links{display:flex;flex-direction:column;gap:1rem}
.social-link{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:#ffffff;border-radius:12px;color:#202124;font-weight:500;transition:all 0.3s ease;border:1px solid #e8eaed;text-decoration:none}
.social-link:hover{background:#f8f9fa;transform:translateX(5px);border-color:#4285f4}
.social-link span:first-child{font-size:1.5rem}
.footer-bottom{text-align:center;padding-top:2rem;border-top:1px solid #e8eaed}
.footer-bottom p{color:#5f6368;margin:0.5rem 0;font-size:0.95rem}

/* Floating Rewards Button */
.floating-rewards-btn{position:fixed;bottom:100px;right:2rem;z-index:1000;display:flex;align-items:center;gap:0.75rem;padding:1rem 1.5rem;background:linear-gradient(135deg,#ffd700 0%,#ffed4e 100%);color:#333;border-radius:50px;font-weight:600;font-size:1rem;box-shadow:0 8px 24px rgba(255,215,0,0.4);transition:all 0.3s ease;animation:pulse 2s ease-in-out infinite;text-decoration:none}
.floating-rewards-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 12px 32px rgba(255,215,0,0.6)}
.floating-rewards-btn svg{width:24px;height:24px}

/* Floating Navbar */
.floating-navbar{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:1000;background:rgba(255,255,255,0.98);backdrop-filter:blur(30px);border-radius:50px;padding:0.5rem 1rem;border:1px solid #e8eaed;box-shadow:0 4px 12px rgba(60,64,67,0.15),0 8px 24px rgba(60,64,67,0.1)}
.floating-nav-content{display:flex;gap:0.25rem;align-items:center}
.floating-nav-item{display:flex;flex-direction:column;align-items:center;gap:0.35rem;padding:0.65rem 0.85rem;border-radius:28px;color:#5f6368;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);min-width:65px;position:relative;background:transparent;text-decoration:none}
.floating-nav-item::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;border-radius:28px;background:linear-gradient(135deg,rgba(66,133,244,0.15),rgba(52,168,83,0.15));opacity:0;transition:opacity 0.3s ease}
.floating-nav-item:hover{background:#f1f3f4;color:#4285f4;transform:translateY(-4px);box-shadow:0 4px 8px rgba(66,133,244,0.15)}
.floating-nav-item:hover::before{opacity:1}
.floating-nav-item.active{background:#e8f0fe;color:#4285f4;box-shadow:0 2px 8px rgba(66,133,244,0.2)}
.floating-nav-item.active::before{opacity:1;background:linear-gradient(135deg,rgba(66,133,244,0.2),rgba(52,168,83,0.15))}
.floating-nav-icon{font-size:1.5rem;position:relative;z-index:1;transition:transform 0.3s ease}
.floating-nav-item:hover .floating-nav-icon{transform:scale(1.15)}
.floating-nav-label{font-size:0.7rem;font-weight:500;position:relative;z-index:1;letter-spacing:0.3px}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .stats-grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem}
}

@media (max-width: 768px) {
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
  .stats-grid{grid-template-columns:1fr;gap:1.25rem}
  .stat-card{padding:2rem 1.5rem;flex-direction:column;text-align:center}
  .stat-content{text-align:center}
  .stat-value{font-size:2.5rem}
  .stat-label{font-size:1rem}
  .stat-sublabel{font-size:0.85rem}
  .stat-icon{width:70px;height:70px;min-width:70px}
  .stat-icon svg{width:40px;height:40px}
  .circular-progress-wrapper{width:85px;height:85px;min-width:85px}
  .circular-label{font-size:1rem !important}
  .rewards-section{padding:3rem 0 5rem}
  .section-header{margin-bottom:3rem}
  .section-main-title{font-size:2rem}
  .section-description{font-size:1rem}
  .tiers-grid{grid-template-columns:1fr;gap:2rem}
  .tier-card{padding:1.5rem}
  .tier-title{font-size:1.25rem}
  .rewards-note{flex-direction:column;padding:1.5rem}
  .note-icon{font-size:1.5rem}
  .footer{padding:3rem 0 6.5rem}
  .footer-content{grid-template-columns:1fr;gap:2rem}
  .footer-logo,.footer-links,.footer-social{text-align:center}
  .social-links{align-items:center}
  .social-link{max-width:300px;width:100%}
  .floating-navbar{bottom:1rem;left:1rem;right:1rem;transform:none;padding:0.5rem 0.75rem;border-radius:40px}
  .floating-nav-content{gap:0.25rem;justify-content:space-around}
  .floating-nav-item{padding:0.75rem 0.5rem;min-width:60px;gap:0.35rem}
  .floating-nav-icon{font-size:1.4rem}
  .floating-nav-label{font-size:0.7rem}
  .floating-rewards-btn{bottom:auto;top:50%;transform:translateY(-50%);right:0.75rem;padding:0.875rem 1.25rem;font-size:0.9rem}
  .floating-rewards-btn:hover{transform:translateY(-50%) scale(1.05)}
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
  .stats-grid{gap:1rem}
  .stat-card{padding:1.5rem 1.25rem}
  .stat-value{font-size:2.25rem}
  .stat-label{font-size:0.95rem}
  .stat-sublabel{font-size:0.8rem}
  .stat-icon{width:65px;height:65px;min-width:65px}
  .stat-icon svg{width:36px;height:36px}
  .circular-progress-wrapper{width:75px;height:75px;min-width:75px}
  .circular-label{font-size:0.95rem !important}
  .rewards-section{padding:2rem 0 4.5rem}
  .section-header{margin-bottom:2.5rem}
  .section-main-title{font-size:1.75rem}
  .section-description{font-size:0.95rem}
  .tier-card{padding:1.25rem}
  .tier-image-wrapper{height:160px}
  .tier-title{font-size:1.15rem}
  .tier-benefits li{font-size:0.9rem;padding:0.6rem 0}
  .rewards-note{padding:1.25rem}
  .note-content{font-size:0.9rem}
  .footer{padding:2rem 0 6rem}
  .footer-content{gap:1.75rem}
  .footer-logo-img{width:65px;height:65px}
  .footer-logo h3{font-size:1.3rem}
  .footer-logo p{font-size:0.9rem}
  .footer-links h4,.footer-social h4{font-size:1.1rem}
  .footer-links a{font-size:0.9rem}
  .social-link{padding:0.65rem 0.85rem;font-size:0.9rem}
  .social-link span:first-child{font-size:1.3rem}
  .footer-bottom p{font-size:0.85rem}
  .floating-navbar{padding:0.4rem 0.5rem}
  .floating-nav-item{padding:0.6rem 0.35rem;min-width:50px}
  .floating-nav-icon{font-size:1.25rem}
  .floating-nav-label{font-size:0.65rem}
  .floating-rewards-btn span{display:none}
  .floating-rewards-btn{width:56px;height:56px;padding:0;justify-content:center;border-radius:50%;top:50%;right:0.5rem}
  .floating-rewards-btn:hover{transform:translateY(-50%) scale(1.05)}
}
`;

// inject styles helper
function useInjectStyles(css: string) {
  useEffect(() => {
    const el = document.createElement('style');
    el.setAttribute('data-injected', 'all-in-one-leaderboard');
    el.textContent = css;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, [css]);
}

// ----------------------- Particle Background -----------------------
const ParticleBackground: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
  const canvas = ref.current;
  if (!canvas) return;
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
    const count = 80;
  for (let i=0;i<count;i++) particles.push({ x: Math.random()*canvasEl.width, y: Math.random()*canvasEl.height, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, r: Math.random()*2+1 });

    const colors = ['rgba(66,133,244,0.45)','rgba(52,168,83,0.45)','rgba(251,188,4,0.45)','rgba(234,67,53,0.45)'];
    const maxDist = 150;

    let raf = 0;
    function loop(){
      ctx2.clearRect(0,0,canvasEl.width,canvasEl.height);
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvasEl.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvasEl.height) p.vy *= -1;
        ctx2.beginPath(); ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx2.fillStyle = colors[i % colors.length];
        ctx2.shadowBlur = 6; ctx2.shadowColor = colors[i % colors.length];
        ctx2.fill(); ctx2.shadowBlur = 0;
        for (let j=i+1;j<particles.length;j++){
          const q = particles[j];
          const dx = q.x-p.x; const dy = q.y-p.y; const d = Math.hypot(dx,dy);
          if (d < maxDist) {
            const op = 0.25*(1-d/maxDist);
            const g = ctx2.createLinearGradient(p.x,p.y,q.x,q.y);
            g.addColorStop(0, colors[i%colors.length].replace('0.45', String(op)));
            g.addColorStop(1, colors[j%colors.length].replace('0.45', String(op)));
            ctx2.strokeStyle = g; ctx2.lineWidth = 0.8; ctx2.beginPath(); ctx2.moveTo(p.x,p.y); ctx2.lineTo(q.x,q.y); ctx2.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} className="particle-canvas" aria-hidden />;
};

// ----------------------- Header -----------------------
// Note: Header component is kept for reference but not used in the main export
// The main website's Navbar is used instead via App.tsx
// @ts-ignore - Unused component kept for reference
const Header: React.FC = () => {
  const [participantCount] = useState(153);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header" id="header">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      <div className="header-content">
        <div className="logo-section">
          <img 
            src="/assets/images/logo.png" 
            alt="Chapter Logo" 
            className="chapter-logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="logo-divider" id="logoDivider"></div>
        </div>

        <div className="hero-section">
          <h1 className="main-heading">Cloud Study Jams Leaderboard</h1>
          <p className="subtitle">
            GDG on Campus B P Poddar Institute Of Management and Technology - Kolkata | 
            <span id="participantCount"> {participantCount}</span> Participants
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
  );
};

// ----------------------- StatCard -----------------------
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

// ----------------------- CircularProgressCard -----------------------
interface CircularProps { count:number; total:number; label:string; sublabel?:string; delay?:number }
const CircularProgressCard: React.FC<CircularProps> = ({ count, total, label, sublabel, delay=0 }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate count
    let startTime: number;
    const duration = 2000;

    const animateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progressValue, 3);
      const current = Math.floor(count * easeOut);

      setDisplayCount(current);

      if (progressValue < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    // Animate progress circle
    const percentage = (count / total) * 100;
    setTimeout(() => {
      setProgress(percentage);
    }, delay * 1000);

    requestAnimationFrame(animateCount);
  }, [count, total, delay]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
      className="stat-card tier1-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="circular-progress-wrapper">
        <div className="circular-progress-container">
          <svg className="circular-progress" viewBox="0 0 120 120" width="100" height="100">
          <defs>
            <linearGradient id="tier1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#d4a017', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f4c430', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle 
            className="circular-progress-bg" 
            cx="60" 
            cy="60" 
            r={radius}
            fill="none"
            stroke="rgba(212, 160, 23, 0.25)"
            strokeWidth="12"
          />
          <circle 
            className="circular-progress-fill" 
            cx="60" 
            cy="60" 
            r={radius}
            fill="none"
            stroke="url(#tier1Gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 2s ease-out' }}
          />
          <text 
            x="60" 
            y="60" 
            className="circular-progress-text" 
            textAnchor="middle" 
            dy=".3em"
            fill="#d4a017"
            fontSize="28"
            fontWeight="700"
          >
            {displayCount}
          </text>
        </svg>
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-label circular-label">{label}</h3>
        {sublabel && <p className="stat-sublabel">{sublabel}</p>}
      </div>
    </motion.div>
  );
};

// ----------------------- Stats Section -----------------------
const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stats, setStats] = useState({
    avgProgress: 0,
    totalBadges: 0,
    avgCompletion: 0,
    topPerformer: '-',
    completed: 0,
    activeParticipants: 0,
    completionRate: 0,
    avgTime: '-',
    totalParticipants: 153,
    creditsRedeemed: 98,
    skillBadgeMasters: 0,
    arcadeWinners: 0
  });
  const [loading, setLoading] = useState(true);

  // Google Sheets CSV URL (same as leaderboard)
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmW5aXF3MXdxw-tvh7C7L8lYBWCs23jFwBztWGMzqxhf_syNYLf7fkKWgg3wnw1jkEeSKHpIEDpDo/pub?output=csv";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(SHEET_CSV_URL);
        const csv = await response.text();
        
        const Papa = await import('papaparse');
        
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const participants = results.data.map((row: any) => {
              const name = row['User Name'] || row['Name'] || row['Student Name'] || '';
              const badges = parseInt(row['# of Skill Badges Completed'] || '0');
              const arcadeGames = parseInt(row['# of Arcade Games Completed'] || '0');
              const totalScore = badges + arcadeGames;
              const progress = Math.round((totalScore / 20) * 100);
              
              return {
                name,
                badges,
                arcadeGames,
                totalScore,
                progress,
                completed: totalScore >= 20
              };
            }).filter((p: any) => p.name); // Filter out empty names

            if (participants.length > 0) {
              const totalBadges = participants.reduce((sum: number, p: any) => sum + p.badges, 0);
              const avgProgress = Math.round(participants.reduce((sum: number, p: any) => sum + p.progress, 0) / participants.length);
              const completedCount = participants.filter((p: any) => p.completed).length;
              const skillBadgeMasters = participants.filter((p: any) => p.badges >= 19).length;
              const arcadeWinners = participants.filter((p: any) => p.arcadeGames >= 1).length;
              const activeParticipants = participants.filter((p: any) => p.totalScore > 0).length;
              const completionRate = Math.round((completedCount / participants.length) * 100);
              
              // Find top performer
              const topPerformer = participants.reduce((top: any, current: any) => 
                current.totalScore > top.totalScore ? current : top
              );

              setStats({
                avgProgress: Math.round(totalBadges / participants.length),
                totalBadges,
                avgCompletion: avgProgress,
                topPerformer: topPerformer.name || '-',
                completed: completedCount,
                activeParticipants,
                completionRate,
                avgTime: '2-3 hours',
                totalParticipants: participants.length,
                creditsRedeemed: 98, // Keep hardcoded for now
                skillBadgeMasters,
                arcadeWinners
              });
            }
            setLoading(false);
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="stats-section" id="statsSection" ref={ref}>
      <div className="container">
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <StatCard
            icon={<UserGroupIcon />}
            value={loading ? 0 : stats.avgProgress}
            label="Average Progress"
            sublabel="Badges / Person"
            delay={0}
            gradientColors={['#4285f4', '#34a853']}
          />

          <StatCard
            icon={<StarIcon />}
            value={loading ? 0 : stats.totalBadges}
            label="Total Badges Earned"
            delay={0.1}
            gradientColors={['#ea4335', '#fbbc04']}
          />

          <StatCard
            icon={<CheckIcon />}
            value={loading ? 0 : stats.avgCompletion}
            label="Average Completion"
            isPercentage
            delay={0.2}
            gradientColors={['#34a853', '#4285f4']}
          />

          <StatCard
            icon={<UserIcon />}
            value={null}
            textValue={loading ? "Loading..." : stats.topPerformer}
            label="Top Performer"
            delay={0.3}
            gradientColors={['#fbbc04', '#ea4335']}
          />

          <CircularProgressCard
            count={loading ? 0 : stats.completed}
            total={100}
            label="✅ Completed 20 Courses"
            sublabel="Winners"
            delay={0.4}
          />

          <StatCard
            icon={<PlusCircleIcon />}
            value={loading ? 0 : stats.activeParticipants}
            label="Active Participants"
            sublabel="Started Their Journey"
            delay={0.5}
            gradientColors={['#ea4335', '#4285f4']}
          />

          <StatCard
            icon={<TrendingUpIcon />}
            value={loading ? 0 : stats.completionRate}
            label="Completion Rate"
            sublabel="Overall Progress"
            isPercentage
            delay={0.6}
            gradientColors={['#34a853', '#fbbc04']}
          />

          <StatCard
            icon={<ClockIcon />}
            value={null}
            textValue={loading ? "Loading..." : stats.avgTime}
            label="Avg Time/Badge"
            sublabel="Estimated Duration"
            delay={0.7}
            gradientColors={['#fbbc04', '#4285f4']}
          />

          <StatCard
            icon={<CheckCircleIcon />}
            value={loading ? 0 : stats.totalParticipants}
            label="Total Participants"
            sublabel="Users Enrolled"
            delay={0.8}
            animated={!loading}
            gradientColors={['#4285f4', '#ea4335']}
          />

          <StatCard
            icon={<SmileIcon />}
            value={stats.creditsRedeemed}
            label="Credits Redeemed"
            sublabel="Cloud Skill Boost"
            delay={0.9}
            animated={false}
            gradientColors={['#34a853', '#4285f4']}
          />

          <StatCard
            icon={<StarIcon />}
            value={loading ? 0 : stats.skillBadgeMasters}
            label="All 19 Badges Done"
            sublabel="Skill Badge Masters"
            delay={1.0}
            animated={!loading}
            gradientColors={['#fbbc04', '#34a853']}
          />

          <StatCard
            icon={<GameIcon />}
            value={loading ? 0 : stats.arcadeWinners}
            label="Arcade Completed"
            sublabel="Game Winners"
            delay={1.1}
            animated={!loading}
            gradientColors={['#ea4335', '#fbbc04']}
          />
        </motion.div>
      </div>
    </section>
  );
};

// SVG Icons
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

const UserIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const SmileIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
);

const GameIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path fill="currentColor" d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M20,16H4V8H20V16M6,9H18V11H6V9M6,12H14V14H6V12Z"/>
  </svg>
);

// ----------------------- Rewards Section -----------------------
const RewardsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      }
    }
  };

  return (
    <section className="rewards-section" id="rewardsSection" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🎁 REWARDS INFO</div>
          <h2 className="section-main-title">What You Can Win! 🏆</h2>
          <p className="section-description">
            Complete the Cloud Study Jams and earn exclusive Google Cloud swags based on your tier!
          </p>
        </div>

        <motion.div 
          className="tiers-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Tier 1 */}
          <motion.div className="tier-card tier-1" variants={cardVariants}>
            <div className="tier-badge">🥇 TIER 1</div>
            <div className="tier-image-wrapper">
              <img src="/tier1.png" alt="Tier 1 Rewards" className="tier-image" />
            </div>
            <div className="tier-title-wrapper">
              <h3 className="tier-title">Ultimate Prize Pack</h3>
              <div className="tier-progress-circle">
                <span className="tier-count">8/100</span>
              </div>
            </div>
            <p className="tier-description">
              <strong>🎯 Target: First 100 Students</strong><br />
              Complete all 20 courses + Send proof in WhatsApp group
            </p>
            <ul className="tier-benefits">
              <li>🎒 Google Cloud Bag</li>
              <li>👕 Google Cloud T-Shirt</li>
              <li>💧 Google Cloud Bottle</li>
              <li>✨ Stickers & Goodies</li>
              <li>📜 Certificate of Participation</li>
              <li>🎯 Digital Badges</li>
              <li>🎉 Easy Access to All GDG OC Events</li>
            </ul>
            <div className="tier-badge-bottom">Be in Top 100!</div>
          </motion.div>

          {/* Tier 2 */}
          <motion.div className="tier-card tier-2" variants={cardVariants}>
            <div className="tier-badge">🥈 TIER 2</div>
            <div className="tier-image-wrapper">
              <img src="/tier2.png" alt="Tier 2 Rewards" className="tier-image" />
            </div>
            <div className="tier-title-wrapper">
              <h3 className="tier-title">Advanced Rewards</h3>
              <div className="tier-progress-circle">
                <span className="tier-count">8/70</span>
              </div>
            </div>
            <p className="tier-description">
              <strong>🎯 Target: First 70 Students</strong><br />
              Complete all 20 courses + Send proof in WhatsApp group
            </p>
            <ul className="tier-benefits">
              <li>👕 Google Cloud T-Shirt</li>
              <li>💧 Google Cloud Bottle</li>
              <li>✨ Stickers & Goodies</li>
              <li>📜 Certificate of Participation</li>
              <li>🎯 Digital Badges</li>
              <li>🎉 Easy Access to All GDG OC Events</li>
            </ul>
            <div className="tier-badge-bottom">Be in Top 70!</div>
          </motion.div>

          {/* Tier 3 */}
          <motion.div className="tier-card tier-3" variants={cardVariants}>
            <div className="tier-badge">🥉 TIER 3</div>
            <div className="tier-image-wrapper">
              <img src="/tier3.png" alt="Tier 3 Rewards" className="tier-image" />
            </div>
            <div className="tier-title-wrapper">
              <h3 className="tier-title">Starter Rewards</h3>
              <div className="tier-progress-circle">
                <span className="tier-count">8/50</span>
              </div>
            </div>
            <p className="tier-description">
              <strong>🎯 Target: First 50 Students</strong><br />
              Complete all 20 courses + Send proof in WhatsApp group
            </p>
            <ul className="tier-benefits">
              <li>👕 Google Cloud T-Shirt</li>
              <li>✨ Stickers & Goodies</li>
              <li>📜 Certificate of Participation</li>
              <li>🎯 Digital Badges</li>
              <li>🎉 Easy Access to All GDG OC Events</li>
            </ul>
            <div className="tier-badge-bottom">Be in Top 50!</div>
          </motion.div>
        </motion.div>

        <div className="rewards-note">
          <div className="note-icon">⚠️</div>
          <div className="note-content">
            <strong>How Tier System Works:</strong>
            <ul>
              <li>🥇 <strong>Tier 1 (Target):</strong> If we achieve this tier, the <strong>first 100 students</strong> who complete all 20 courses and send proof will get rewards!</li>
              <li>🥈 <strong>Tier 2:</strong> If we achieve this tier, the <strong>first 70 students</strong> will get rewards.</li>
              <li>🥉 <strong>Tier 3:</strong> If we achieve this tier, the <strong>first 50 students</strong> will get rewards.</li>
            </ul>
            <p style={{ marginTop: '15px' }}>
              <strong>⚡ Complete fast & send proof in our{' '}
              <a href="https://chat.whatsapp.com/JA9clPhV4gz3bJekLY3t9a?mode=wwc" target="_blank" rel="noopener noreferrer" className="whatsapp-inline-link">
                WhatsApp Group 💬
              </a>{' '}
              to secure your spot!</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------- Footer & Floating -----------------------
// Note: Footer component is kept for reference but not used in the main export
// The main website's Footer is used instead via App.tsx
// @ts-ignore - Unused component kept for reference
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/assets/images/logo.png" alt="GDG Logo" className="footer-logo-img" />
          <h3>GDG Cloud Study Jams</h3>
          <p>Empowering students with Google Cloud & AI skills</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#rewardsSection">Rewards</a></li>
            <li><Link to="/syllabus">Syllabus</Link></li>
            <li><Link to="/winners">Winners</Link></li>
            <li><Link to="/leaderboard/table">Leaderboard</Link></li>
            <li><Link to="/rules">Rules & Guidelines</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://chat.whatsapp.com/JA9clPhV4gz3bJekLY3t9a?mode=wwc" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
              <span>💬</span>
              <span>WhatsApp</span>
            </a>
            <a href="https://www.linkedin.com/company/gdg-on-campus-bvdu-dms-nm/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <span>🔗</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/gdg_oc.bvdu.dms.nm/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <span>📸</span>
              <span>Instagram</span>
            </a>
            <a href="https://gdg.community.dev/gdg-on-campus-bharati-vidyapeeths-department-of-management-studies-navi-mumbai-india/" target="_blank" rel="noopener noreferrer" className="social-link gdg">
              <span>🌐</span>
              <span>GDG Community</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 GDG Cloud Study Jams. All rights reserved.</p>
        <p>Made with ❤️ by GDG Community</p>
      </div>
    </div>
  </footer>
);

const FloatingRewardsButton: React.FC = () => {
  return (
    <a href="#rewardsSection" className="floating-rewards-btn" title="View Rewards & Tiers">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
      </svg>
      <span>Rewards</span>
    </a>
  );
};

// Note: FloatingNavbar has been moved to a separate component (FloatingNavbar.tsx)
// It's now rendered globally in App.tsx for all leaderboard pages
// @ts-ignore - Unused component kept for reference
const FloatingNavbar: React.FC = () => {
  return (
    <nav className="floating-navbar" aria-label="Quick Navigation">
      <div className="floating-nav-content">
        <Link to="/leaderboard" className="floating-nav-item active" title="Home">
          <span className="floating-nav-icon">🏠</span>
          <span className="floating-nav-label">Home</span>
        </Link>
        <Link to="/syllabus" className="floating-nav-item" title="Syllabus">
          <span className="floating-nav-icon">📚</span>
          <span className="floating-nav-label">Syllabus</span>
        </Link>
        <Link to="/leaderboard/table" className="floating-nav-item" title="Leaderboard">
          <span className="floating-nav-icon">📈</span>
          <span className="floating-nav-label">Leaderboard</span>
        </Link>
        <Link to="/winners" className="floating-nav-item" title="Winners">
          <span className="floating-nav-icon">🏆</span>
          <span className="floating-nav-label">Winners</span>
        </Link>
        <Link to="/rules" className="floating-nav-item" title="Completion Guide">
          <span className="floating-nav-icon">📋</span>
          <span className="floating-nav-label">Guide</span>
        </Link>
      </div>
    </nav>
  );
};

// ----------------------- Main Export -----------------------
const Home: React.FC = () => {
  useInjectStyles(inlineStyles);
  return (
    <div className="allinone-root">
      <ParticleBackground />
      <StatsSection />
      <RewardsSection />
      <FloatingRewardsButton />
    </div>
  );
};

export default Home;
