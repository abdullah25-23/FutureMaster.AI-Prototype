import { useState } from 'react';
import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107', error: '#FF5252',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
}

const career = {
  title: 'Cybersecurity Analyst',
  cluster: 'Technology & Computing',
  icon: '🔐',
  color: '#6366F1',
  matchScore: 79,
  shortDesc: 'Protects organisations from digital threats, investigates breaches, and designs secure systems.',
  whatTheyDo: [
    'Monitor networks and systems for security threats',
    'Investigate and respond to security incidents',
    'Design and implement security policies and controls',
    'Conduct vulnerability assessments and penetration testing',
    'Educate staff about cybersecurity best practices',
  ],
  observedPatterns: [
    'You repeatedly enjoyed logical problem solving',
    'You preferred investigation-based activities',
    'You showed strong technology interest',
    'Security-related scenarios held your attention',
  ],
  lowerPatterns: [
    'Less interest in highly artistic activities',
    'Lower preference for public-facing roles',
  ],
  skills: ['Network Security', 'Ethical Hacking', 'Python', 'Linux', 'Risk Analysis', 'Incident Response'],
  subjects: ['Computer Science', 'Mathematics', 'Physics'],
  educationPath: 'BS Computer Science → Cybersecurity Certifications (CISSP, CEH) → Entry-level Analyst',
  relatedCareers: ['Penetration Tester', 'Security Engineer', 'Digital Forensics Analyst', 'Network Administrator'],
  technologies: ['Kali Linux', 'Wireshark', 'Metasploit', 'SIEM Tools', 'Python', 'Nmap'],
  specialisations: ['Cloud Security', 'Malware Analysis', 'Red Teaming', 'Threat Intelligence'],
};

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: C.card, borderRadius: '14px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text }}>{title}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 16px 14px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function CareerDetailsScreen({ navigate, educationModule }: Props) {
  const isUniversity = educationModule === 'university';

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate('career-clusters')} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.cyan, fontWeight: 600 }}>Careers Worth Exploring</div>
        </div>

        <div className="flex items-center gap-3">
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: `${career.color}18`, border: `1px solid ${career.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0,
          }}>
            {career.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: '0 0 3px 0' }}>
              {career.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: career.color, background: `${career.color}14`, border: `1px solid ${career.color}25`, borderRadius: '6px', padding: '2px 8px' }}>
                {career.cluster}
              </span>
              <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.cyan }}>{career.matchScore}% match</span>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: '12px 0 0 0', lineHeight: '1.5' }}>
          {career.shortDesc}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 mobile-scroll px-4 py-4 flex flex-col gap-3" style={{ paddingBottom: '24px' }}>

        {/* Why This Career */}
        <div style={{
          background: C.card, borderRadius: '16px', padding: '16px',
          border: `1px solid ${career.color}25`,
          boxShadow: `0 0 16px ${career.color}10`,
        }}>
          <h3 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: '0 0 12px 0' }}>
            Why is this being recommended?
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: '0 0 10px 0' }}>Strong patterns we've observed:</p>
          {career.observedPatterns.map(p => (
            <div key={p} className="flex items-center gap-2" style={{ marginBottom: '7px' }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(0,230,118,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub }}>{p}</span>
            </div>
          ))}

          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: '10px 0 8px 0' }}>Lower-interest patterns:</p>
          {career.lowerPatterns.map(p => (
            <div key={p} className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.muted, flexShrink: 0, marginLeft: '6px' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted }}>{p}</span>
            </div>
          ))}

          <div style={{
            background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '8px', padding: '8px 12px', marginTop: '10px',
          }}>
            <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: 0 }}>
              Lower-interest areas are not disqualifiers — they simply reflect your current exploration patterns.
            </p>
          </div>
        </div>

        {/* Accordion sections */}
        <AccordionSection title="What They Do" defaultOpen>
          <div className="flex flex-col gap-2">
            {career.whatTheyDo.map(item => (
              <div key={item} className="flex items-start gap-2">
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: career.color, marginTop: '5px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Common Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {career.skills.map(s => (
              <span key={s} style={{
                fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                background: `${career.color}12`, color: career.color,
                border: `1px solid ${career.color}25`, borderRadius: '6px', padding: '4px 10px',
              }}>{s}</span>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Related Subjects">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {career.subjects.map(s => (
              <span key={s} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, background: C.elevated, color: C.sub, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '4px 10px' }}>{s}</span>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Education Path">
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub, margin: 0, lineHeight: '1.6' }}>{career.educationPath}</p>
        </AccordionSection>

        <AccordionSection title="Related Careers">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {career.relatedCareers.map(c => (
              <span key={c} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, background: C.elevated, color: C.muted, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '4px 10px' }}>→ {c}</span>
            ))}
          </div>
        </AccordionSection>

        {isUniversity && (
          <>
            <AccordionSection title="Common Technologies">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {career.technologies.map(t => (
                  <span key={t} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, background: `${C.cyan}10`, color: C.cyan, border: `1px solid ${C.cyan}20`, borderRadius: '6px', padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Possible Specialisations">
              <div className="flex flex-col gap-2">
                {career.specialisations.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.indigo, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.sub }}>{s}</span>
                  </div>
                ))}
              </div>
            </AccordionSection>
          </>
        )}

        {/* Actions */}
        <button
          onClick={() => navigate('roadmap')}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(99,102,241,0.4)',
          }}
        >
          Explore Cybersecurity →
        </button>

        <button
          onClick={() => navigate('career-clusters')}
          style={{
            width: '100%', height: '46px', borderRadius: '14px',
            background: 'transparent', color: C.muted,
            fontFamily: 'Inter', fontSize: '14px', fontWeight: 500,
            border: `1.5px solid ${C.border}`,
            cursor: 'pointer',
          }}
        >
          Not interested — show me others
        </button>
      </div>
    </div>
  );
}
