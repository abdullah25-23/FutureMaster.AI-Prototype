import { useState } from 'react';
import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

const categories = ['All', 'Technology', 'AI', 'Healthcare', 'Business', 'Education'];

const news = [
  { category: 'AI', title: "Pakistan's First AI Research Hub Opens in Islamabad", time: '1h ago', read: '4 min read', hot: true },
  { category: 'Technology', title: 'Top 10 Tech Skills Employers Want in 2026', time: '3h ago', read: '6 min read', hot: true },
  { category: 'Education', title: 'HEC Announces 5,000 New Scholarships for Engineering Students', time: '5h ago', read: '3 min read', hot: false },
  { category: 'Healthcare', title: 'MBBS Graduates in High Demand Across Gulf States', time: '8h ago', read: '5 min read', hot: false },
  { category: 'Business', title: 'E-Commerce Startups Driving Youth Employment in Pakistan', time: '12h ago', read: '7 min read', hot: false },
  { category: 'AI', title: 'ChatGPT & AI Tools Every Student Should Know in 2026', time: '1d ago', read: '5 min read', hot: false },
  { category: 'Education', title: "Online Degrees: Are They Recognized by Pakistani Employers?", time: '2d ago', read: '8 min read', hot: false },
  { category: 'Technology', title: "Cloud Computing: The Career Path You Didn't Consider", time: '2d ago', read: '6 min read', hot: false },
];

const catColors: Record<string, string> = {
  AI: '#7C3AED', Technology: '#6366F1', Education: '#00E676',
  Healthcare: '#FF5252', Business: '#FFC107',
};

export default function NewsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? news : news.filter(n => n.category === activeCategory);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '52px 20px 16px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('class68-dashboard')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: 0 }}>Career & Education News</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: 0 }}>Stay updated with the latest</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => {
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: '20px',
                background: active ? 'rgba(0,210,255,0.1)' : C.card,
                border: active ? '1px solid rgba(0,210,255,0.25)' : `1px solid ${C.border}`,
                cursor: 'pointer',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                color: active ? C.cyan : C.muted,
                transition: 'all 0.2s ease',
              }}>{cat}</button>
            );
          })}
        </div>
      </div>

      {/* News list */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-2.5" style={{ paddingBottom: '20px' }}>
        {/* Featured */}
        {activeCategory === 'All' && filtered[0] && (
          <div style={{
            background: 'linear-gradient(135deg, #1A1030, #1E1840)',
            borderRadius: '16px', padding: '16px',
            border: '1px solid rgba(124,58,237,0.2)',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 20px rgba(99,102,241,0.1)',
          }}>
            <div style={{ position: 'absolute', right: '-10px', top: '-10px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99,102,241,0.05)' }} />
            <div style={{
              fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
              background: `${catColors[filtered[0].category] || C.indigo}18`,
              color: catColors[filtered[0].category] || C.indigo,
              borderRadius: '4px', padding: '3px 8px',
              display: 'inline-block', marginBottom: '8px',
              border: `1px solid ${catColors[filtered[0].category] || C.indigo}30`,
            }}>
              🔥 TRENDING · {filtered[0].category.toUpperCase()}
            </div>
            <h3 style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: 700, color: C.text, margin: '0 0 8px 0', lineHeight: '1.4' }}>
              {filtered[0].title}
            </h3>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{filtered[0].time}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>· {filtered[0].read}</span>
            </div>
          </div>
        )}

        {filtered.slice(activeCategory === 'All' ? 1 : 0).map((item, i) => (
          <div key={i} style={{
            background: C.card, borderRadius: '14px', padding: '14px',
            border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-2 mb-1">
                <span style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                  background: `${catColors[item.category] || C.indigo}14`,
                  color: catColors[item.category] || C.indigo,
                  borderRadius: '4px', padding: '2px 6px',
                }}>{item.category}</span>
                {item.hot && <span style={{ fontSize: '10px' }}>🔥</span>}
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: C.text, margin: '0 0 4px 0', lineHeight: '1.4' }}>
                {item.title}
              </p>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{item.time}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>· {item.read}</span>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
