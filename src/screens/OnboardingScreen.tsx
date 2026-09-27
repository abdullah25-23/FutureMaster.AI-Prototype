import { useState } from 'react';
import { Screen, EducationModule, StudentProfile } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED', success: '#00E676',
};

interface Props {
  navigate: (s: Screen) => void;
  educationModule: EducationModule | null;
  updateStudentProfile: (p: Partial<StudentProfile>) => void;
}

const subjectsByModule: Record<string, string[]> = {
  class6_8: ['Mathematics', 'General Science', 'Computer', 'English', 'Urdu', 'Social Studies', 'Art', 'Other'],
  class9_10: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Pakistan Studies'],
  class11_12: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Economics', 'Statistics'],
  university: [],
};

const studyGroups: Record<string, string[]> = {
  class9_10: ['Science (Biology)', 'Science (Computer Science)', 'Arts / Humanities', 'Other'],
  class11_12: ['FSc Pre-Medical', 'FSc Pre-Engineering', 'ICS', 'I.Com / Commerce', 'FA / Arts / Humanities', 'Other'],
  class6_8: [],
  university: [],
};

const skills = ['Python', 'Java', 'C++', 'C#', 'Flutter', 'Web Development', 'SQL', 'Databases', 'Git', 'UI/UX', 'Data Analysis', 'Machine Learning', 'Software Testing'];
const activities = ['Building / Making Things', 'Drawing / Designing', 'Reading / Writing', 'Sports / Games', 'Helping Others', 'Problem Solving', 'Music / Arts', 'Coding / Tech'];

function getDashboard(mod: EducationModule): Screen {
  if (mod === 'class6_8') return 'class68-dashboard';
  if (mod === 'class9_10') return 'class910-dashboard';
  if (mod === 'class11_12') return 'class1112-dashboard';
  return 'university-dashboard';
}

function ChipSelect({ items, selected, onToggle, color = C.indigo }: {
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
  color?: string;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map(item => {
        const isSelected = selected.includes(item);
        return (
          <button key={item} onClick={() => onToggle(item)} style={{
            padding: '7px 13px', borderRadius: '20px', cursor: 'pointer',
            border: isSelected ? `1.5px solid ${color}` : `1.5px solid ${C.border}`,
            background: isSelected ? `${color}16` : C.elevated,
            fontFamily: 'Inter', fontSize: '12px', fontWeight: isSelected ? 600 : 400,
            color: isSelected ? color : C.muted,
            transition: 'all 0.15s ease',
          }}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default function ProfileSetupScreen({ navigate, educationModule, updateStudentProfile }: Props) {
  const mod = educationModule ?? 'class9_10';

  const [currentClass, setCurrentClass] = useState('');
  const [age, setAge] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [studyGroup, setStudyGroup] = useState('');
  const [favSubjects, setFavSubjects] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [difficultSubjects, setDifficultSubjects] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [degree, setDegree] = useState('');
  const [semester, setSemester] = useState('');
  const [university, setUniversity] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [exploringIdeas, setExploringIdeas] = useState('');

  function toggleItem(item: string, list: string[], setter: (l: string[]) => void) {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  }

  function handleFinish() {
    updateStudentProfile({
      currentClass, age, schoolName, studyGroup,
      favouriteSubjects: favSubjects,
      activities: selectedActivities,
      skills: selectedSkills,
      degree, semester, university, careerGoal,
    });
    navigate(getDashboard(mod));
  }

  const moduleLabel: Record<EducationModule, string> = {
    class6_8: 'Class 6-8',
    class9_10: 'Class 9-10',
    class11_12: 'Class 11-12',
    university: 'University / BS',
  };

  const classOptions: Record<string, string[]> = {
    class6_8: ['6', '7', '8'],
    class9_10: ['9', '10'],
    class11_12: ['11', '12'],
    university: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
  };

  const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
    <div>
      <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '7px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', height: '48px', borderRadius: '12px',
          border: `1.5px solid ${C.border}`, background: C.card,
          padding: '0 14px', fontFamily: 'Inter', fontSize: '14px', color: C.text,
          outline: 'none', boxSizing: 'border-box',
        }}
      />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #131827 100%)',
        padding: '48px 20px 20px',
        borderRadius: '0 0 24px 24px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button onClick={() => navigate('education')} style={{
          background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
          borderRadius: '10px', width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '12px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(0,210,255,0.08)', borderRadius: '8px',
          padding: '3px 10px', marginBottom: '8px',
          border: '1px solid rgba(0,210,255,0.15)',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: C.cyan, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            {moduleLabel[mod]}
          </span>
        </div>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 700, color: C.text, margin: '0 0 4px 0' }}>
          Tell us about yourself
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.sub, margin: 0 }}>
          This helps us personalise your experience from day one.
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-5 py-4 flex flex-col gap-5" style={{ paddingBottom: '24px' }}>

        {/* Class / Semester selection */}
        <div>
          <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
            {mod === 'university' ? 'Current Semester' : 'Current Class'}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {classOptions[mod].map(opt => (
              <button key={opt} onClick={() => mod === 'university' ? setSemester(opt) : setCurrentClass(opt)} style={{
                padding: '8px 16px', borderRadius: '10px', cursor: 'pointer',
                border: (mod === 'university' ? semester === opt : currentClass === opt) ? `1.5px solid ${C.indigo}` : `1.5px solid ${C.border}`,
                background: (mod === 'university' ? semester === opt : currentClass === opt) ? `${C.indigo}16` : C.card,
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                color: (mod === 'university' ? semester === opt : currentClass === opt) ? C.indigo : C.muted,
              }}>
                {mod === 'university' ? `Semester ${opt}` : `Class ${opt}`}
              </button>
            ))}
          </div>
        </div>

        <InputField label="Age" value={age} onChange={setAge} placeholder="e.g. 15" />

        {mod !== 'university' && (
          <InputField label="School Name (optional)" value={schoolName} onChange={setSchoolName} placeholder="Your school name" />
        )}

        {mod === 'university' && (
          <>
            <InputField label="Degree / Program" value={degree} onChange={setDegree} placeholder="e.g. BS Computer Science" />
            <InputField label="University (optional)" value={university} onChange={setUniversity} placeholder="Your university name" />
          </>
        )}

        {(mod === 'class9_10' || mod === 'class11_12') && studyGroups[mod].length > 0 && (
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Current Study Group
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {studyGroups[mod].map(group => (
                <button key={group} onClick={() => setStudyGroup(group)} style={{
                  width: '100%', padding: '12px 14px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  border: studyGroup === group ? `1.5px solid ${C.violet}` : `1.5px solid ${C.border}`,
                  background: studyGroup === group ? `${C.violet}12` : C.card,
                  fontFamily: 'Inter', fontSize: '13px', fontWeight: studyGroup === group ? 600 : 400,
                  color: studyGroup === group ? C.violet : C.sub,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {group}
                  {studyGroup === group && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill={C.violet}/>
                      <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {mod !== 'university' && subjectsByModule[mod].length > 0 && (
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Favourite Subjects
            </label>
            <ChipSelect items={subjectsByModule[mod]} selected={favSubjects} onToggle={item => toggleItem(item, favSubjects, setFavSubjects)} color={C.cyan} />
          </div>
        )}

        {mod === 'class9_10' && (
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Subjects You Find Difficult
            </label>
            <ChipSelect items={subjectsByModule[mod]} selected={difficultSubjects} onToggle={item => toggleItem(item, difficultSubjects, setDifficultSubjects)} color="#FF5252" />
          </div>
        )}

        {mod === 'class6_8' && (
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Activities You Usually Enjoy
            </label>
            <ChipSelect items={activities} selected={selectedActivities} onToggle={item => toggleItem(item, selectedActivities, setSelectedActivities)} color={C.success} />
          </div>
        )}

        {mod === 'university' && (
          <>
            <div>
              <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                Current Skills
              </label>
              <ChipSelect items={skills} selected={selectedSkills} onToggle={item => toggleItem(item, selectedSkills, setSelectedSkills)} color={C.cyan} />
            </div>
            <div>
              <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                Career Goal (optional)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Backend Engineer', 'Frontend Developer', 'Data Scientist', 'AI/ML Engineer', 'Mobile Developer', 'DevOps Engineer', 'Not sure yet'].map(goal => (
                  <button key={goal} onClick={() => setCareerGoal(goal)} style={{
                    width: '100%', padding: '11px 14px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                    border: careerGoal === goal ? `1.5px solid ${C.cyan}` : `1.5px solid ${C.border}`,
                    background: careerGoal === goal ? `${C.cyan}10` : C.card,
                    fontFamily: 'Inter', fontSize: '13px', color: careerGoal === goal ? C.cyan : C.sub,
                    fontWeight: careerGoal === goal ? 600 : 400,
                  }}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {(mod === 'class9_10' || mod === 'class11_12') && (
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Are you already thinking about a future field?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Yes, I have some ideas', 'Not sure', 'Not yet'].map(opt => (
                <button key={opt} onClick={() => setExploringIdeas(opt)} style={{
                  width: '100%', padding: '11px 14px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  border: exploringIdeas === opt ? `1.5px solid ${C.indigo}` : `1.5px solid ${C.border}`,
                  background: exploringIdeas === opt ? `${C.indigo}12` : C.card,
                  fontFamily: 'Inter', fontSize: '13px', color: exploringIdeas === opt ? C.indigo : C.sub,
                  fontWeight: exploringIdeas === opt ? 600 : 400,
                }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.12)',
          borderRadius: '12px', padding: '12px 14px',
        }}>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, margin: 0, lineHeight: '1.5' }}>
            ✦ You can update this information at any time from your Profile.
          </p>
        </div>

        <button
          onClick={handleFinish}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(99,102,241,0.4)',
          }}
        >
          Start Exploring →
        </button>
      </div>
    </div>
  );
}
