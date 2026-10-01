import { useEffect } from 'react';
import { useApp } from '../state';
import { BrandFull, C } from '../components/ui';

const particles = Array.from({ length: 14 }, (_, i) => ({ left: 8 + ((i * 53) % 84), top: 55 + ((i * 37) % 38), size: 2 + (i % 3), delay: (i * 0.45) % 5 }));

export default function SplashScreen() {
  const { go } = useApp();
  useEffect(() => { const t = setTimeout(() => go('login'), 2500); return () => clearTimeout(t); }, [go]);
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 40%, #131B33 0%, #0D1117 65%)' }}>
      <div className="glow-drift" style={{ position: 'absolute', top: '22%', left: '-10%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.28), transparent 70%)' }} />
      <div className="glow-drift" style={{ position: 'absolute', bottom: '10%', right: '-15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,210,255,0.18), transparent 70%)', animationDelay: '-3s' }} />
      {particles.map((p, i) => (
        <span key={i} className="particle" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, background: i % 2 ? C.cyan : '#A78BFA', animationDelay: `${p.delay}s` }} />
      ))}
      <div className="splash-logo" style={{ position: 'relative', padding: '0 28px' }}>
        <BrandFull width={320} />
      </div>
    </div>
  );
}
