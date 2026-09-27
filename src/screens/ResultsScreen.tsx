import { Screen, EducationModule, ExplorationProgress } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
  explorationProgress: ExplorationProgress;
}

const dimensionLabels: Record<string, string> = {
  analyticalThinking: 'Analytical Thinking',
  technologyInterest: 'Technology Interest',
  creativity: 'Creativity',
  helpingPeople: 'Helping People',
  leadership: 'Leadership',
  communication: 'Communication',
  handsOnWork: 'Hands-on Work',
  researchInterest: 'Research Interest',
  businessInterest: 'Business Interest',
};

const dimensionColors: Record<string, string> = {
  analyticalThinking: '#6366F1',
  technologyInterest: '#00D2FF',
  creativity: '#EC4899',
  helpingPeople: '#00E676',
  leadership: '#FF5252',
  communication: '#FFC107',
  handsOnWork: '#F59E0B',
  researchInterest: '#7C3AED',
  businessInterest: '#06B6D4',
};

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'class6_8') return 'class68-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  return 'university-dashboard';
}

function getConfidenceLabel(confidence: number): string {
  if (confidence < 30) return 'We\'re just getting started.';
  if (confidence < 55) return 'We need a little more information.';
  if (confidence < 75) return 'Your profile is becoming clearer.';
  return 'Your interests are well-defined.';
}

export default function InterestProfileScreen({ navigate, explorationProgress, educationModule }: Props) {
  const dims = explorationProgress.interestDimensions;
  const sorted = Object.entries(dims).sort(([, a], [, b]) => b - a);
  const top3 = sorted.slice(0, 3);
  const confidence = explorationProgress.profileConfidence;

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
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
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              ✨ My Interest Profile
            </div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>
              Your Strongest Interests
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: '24px' }}>

        {/* Profile confidence */}
        <div style={{
          background: C.card, borderRadius: '16px', padding: '14px 16px',
          border: '1px solid rgba(0,210,255,0.15)',
        }}>
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Profile Confidence</div>
            <span style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 800, color: C.cyan }}>{confidence}%</span>
          </div>
          <div style={{ height: '5px', background: C.elevated, borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
            <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, #6366F1, #00D2FF)', width: `${confidence}%`, boxShadow: '0 0 8px rgba(0,210,255,0.5)' }} />
          </div>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: 0 }}>{getConfidenceLabel(confidence)}</p>
        </div>

        {/* Top 3 highlighted */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 14px 0' }}>Your Top Dimensions</h3>
          {top3.map(([key, value]) => (
            <div key={key} className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dimensionColors[key], boxShadow: `0 0 6px ${dimensionColors[key]}80`, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: C.text, width: '150px', flexShrink: 0, fontWeight: 500 }}>{dimensionLabels[key]}</span>
              <div style={{ flex: 1, height: '7px', background: C.elevated, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '4px', background: dimensionColors[key], width: `${value}%`, boxShadow: `0 0 8px ${dimensionColors[key]}60` }} />
              </div>
              <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: dimensionColors[key], width: '35px', textAlign: 'right' }}>{value}%</span>
            </div>
          ))}
        </div>

        {/* All dimensions */}
        <div style={{ background: C.card, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 12px 0' }}>All Dimensions</h3>
          {sorted.map(([key, value]) => (
            <div key={key} className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', color: C.sub, width: '140px', flexShrink: 0 }}>{dimensionLabels[key]}</span>
              <div style={{ flex: 1, height: '5px', background: C.elevated, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', background: dimensionColors[key], width: `${value}%` }} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: dimensionColors[key], width: '30px', textAlign: 'right' }}>{value}%</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '12px', padding: '12px 14px',
        }}>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: 0, lineHeight: '1.6' }}>
            These results represent patterns observed during your exploration and may change as you continue. They are a starting point for discovery, not a final verdict.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('career-clusters')}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(99,102,241,0.4)',
          }}
        >
          Explore Career Clusters →
        </button>

        <button
          onClick={() => navigate('assessment')}
          style={{
            width: '100%', height: '46px', borderRadius: '14px',
            background: 'transparent', color: C.cyan,
            fontFamily: 'Inter', fontSize: '14px', fontWeight: 600,
            border: '1.5px solid rgba(0,210,255,0.25)',
            cursor: 'pointer',
          }}
        >
          Continue Exploring →
        </button>
      </div>
    </div>
  );
}
