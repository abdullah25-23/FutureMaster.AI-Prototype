import { useState } from 'react';
import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676',
};

const allCategories = ['For You', 'Technology', 'Engineering', 'Healthcare', 'Business', 'Creative', 'Science'];

const thumbGradients: Record<string, string> = {
  Technology: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
  Engineering: 'linear-gradient(135deg, #7C3AED, #2563EB)',
  Healthcare: 'linear-gradient(135deg, #FF5252, #FFC107)',
  Business: 'linear-gradient(135deg, #FFC107, #FF5252)',
  Creative: 'linear-gradient(135deg, #EC4899, #7C3AED)',
  Science: 'linear-gradient(135deg, #059669, #00D2FF)',
  'For You': 'linear-gradient(135deg, #6366F1, #00D2FF)',
};

const catColors: Record<string, string> = {
  Technology: '#6366F1', Engineering: '#7C3AED', Healthcare: '#FF5252',
  Business: '#FFC107', Creative: '#EC4899', Science: '#00E676',
};

interface Video {
  title: string; duration: string; category: string; thumb: string; views: string;
}

const videosBySection: { label: string; videos: Video[] }[] = [
  {
    label: 'Based on Your Interests',
    videos: [
      { title: 'How to Become a Software Engineer in 2026', duration: '8:24', category: 'Technology', thumb: '💻', views: '124K' },
      { title: 'AI & Machine Learning: Careers of the Future', duration: '11:08', category: 'Technology', thumb: '🤖', views: '89K' },
      { title: 'Cybersecurity 101: What Analysts Actually Do', duration: '9:42', category: 'Technology', thumb: '🔐', views: '51K' },
    ],
  },
  {
    label: 'Related Areas',
    videos: [
      { title: 'Data Science vs Data Analytics: Key Differences', duration: '9:44', category: 'Science', thumb: '📊', views: '52K' },
      { title: 'Electrical Engineering: A Day in the Life', duration: '12:15', category: 'Engineering', thumb: '⚡', views: '38K' },
      { title: 'Research Careers: Beyond the Lab', duration: '10:00', category: 'Science', thumb: '🔬', views: '29K' },
    ],
  },
  {
    label: 'Explore Something New',
    videos: [
      { title: 'Game Design: Turning Play into a Career', duration: '7:52', category: 'Creative', thumb: '🎮', views: '97K' },
      { title: 'Medicine vs Engineering: Which Path is Right?', duration: '14:02', category: 'Healthcare', thumb: '🏥', views: '67K' },
      { title: 'Entrepreneurship: Starting Young', duration: '13:20', category: 'Business', thumb: '💼', views: '78K' },
    ],
  },
];

const universityOnlyVideos = [
  { title: 'How to Build a Backend Portfolio That Gets Hired', duration: '10:18', category: 'Technology', thumb: '⚙️', views: '63K' },
  { title: 'System Design Interview: Beginner Guide', duration: '15:30', category: 'Technology', thumb: '🏗️', views: '112K' },
];

const allVideos = videosBySection.flatMap(s => s.videos);

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
}

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'university') return 'university-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  return 'class68-dashboard';
}

function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const [feedback, setFeedback] = useState<number | null>(null);
  const grad = thumbGradients[video.category] || 'linear-gradient(135deg, #4F46E5, #7C3AED)';
  const col = catColors[video.category] || C.indigo;

  if (featured) {
    return (
      <div>
        <div style={{
          borderRadius: '18px', overflow: 'hidden',
          background: grad,
          height: '144px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '16px', position: 'relative',
          boxShadow: '0 0 24px rgba(99,102,241,0.25)',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', fontSize: '40px' }}>
            {video.thumb}
          </div>
          <div style={{
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            {video.duration} · {video.views} views
          </span>
          <p style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: 'white', margin: '2px 0 0 0', lineHeight: '1.3' }}>
            {video.title}
          </p>
        </div>
        <div style={{ paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted, flex: 1 }}>How interesting was this?</span>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setFeedback(n)} style={{
              width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer',
              background: feedback !== null && n <= feedback ? `${col}18` : C.card,
              border: feedback !== null && n <= feedback ? `1px solid ${col}40` : `1px solid ${C.border}`,
              fontFamily: 'Inter', fontSize: '12px', color: feedback !== null && n <= feedback ? col : C.muted,
            }}>{'★'}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: C.card, borderRadius: '14px', padding: '12px',
      border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      display: 'flex', gap: '12px', alignItems: 'center',
    }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '12px', flexShrink: 0,
        background: grad,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
        position: 'relative',
      }}>
        {video.thumb}
        <div style={{
          position: 'absolute', bottom: '4px', right: '4px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="6" height="6" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: C.text, margin: '0 0 4px 0', lineHeight: '1.4' }}>{video.title}</p>
        <div className="flex items-center gap-2">
          <span style={{
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
            color: col, background: `${col}14`, borderRadius: '4px', padding: '1px 6px',
          }}>{video.category}</span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.muted }}>{video.duration} · {video.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function VideosScreen({ navigate, educationModule }: Props) {
  const [activeCategory, setActiveCategory] = useState('For You');
  const isUniversity = educationModule === 'university';
  const isYounger = educationModule === 'class6_8' || educationModule === 'class9_10';

  const categories = isYounger
    ? allCategories.filter(c => c !== 'Business')
    : allCategories;

  const filteredVideos = activeCategory === 'For You'
    ? allVideos
    : allVideos.filter(v => v.category === activeCategory);

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 16px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(getDashboard(educationModule))} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: 0 }}>Career Videos</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: 0 }}>Personalised based on your interests</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => {
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                flexShrink: 0, padding: '7px 13px', borderRadius: '20px',
                background: active ? 'rgba(0,210,255,0.12)' : C.card,
                border: active ? '1px solid rgba(0,210,255,0.3)' : `1px solid ${C.border}`,
                cursor: 'pointer',
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                color: active ? C.cyan : C.muted,
                transition: 'all 0.2s ease',
              }}>{cat}</button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>
        {activeCategory === 'For You' ? (
          <>
            {videosBySection.map(section => (
              <div key={section.label}>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.muted, marginBottom: '10px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  {section.label}
                </div>
                {section.label === 'Based on Your Interests' ? (
                  <div className="flex flex-col gap-3">
                    <VideoCard video={section.videos[0]} featured />
                    {section.videos.slice(1).map(v => <VideoCard key={v.title} video={v} />)}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {section.videos.map(v => <VideoCard key={v.title} video={v} />)}
                  </div>
                )}
              </div>
            ))}

            {isUniversity && (
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: C.muted, marginBottom: '10px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  For University Students
                </div>
                <div className="flex flex-col gap-3">
                  {universityOnlyVideos.map(v => <VideoCard key={v.title} video={v} />)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredVideos.length > 0
              ? filteredVideos.map(v => <VideoCard key={v.title} video={v} />)
              : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎬</div>
                  <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.muted }}>No videos in this category yet.</p>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}
