import { useState } from 'react';
import { Screen, EducationModule } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676',
};

const universityRoadmap = {
  title: 'Backend Engineer',
  icon: '⚙️', color: '#6366F1',
  steps: [
    { title: 'Strengthen Python', icon: '🐍', desc: 'Deepen your Python fundamentals — OOP, decorators, async, and standard library.', skills: ['OOP', 'Async/Await', 'Testing'] },
    { title: 'Build REST APIs', icon: '🔗', desc: 'Create and document APIs with FastAPI or Django REST Framework.', skills: ['FastAPI', 'DRF', 'OpenAPI'] },
    { title: 'Learn Docker', icon: '🐳', desc: 'Containerise your applications and understand Docker Compose for local dev.', skills: ['Docker', 'Compose', 'Images'] },
    { title: 'Cloud Deployment', icon: '☁️', desc: 'Deploy services to AWS (EC2, S3, RDS) or GCP — understand basic cloud architecture.', skills: ['AWS', 'EC2', 'S3', 'RDS'] },
    { title: 'Portfolio Projects', icon: '📁', desc: 'Build 2-3 complete projects (API + DB + deploy) and push to GitHub.', skills: ['GitHub', 'README', 'Live Demo'] },
    { title: 'Interview Prep 🚀', icon: '🚀', desc: 'Practice system design, data structures, and behavioral questions for backend roles.', skills: ['System Design', 'DSA', 'LeetCode'] },
  ],
};

const educationRoadmaps = {
  'Software Engineer': {
    icon: '👨‍💻', color: '#6366F1',
    steps: [
      { title: 'Matriculation', icon: '📗', desc: 'Complete SSC with Mathematics & Science', skills: ['Math', 'Science', 'English'] },
      { title: 'ICS / FSc', icon: '📘', desc: 'Choose Computer Science or Pre-Engineering', skills: ['Physics', 'Math', 'CS'] },
      { title: 'BS Computer Science', icon: '🎓', desc: '4-year university degree in CS or SE', skills: ['Algorithms', 'OOP', 'Databases'] },
      { title: 'Programming & Projects', icon: '💻', desc: 'Build real projects and open source contributions', skills: ['Python', 'JavaScript', 'Git'] },
      { title: 'Internship', icon: '🏢', desc: 'Gain industry experience at a tech company', skills: ['Real Projects', 'Teamwork', 'Comm.'] },
      { title: 'Software Engineer 🚀', icon: '🚀', desc: 'Begin your career as a junior developer', skills: ['Problem Solving', 'Clean Code', 'Agile'] },
    ],
  },
  'Doctor': {
    icon: '👨‍⚕️', color: '#FF5252',
    steps: [
      { title: 'Matriculation', icon: '📗', desc: 'Strong foundation in Biology & Chemistry', skills: ['Biology', 'Chemistry', 'Math'] },
      { title: 'FSc Pre-Medical', icon: '🔬', desc: 'Study Biology, Chemistry, and Physics', skills: ['Biology', 'Chemistry', 'Physics'] },
      { title: 'MDCAT', icon: '📝', desc: 'Clear Medical & Dental College Admission Test', skills: ['MDCAT Prep', 'Time Mgmt'] },
      { title: 'MBBS', icon: '🏥', desc: '5-year medical degree at recognized institution', skills: ['Anatomy', 'Pharmacology', 'Clinical'] },
      { title: 'House Job', icon: '⚕️', desc: '1-year compulsory supervised clinical practice', skills: ['Patient Care', 'Diagnosis', 'Docs'] },
      { title: 'Specialization 🩺', icon: '🩺', desc: 'Choose a specialty — Surgery, Cardiology...', skills: ['FCPS', 'Research', 'Subspecialty'] },
    ],
  },
  'Data Scientist': {
    icon: '📊', color: '#00D2FF',
    steps: [
      { title: 'Matriculation', icon: '📗', desc: 'Strong foundation in Mathematics', skills: ['Math', 'Statistics', 'Science'] },
      { title: 'ICS / FSc', icon: '📘', desc: 'Computer Science or Mathematics stream', skills: ['Statistics', 'CS', 'Math'] },
      { title: 'BS Data Science / CS', icon: '🎓', desc: 'University degree with data-focused curriculum', skills: ['Statistics', 'ML', 'Databases'] },
      { title: 'Tools & Projects', icon: '💻', desc: 'Master data science stack and build projects', skills: ['Python', 'SQL', 'Pandas', 'Tableau'] },
      { title: 'Research / Internship', icon: '🔍', desc: 'Apply skills in real data environments', skills: ['Analysis', 'Modeling', 'Insights'] },
      { title: 'Data Scientist 📈', icon: '📈', desc: 'Work at tech, finance, or research organizations', skills: ['ML', 'Communication', 'Storytelling'] },
    ],
  },
} as const;

type EduCareer = keyof typeof educationRoadmaps;

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

export default function RoadmapScreen({ navigate, educationModule }: Props) {
  const [activeCareer, setActiveCareer] = useState<EduCareer>('Software Engineer');

  const isUniversity = educationModule === 'university';
  const roadmap = isUniversity ? universityRoadmap : educationRoadmaps[activeCareer];

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
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {isUniversity ? 'Learning Roadmap' : 'Education Roadmap'}
            </div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, color: C.text, margin: 0 }}>
              {isUniversity ? `Path to ${universityRoadmap.title}` : 'Your Path Forward'}
            </h2>
          </div>
        </div>

        {!isUniversity && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {(Object.keys(educationRoadmaps) as EduCareer[]).map(career => {
              const active = activeCareer === career;
              const r = educationRoadmaps[career];
              return (
                <button key={career} onClick={() => setActiveCareer(career)} style={{
                  flexShrink: 0, padding: '7px 13px', borderRadius: '10px',
                  background: active ? `${r.color}18` : C.card,
                  border: active ? `1px solid ${r.color}50` : `1px solid ${C.border}`,
                  cursor: 'pointer',
                  fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                  color: active ? r.color : C.muted,
                  boxShadow: active ? `0 0 10px ${r.color}20` : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {r.icon} {career}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex-1 mobile-scroll px-5 py-5" style={{ paddingBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '22px', top: '32px', bottom: '32px', width: '2px',
            background: `linear-gradient(180deg, ${roadmap.color}50, ${roadmap.color}10)`,
          }} />

          {roadmap.steps.map((step, i) => (
            <div key={step.title} style={{ display: 'flex', gap: '16px', marginBottom: i < roadmap.steps.length - 1 ? '20px' : '0' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '14px',
                  background: i === 0 || i === roadmap.steps.length - 1
                    ? `linear-gradient(135deg, ${roadmap.color}, #7C3AED)`
                    : C.card,
                  border: i === 0 || i === roadmap.steps.length - 1
                    ? 'none'
                    : `1.5px solid ${roadmap.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: i === 0 || i === roadmap.steps.length - 1
                    ? `0 0 16px ${roadmap.color}45, 0 4px 12px rgba(0,0,0,0.4)`
                    : '0 2px 8px rgba(0,0,0,0.3)',
                  zIndex: 1, position: 'relative',
                }}>
                  {step.icon}
                </div>
              </div>

              <div style={{
                flex: 1, background: C.card, borderRadius: '16px', padding: '14px',
                border: i === roadmap.steps.length - 1 ? `1px solid ${roadmap.color}40` : `1px solid ${C.border}`,
                boxShadow: i === roadmap.steps.length - 1 ? `0 0 16px ${roadmap.color}12, 0 4px 12px rgba(0,0,0,0.3)` : '0 2px 8px rgba(0,0,0,0.2)',
                marginTop: '4px',
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <h4 style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 700, color: C.text, margin: 0 }}>{step.title}</h4>
                  {i === roadmap.steps.length - 1 && (
                    <span style={{
                      fontFamily: 'Inter', fontSize: '9px', fontWeight: 700,
                      background: `linear-gradient(135deg, ${roadmap.color}, #7C3AED)`,
                      color: 'white', borderRadius: '4px', padding: '2px 6px',
                      boxShadow: `0 0 8px ${roadmap.color}40`,
                    }}>GOAL</span>
                  )}
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '11px', color: C.muted, margin: '0 0 8px 0', lineHeight: '1.5' }}>{step.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.skills.map(s => (
                    <span key={s} style={{
                      fontFamily: 'Inter', fontSize: '10px',
                      background: `${roadmap.color}10`, color: roadmap.color,
                      borderRadius: '4px', padding: '2px 7px', fontWeight: 600,
                      border: `1px solid ${roadmap.color}20`,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', height: '48px', borderRadius: '14px', marginTop: '20px',
          background: `linear-gradient(135deg, ${roadmap.color}, #7C3AED)`,
          color: 'white', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600,
          border: 'none', cursor: 'pointer',
          boxShadow: `0 0 20px ${roadmap.color}35`,
        }}>
          Find Resources →
        </button>
      </div>
    </div>
  );
}
