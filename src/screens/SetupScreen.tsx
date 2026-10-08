import { useApp } from '../state';
import { class8SubjectOptions, effectiveStatus, effectiveType, fallbackResultType, isInternalType, matricSubjectOptions, resultStatuses, resultTypeOptions, RT } from '../data/academic';
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
const Select = ({ value, options, onChange, label }: { value: string; options: string[]; onChange: (v: string) => void; label: string }) => (
  <select aria-label={label} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', minHeight: 48, borderRadius: 14, border: `1px solid ${C.border}`, background: C.card, color: C.text, padding: '0 12px', fontSize: 14, fontFamily: 'Inter' }}>
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);
const Note = ({ children, tone = 'info' }: { children: React.ReactNode; tone?: 'info' | 'ok' }) => (
  <div style={{ margin: '10px 0', padding: '10px 12px', borderRadius: 12, fontSize: 12, lineHeight: 1.5, color: C.sub, background: tone === 'ok' ? `${C.success}14` : `${C.cyan}12`, border: `1px solid ${tone === 'ok' ? C.success : C.cyan}33` }}>{children}</div>
);
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

      {level !== 'beginner' && (() => {
        const type = effectiveType(p, level);
        const status = effectiveStatus(p);
        const opts = resultTypeOptions(level, p.currentClass);
        const noMarks = type === RT.declined;
        const internal = isInternalType(type);
        const showStatus = !noMarks && !internal;
        const declared = status === 'Declared';
        const c11 = level === 'advanced' && p.currentClass.startsWith('Class 11');
        const c12 = level === 'advanced' && p.currentClass.startsWith('Class 12');
        const useGroup = level === 'advanced' && (type === RT.c11 || internal);
        const subs = useGroup ? (advancedGroupSubjects[group] ?? []) : p.resultSubjects;
        const setType = (v: string) => updateProfile({ academicResultType: v, academicResultStatus: 'Declared', assessmentSource: isInternalType(v) ? 'internal' : 'official', subjectMarks: {}, resultSubjects: [], overallPercentage: '' });
        const fb = fallbackResultType(type);
        const toggleSub = (x: string) => {
          const on = p.resultSubjects.includes(x);
          const { [x]: _drop, ...rest } = p.subjectMarks;
          updateProfile({ resultSubjects: on ? p.resultSubjects.filter(y => y !== x) : [...p.resultSubjects, x], subjectMarks: on ? rest : p.subjectMarks });
        };
        return (
          <Block>
            <Label>Latest Available Academic Result</Label>
            <Hint>Provide your most recent completed academic result. If your latest result is still awaiting, you can continue without it.</Hint>
            {c11 && type === RT.c10 && <Note>Latest completed result: Class 10 / Matric. Since you are currently in Class 11, your Class 10 / Matric result is normally your latest completed board result.</Note>}
            <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub }}>Which academic result are you providing?</p>
            <Select label="Academic result type" value={type} options={opts} onChange={setType} />
            {showStatus && (
              <div style={{ marginTop: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub }}>Result Status</p>
                <Select label="Result status" value={status} options={resultStatuses} onChange={v => updateProfile({ academicResultStatus: v })} />
              </div>
            )}
            {showStatus && status === 'Awaiting' && (
              <Note tone="ok">
                {c12 && type === RT.c11 ? "That's okay. You can use your Class 10 / Matric result for now and update your 1st Year result when it is announced." : "That's okay. You can continue without it and update this when it is announced."}
                {fb && <button className="pressable" onClick={() => setType(fb)} style={{ display: 'block', marginTop: 8, background: 'none', border: 'none', padding: 0, minHeight: 32, color: C.cyan, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Use {fb.replace(' Result', '')} Result Instead</button>}
              </Note>
            )}
            {showStatus && status === 'Not Available' && <Note tone="ok">That's okay. A result that is not available is never treated as zero or low marks.</Note>}
            {type === RT.declined && <Note>No problem. You can continue normally. Readiness will be preliminary until you add a result.</Note>}
            {internal && <Note>Current / Internal Assessment. This is not an official result and is used with lower confidence.</Note>}
            {!noMarks && showStatus && declared && !useGroup && (
              <div style={{ marginTop: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub }}>Which subjects were part of this result?</p>
                <div className="flex flex-wrap" style={{ gap: 8 }}>{(type === RT.prev8 ? class8SubjectOptions : matricSubjectOptions).map(x => <Chip key={x} label={x} selected={p.resultSubjects.includes(x)} onClick={() => toggleSub(x)} />)}</div>
              </div>
            )}
            {!noMarks && !showStatus && !useGroup && (
              <div style={{ marginTop: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: C.sub }}>Which subjects were part of this assessment?</p>
                <div className="flex flex-wrap" style={{ gap: 8 }}>{matricSubjectOptions.map(x => <Chip key={x} label={x} selected={p.resultSubjects.includes(x)} onClick={() => toggleSub(x)} />)}</div>
              </div>
            )}
            {!noMarks && (!showStatus || declared) && (
              <div style={{ marginTop: 12 }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, color: C.sub }}>Overall Percentage</p>
                <Input inputMode="numeric" maxLength={3} placeholder="e.g. 76" value={p.overallPercentage} onChange={e => updateProfile({ overallPercentage: e.target.value.replace(/\D/g, '') })} />
                {subs.length > 0 && <>
                  <p style={{ margin: '14px 0 8px', fontSize: 12, fontWeight: 600, color: C.sub }}>Subject Results{useGroup && group ? ` · ${group}` : ''}</p>
                  {marks(subs)}
                </>}
                <div style={{ marginTop: 10 }}>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: C.sub }}>Academic year (optional)</p>
                  <Input inputMode="numeric" maxLength={9} placeholder="e.g. 2025" value={p.academicYear} onChange={e => updateProfile({ academicYear: e.target.value.replace(/[^\d/-]/g, '') })} />
                </div>
              </div>
            )}
          </Block>
        );
      })()}

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
