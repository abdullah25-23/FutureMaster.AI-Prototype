import { useApp } from '../state';
import { Btn, C, Chip, Input, Label, Screen } from '../components/ui';
import { beginnerActivities, beginnerSubjects, advancedGroups, advancedGroupSubjects, futureFieldOptions, intermediateGroups, intermediateMarkSubjects, intermediateSubjects, levelMeta } from '../data/content';

function Multi({ options, value, onChange }: { options: Array<string | { label: string; icon?: string }>; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap" style={{ gap: 8 }}>
      {options.map(o => {
        const label = typeof o === 'string' ? o : o.label; const icon = typeof o === 'string' ? undefined : o.icon;
        return <Chip key={label} label={label} icon={icon} selected={value.includes(label)} onClick={() => onChange(value.includes(label) ? value.filter(x => x !== label) : [...value, label])} />;
      })}
    </div>
  );
}
function Single({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return <div className="flex flex-wrap" style={{ gap: 8 }}>{options.map(o => <Chip key={o} label={o} selected={value === o} onClick={() => onChange(o)} />)}</div>;
}
const Block = ({ children }: { children: React.ReactNode }) => <div style={{ marginBottom: 22 }}>{children}</div>;
const Hint = ({ children }: { children: React.ReactNode }) => <p style={{ margin: '-4px 0 8px', fontSize: 12, color: C.muted }}>{children}</p>;

export default function SetupScreen() {
  const { level, profile, updateProfile, nav, go, transitionFrom } = useApp();
  if (!level) return null;
  const m = levelMeta[level];
  const p = profile;
  const marks = (subs: string[]) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {subs.map(s => (
        <div key={s}>
          <p style={{ margin: '0 0 4px', fontSize: 12, color: C.sub }}>{s} (%)</p>
          <Input inputMode="numeric" maxLength={3} placeholder="e.g. 78" value={p.subjectMarks[s] ?? ''} onChange={e => updateProfile({ subjectMarks: { ...p.subjectMarks, [s]: e.target.value.replace(/\D/g, '') } })} />
        </div>
      ))}
    </div>
  );
  const group = p.studyGroup;
  const markSubs = level === 'advanced'
    ? advancedGroupSubjects[group] ?? []
    : intermediateMarkSubjects.filter(s => s !== 'Biology' && s !== 'Computer Science' || (s === 'Biology' && group === 'Science with Biology') || (s === 'Computer Science' && group === 'Science with Computer Science'));
  const valid = !!p.currentClass && (level === 'beginner' || !!p.studyGroup) && (!p.age || +p.age > 4);

  return (
    <Screen title={`${m.label} Profile`} subtitle={`${m.classes} · a few quick questions`}
      footer={<Btn disabled={!valid} onClick={() => (transitionFrom ? go('dashboard') : nav('intro'))}>Continue</Btn>}>
      <Block>
        <Label>{level === 'advanced' ? 'Which year are you in?' : 'Current Class'}</Label>
        <Single options={m.classList} value={p.currentClass} onChange={v => updateProfile({ currentClass: v })} />
      </Block>
      <Block>
        <Label>Age</Label>
        <Input inputMode="numeric" maxLength={2} placeholder="e.g. 13" value={p.age} onChange={e => updateProfile({ age: e.target.value.replace(/\D/g, '') })} />
      </Block>
      <Block>
        <Label>School (optional)</Label>
        <Input placeholder="School name" value={p.schoolName} onChange={e => updateProfile({ schoolName: e.target.value })} />
      </Block>

      {level !== 'beginner' && (
        <Block>
          <Label>Study Group</Label>
          <Single options={level === 'intermediate' ? intermediateGroups : advancedGroups} value={p.studyGroup} onChange={v => updateProfile({ studyGroup: v, subjectMarks: {} })} />
        </Block>
      )}

      <Block>
        <Label>Favourite Subjects</Label>
        <Multi options={level === 'beginner' ? beginnerSubjects : level === 'intermediate' ? intermediateSubjects : (advancedGroupSubjects[group] ?? ['Mathematics', 'English', 'Computer Science', 'Physics', 'Biology'])} value={p.favouriteSubjects} onChange={v => updateProfile({ favouriteSubjects: v })} />
      </Block>

      {level !== 'beginner' && (
        <Block>
          <Label>Subjects you find difficult</Label>
          <Hint>This helps guide, never limit, your options.</Hint>
          <Multi options={level === 'intermediate' ? intermediateSubjects : (advancedGroupSubjects[group] ?? ['Mathematics', 'English', 'Computer Science', 'Physics', 'Biology'])} value={p.difficultSubjects} onChange={v => updateProfile({ difficultSubjects: v })} />
        </Block>
      )}

      {level === 'beginner' && (
        <Block>
          <Label>What kinds of activities do you enjoy? (optional)</Label>
          <Multi options={beginnerActivities} value={p.activities} onChange={v => updateProfile({ activities: v })} />
        </Block>
      )}

      {level !== 'beginner' && (
        <Block>
          <Label>Academic Information (optional)</Label>
          <Hint>{level === 'intermediate' ? 'Recent marks in relevant subjects.' : group ? `Typical subjects for ${group}.` : 'Choose a study group to see its subjects.'}</Hint>
          {markSubs.length > 0 && marks(markSubs)}
          <div style={{ marginTop: 10 }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: C.sub }}>Overall Percentage</p>
            <Input inputMode="numeric" maxLength={3} placeholder="e.g. 76" value={p.overallPercentage} onChange={e => updateProfile({ overallPercentage: e.target.value.replace(/\D/g, '') })} />
          </div>
        </Block>
      )}

      {level === 'intermediate' && (
        <Block>
          <Label>Are you already thinking about any future field?</Label>
          <Single options={['Yes, I have some ideas', 'Not sure', 'Not yet']} value={{ yes: 'Yes, I have some ideas', unsure: 'Not sure', 'not-yet': 'Not yet', '': '' }[p.futureIdeas]}
            onChange={v => updateProfile({ futureIdeas: v.startsWith('Yes') ? 'yes' : v === 'Not sure' ? 'unsure' : 'not-yet', futureFields: v.startsWith('Yes') ? p.futureFields : [] })} />
          {p.futureIdeas === 'yes' && (
            <div className="pop-in" style={{ marginTop: 14 }}>
              <Label>What areas are you thinking about?</Label>
              <Multi options={futureFieldOptions} value={p.futureFields} onChange={v => updateProfile({ futureFields: v })} />
            </div>
          )}
        </Block>
      )}

      {level === 'advanced' && (
        <Block>
          <Label>Which fields or degrees are you already considering? (optional)</Label>
          <Multi options={futureFieldOptions} value={p.futureFields} onChange={v => updateProfile({ futureFields: v })} />
        </Block>
      )}
    </Screen>
  );
}
