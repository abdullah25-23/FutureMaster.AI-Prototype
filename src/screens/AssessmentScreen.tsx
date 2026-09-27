import { useState } from 'react';
import { Screen, EducationModule, ExplorationProgress } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
  success: '#00E676', warning: '#FFC107',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
  explorationProgress: ExplorationProgress;
}

interface Option { label: string; icon: string; color: string; }
interface Question { scenario: string; q: string; options: Option[]; }

const questionsByModule: Record<string, Question[]> = {
  class6_8: [
    {
      scenario: 'School Science Exhibition',
      q: 'Your school is organising a science and technology exhibition. Which role would you enjoy most?',
      options: [
        { label: 'Programming a small robot', icon: '🤖', color: '#6366F1' },
        { label: 'Designing the exhibition poster', icon: '🎨', color: '#EC4899' },
        { label: 'Presenting the project to visitors', icon: '🎤', color: '#FFC107' },
        { label: 'Organising the team and schedule', icon: '📋', color: '#00E676' },
      ],
    },
    {
      scenario: 'Broken Device at Home',
      q: 'A device at home suddenly stops working. What would interest you most?',
      options: [
        { label: 'Finding out what went wrong', icon: '🔍', color: '#6366F1' },
        { label: 'Trying to repair it yourself', icon: '🔧', color: '#FFC107' },
        { label: 'Learning how it works inside', icon: '📖', color: '#00D2FF' },
        { label: 'Redesigning it to be better', icon: '💡', color: '#EC4899' },
      ],
    },
    {
      scenario: 'Group Project',
      q: 'You are working on a group project. Which role naturally attracts you?',
      options: [
        { label: 'Solve the difficult technical part', icon: '🧩', color: '#6366F1' },
        { label: 'Research information and ideas', icon: '📚', color: '#7C3AED' },
        { label: 'Design how the project looks', icon: '🖌️', color: '#EC4899' },
        { label: 'Organise the team and tasks', icon: '📋', color: '#00E676' },
      ],
    },
    {
      scenario: 'Free Afternoon',
      q: 'You have a free afternoon with no plans. What sounds most appealing?',
      options: [
        { label: 'Build or code something new', icon: '💻', color: '#6366F1' },
        { label: 'Draw, paint or make art', icon: '🎨', color: '#EC4899' },
        { label: 'Read about something interesting', icon: '📖', color: '#7C3AED' },
        { label: 'Go outside and explore nature', icon: '🌿', color: '#00E676' },
      ],
    },
    {
      scenario: 'Helping a Younger Student',
      q: 'A younger student is struggling with a problem. What feels most natural to you?',
      options: [
        { label: 'Explain step by step until they understand', icon: '🎓', color: '#00D2FF' },
        { label: 'Show them using a visual diagram', icon: '📊', color: '#FFC107' },
        { label: 'Help them find the answer themselves', icon: '🔍', color: '#6366F1' },
        { label: 'Do it for them so they can watch', icon: '👀', color: '#00E676' },
      ],
    },
  ],
  class9_10: [
    {
      scenario: 'School Science Exhibition',
      q: 'Your school is organising a science and technology exhibition. Which role would you enjoy most?',
      options: [
        { label: 'Building and coding the project', icon: '💻', color: '#6366F1' },
        { label: 'Researching the science behind it', icon: '🔬', color: '#00E676' },
        { label: 'Designing how it looks and is presented', icon: '🎨', color: '#EC4899' },
        { label: 'Managing the team and logistics', icon: '📋', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Choosing Subjects',
      q: 'If you could focus on just two subjects this year, which combination appeals to you most?',
      options: [
        { label: 'Computer Science + Mathematics', icon: '💻', color: '#6366F1' },
        { label: 'Biology + Chemistry', icon: '🧬', color: '#00E676' },
        { label: 'Physics + Mathematics', icon: '⚡', color: '#7C3AED' },
        { label: 'Economics + English', icon: '💼', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Problem-Solving Style',
      q: 'When you face a difficult problem in school, what is your usual approach?',
      options: [
        { label: 'Break it into smaller logical steps', icon: '🧩', color: '#6366F1' },
        { label: 'Research until you find the answer', icon: '🔍', color: '#00D2FF' },
        { label: 'Talk it through with friends', icon: '💬', color: '#00E676' },
        { label: 'Try different approaches until one works', icon: '🔄', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Future Work Environment',
      q: 'Which work environment sounds most interesting to you?',
      options: [
        { label: 'Tech office building software or systems', icon: '🏢', color: '#6366F1' },
        { label: 'Laboratory doing experiments and research', icon: '🔬', color: '#00E676' },
        { label: 'Hospital or clinic helping patients', icon: '🏥', color: '#FF5252' },
        { label: 'Studio creating designs or media', icon: '🎭', color: '#EC4899' },
      ],
    },
  ],
  class11_12: [
    {
      scenario: 'University Choice',
      q: 'If you had to choose a university degree today based on pure interest, which area draws you?',
      options: [
        { label: 'Computing and Software', icon: '💻', color: '#6366F1' },
        { label: 'Engineering and Applied Science', icon: '⚙️', color: '#7C3AED' },
        { label: 'Medical and Health Sciences', icon: '🏥', color: '#FF5252' },
        { label: 'Business and Management', icon: '💼', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Work Preference',
      q: 'Think about the kind of work you find most energising. Which fits best?',
      options: [
        { label: 'Designing and building systems', icon: '⚙️', color: '#6366F1' },
        { label: 'Analysing data and finding patterns', icon: '📊', color: '#00D2FF' },
        { label: 'Leading teams and making decisions', icon: '🎯', color: '#FFC107' },
        { label: 'Researching and writing ideas', icon: '✍️', color: '#7C3AED' },
      ],
    },
    {
      scenario: 'Career Impact',
      q: 'What kind of impact matters most to you in a future career?',
      options: [
        { label: 'Building technology that improves daily life', icon: '🚀', color: '#6366F1' },
        { label: 'Helping people with health and wellbeing', icon: '❤️', color: '#FF5252' },
        { label: 'Growing a business or economy', icon: '📈', color: '#FFC107' },
        { label: 'Advancing knowledge through research', icon: '🔭', color: '#7C3AED' },
      ],
    },
  ],
  university: [
    {
      scenario: 'Technical Challenge',
      q: 'Your team needs to solve a complex technical problem. What role do you naturally take?',
      options: [
        { label: 'Design the system architecture', icon: '🏗️', color: '#6366F1' },
        { label: 'Write and optimise the core code', icon: '💻', color: '#00D2FF' },
        { label: 'Analyse data to understand the problem', icon: '📊', color: '#7C3AED' },
        { label: 'Coordinate and prioritise the team', icon: '📋', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Learning Preference',
      q: 'Which learning activity resonates most with how you develop skills?',
      options: [
        { label: 'Build personal projects from scratch', icon: '🛠️', color: '#6366F1' },
        { label: 'Take structured online courses', icon: '🎓', color: '#00D2FF' },
        { label: 'Contribute to open source projects', icon: '🔓', color: '#00E676' },
        { label: 'Work on real internship problems', icon: '🏢', color: '#FFC107' },
      ],
    },
    {
      scenario: 'Specialisation Interest',
      q: 'Which area of computing do you find most interesting to explore deeper?',
      options: [
        { label: 'Backend systems and APIs', icon: '⚙️', color: '#6366F1' },
        { label: 'Machine learning and AI', icon: '🤖', color: '#7C3AED' },
        { label: 'Cloud and DevOps infrastructure', icon: '☁️', color: '#00D2FF' },
        { label: 'Mobile and cross-platform apps', icon: '📱', color: '#00E676' },
      ],
    },
  ],
};

function getProgressLabel(confidence: number): string {
  if (confidence < 25) return 'Getting to know you';
  if (confidence < 45) return 'Exploring your interests';
  if (confidence < 65) return 'Your profile is taking shape';
  if (confidence < 80) return 'Your profile is becoming clearer';
  return 'Continue exploring';
}

function getDashboard(mod: EducationModule | null): Screen {
  if (mod === 'class6_8') return 'class68-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  return 'university-dashboard';
}

export default function AssessmentScreen({ navigate, educationModule, explorationProgress }: Props) {
  const mod = educationModule ?? 'class9_10';
  const questions = questionsByModule[mod] || questionsByModule['class9_10'];
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = questions[questionIdx];
  const isLast = questionIdx === questions.length - 1;
  const baseConfidence = explorationProgress.profileConfidence;
  const simulatedConfidence = Math.min(95, baseConfidence + questionIdx * 6);
  const progressLabel = getProgressLabel(simulatedConfidence);

  function handleNext() {
    if (!selected) return;
    if (isLast) {
      navigate('interest-profile');
    } else {
      setAnswers([...answers, selected]);
      setSelected(null);
      setQuestionIdx(q => q + 1);
    }
  }

  function handleBack() {
    if (questionIdx > 0) {
      setQuestionIdx(q => q - 1);
      setSelected(answers[questionIdx - 1] || null);
    } else {
      navigate(getDashboard(educationModule));
    }
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #111525 100%)',
        padding: '48px 20px 18px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBack} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, letterSpacing: '0.8px', marginBottom: '6px', textTransform: 'uppercase' }}>
              Adaptive Exploration
            </div>
            {/* Progress bar */}
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '2px',
                background: 'linear-gradient(90deg, #6366F1, #00D2FF)',
                width: `${simulatedConfidence}%`,
                boxShadow: '0 0 8px rgba(0,210,255,0.5)',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', color: C.sub, marginTop: '4px' }}>
              {progressLabel}
            </div>
          </div>
        </div>

        {/* Adaptive hint */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          background: 'rgba(0,210,255,0.07)', border: '1px solid rgba(0,210,255,0.15)',
          borderRadius: '6px', padding: '4px 10px', marginBottom: '10px',
        }}>
          <span style={{ fontSize: '10px' }}>✦</span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 500 }}>
            Your next question is selected based on what you've told us so far.
          </span>
        </div>

        {/* Scenario label */}
        <div style={{
          fontFamily: 'Inter', fontSize: '10px', color: C.muted, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px',
        }}>
          Scenario: {question.scenario}
        </div>

        <h2 style={{ fontFamily: 'Poppins', fontSize: '17px', fontWeight: 700, color: C.text, margin: 0, lineHeight: '1.4' }}>
          {question.q}
        </h2>
      </div>

      {/* Options */}
      <div className="flex-1 mobile-scroll px-5 py-4 flex flex-col gap-3">
        {question.options.map(opt => {
          const sel = selected === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              style={{
                width: '100%', padding: '15px 16px', borderRadius: '14px', textAlign: 'left',
                border: sel ? `1.5px solid ${opt.color}` : `1.5px solid ${C.border}`,
                background: sel ? `${opt.color}10` : C.card,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'all 0.18s ease',
                boxShadow: sel ? `0 0 16px ${opt.color}25, 0 4px 12px rgba(0,0,0,0.3)` : '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: sel ? `${opt.color}18` : C.elevated,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
              }}>
                {opt.icon}
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, flex: 1, color: sel ? opt.color : C.sub }}>
                {opt.label}
              </span>
              {sel && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={opt.color}/>
                  <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />

        <div className="flex gap-3" style={{ marginTop: '8px' }}>
          {questionIdx > 0 && (
            <button onClick={() => { setQuestionIdx(q => q - 1); setSelected(answers[questionIdx - 1] || null); }} style={{
              height: '52px', borderRadius: '14px', padding: '0 20px',
              background: C.card, border: `1.5px solid ${C.border}`,
              fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, color: C.sub, cursor: 'pointer',
            }}>
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              flex: 1, height: '52px', borderRadius: '14px',
              background: selected ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' : C.card,
              color: selected ? 'white' : C.muted,
              fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
              border: selected ? 'none' : `1.5px solid ${C.border}`,
              cursor: selected ? 'pointer' : 'not-allowed',
              boxShadow: selected ? '0 0 24px rgba(99,102,241,0.4)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isLast ? 'View My Interest Profile →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
