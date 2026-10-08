import { EducationLevel, StudentProfile } from '../types';

export interface SubjectResult { subject: string; percentage: number }
export interface AcademicRecord { resultType: string; resultStatus: string; academicYear: string; overallPercentage: number | null; isOfficial: boolean }

export const RT = {
  prev8: 'Class 8 / Previous School Result', c9: 'Class 9 Result', c10: 'Class 10 / Matric Result', c11: 'Class 11 / 1st Year Result',
  internal: 'Current School / College Assessment', declined: 'Prefer not to enter marks right now',
} as const;
export const resultStatuses = ['Declared', 'Awaiting', 'Not Available'];
export const class8SubjectOptions = ['Mathematics', 'General Science', 'Computer', 'English', 'Urdu', 'Social Studies', 'Other'];
export const matricSubjectOptions = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Other'];

const stageOf = (cls: string) => cls.startsWith('Class 12') ? 12 : cls.startsWith('Class 11') ? 11 : cls === 'Class 10' ? 10 : 9;
export function resultTypeOptions(level: EducationLevel, cls: string): string[] {
  const st = stageOf(cls);
  if (level === 'intermediate') return st === 10 ? [RT.c9, RT.prev8, RT.internal, RT.declined] : [RT.prev8, RT.internal, RT.declined];
  return st === 12 ? [RT.c11, RT.c10, RT.internal, RT.declined] : [RT.c10, RT.internal, RT.declined];
}
export const defaultResultType = (level: EducationLevel, cls: string) => resultTypeOptions(level, cls)[0];
export const fallbackResultType = (type: string): string | null => (type === RT.c11 ? RT.c10 : type === RT.c9 ? RT.prev8 : null);
export function effectiveType(p: StudentProfile, level: EducationLevel) {
  const opts = resultTypeOptions(level, p.currentClass);
  return opts.includes(p.academicResultType) ? p.academicResultType : opts[0];
}
export const effectiveStatus = (p: StudentProfile) => p.academicResultStatus || 'Declared';
export const isInternalType = (t: string) => t === RT.internal;

const num = (s: string | undefined): number | null => {
  const m = (s ?? '').match(/\d+(\.\d+)?/);
  if (!m) return null;
  const v = parseFloat(m[0]);
  return v >= 0 && v <= 100 ? v : null;
};
const avg = (marks: Record<string, string>) => {
  const v = Object.values(marks).map(num).filter((x): x is number => x !== null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

export interface AcademicEvidence {
  state: 'official' | 'previous' | 'internal' | 'awaiting' | 'declined' | 'none';
  record: AcademicRecord | null;
  subjects: SubjectResult[];
  overall: number | null;
  lowerConfidence: boolean;
}

export function academicEvidence(p: StudentProfile): AcademicEvidence {
  const level = p.educationLevel ?? 'beginner';
  const none = (state: AcademicEvidence['state']): AcademicEvidence => ({ state, record: null, subjects: [], overall: null, lowerConfidence: false });
  if (level === 'beginner') return none('none');
  const type = effectiveType(p, level);
  const status = effectiveStatus(p);
  const subjects: SubjectResult[] = Object.entries(p.subjectMarks).map(([subject, v]) => ({ subject, percentage: num(v) as number })).filter(s => s.percentage !== null);
  const overall = num(p.overallPercentage) ?? avg(p.subjectMarks);
  const prior = p.priorAcademic;
  const fromPrior = (): AcademicEvidence | null => prior ? {
    state: 'previous', lowerConfidence: false, overall: prior.overall,
    subjects: Object.entries(prior.subjectMarks).map(([subject, v]) => ({ subject, percentage: num(v) as number })).filter(s => s.percentage !== null),
    record: { resultType: prior.resultType, resultStatus: 'Declared', academicYear: prior.academicYear, overallPercentage: prior.overall, isOfficial: true },
  } : null;
  if (type === RT.declined) return none('declined');
  if (!isInternalType(type) && status !== 'Declared') return fromPrior() ?? none('awaiting');
  if (overall === null) return fromPrior() ?? none('none');
  const internal = isInternalType(type);
  return { state: internal ? 'internal' : 'official', lowerConfidence: internal, overall, subjects,
    record: { resultType: type, resultStatus: status, academicYear: p.academicYear, overallPercentage: overall, isOfficial: !internal } };
}
