import { useEffect } from 'react';
import { Screen } from '../types';

export default function SplashScreen({ navigate }: { navigate: (s: Screen) => void }) {
  useEffect(() => {
    const t = setTimeout(() => navigate('login'), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D1117 0%, #0F1320 40%, #141829 70%, #0D1117 100%)' }}>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute animate-float" style={{
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          top: '-60px', left: '-80px',
        }} />
        <div className="absolute animate-float" style={{
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%)',
          bottom: '100px', right: '-50px', animationDelay: '1.2s',
        }} />
        <div className="absolute animate-float" style={{
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          top: '220px', right: '20px', animationDelay: '0.6s',
        }} />
      </div>

      {[...Array(14)].map((_, i) => (
        <div key={i} className="absolute animate-pulse-soft" style={{
          width: i % 4 === 0 ? '3px' : '2px', height: i % 4 === 0 ? '3px' : '2px',
          borderRadius: '50%',
          background: i % 3 === 0 ? 'rgba(0,210,255,0.5)' : 'rgba(99,102,241,0.35)',
          top: `${12 + (i * 6) % 75}%`,
          left: `${8 + (i * 13) % 84}%`,
          animationDelay: `${i * 0.18}s`,
        }} />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative animate-float" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 animate-pulse-soft" style={{
            borderRadius: '28px', transform: 'scale(1.18)',
            border: '1.5px solid rgba(0,210,255,0.2)',
            boxShadow: '0 0 30px rgba(0,210,255,0.15)',
          }} />
          <div style={{
            width: '100px', height: '100px', borderRadius: '28px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2)',
          }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
              <circle cx="26" cy="26" r="3" fill="white"/>
              <path d="M26 6 L30 20 L26 23 L22 20 Z" fill="rgba(255,255,255,0.95)"/>
              <path d="M46 26 L32 22 L29 26 L32 30 Z" fill="rgba(255,255,255,0.5)"/>
              <path d="M26 46 L22 32 L26 29 L30 32 Z" fill="rgba(255,255,255,0.5)"/>
              <path d="M6 26 L20 30 L23 26 L20 22 Z" fill="rgba(255,255,255,0.5)"/>
              <path d="M34 10 L35.5 14 L39.5 15.5 L35.5 17 L34 21 L32.5 17 L28.5 15.5 L32.5 14 Z" fill="#00D2FF"/>
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 800,
            color: 'white', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '6px',
          }}>
            FutureMaster<span style={{ color: '#00D2FF', textShadow: '0 0 20px rgba(0,210,255,0.6)' }}> AI</span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: '#A0AEC0', letterSpacing: '0.5px', fontWeight: 500,
          }}>
            Discover Your Path. Build Your Future.
          </p>
        </div>

        <div style={{
          width: '120px', height: '3px', borderRadius: '2px',
          background: 'rgba(255,255,255,0.08)', marginTop: '8px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            background: 'linear-gradient(90deg, #6366F1, #00D2FF)',
            animation: 'loadBar 2.5s ease forwards',
          }} />
        </div>
        <style>{`@keyframes loadBar { from { width: 0% } to { width: 100% } }`}</style>
      </div>

      <div className="absolute bottom-14 text-center">
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          color: 'rgba(160,174,192,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          AI-Powered Career Guidance
        </p>
      </div>
    </div>
  );
}
