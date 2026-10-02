import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DimensionKey, EducationLevel, InterestDimensions, NavParams, QuestionOption, Screen, StudentProfile } from './types';
import { pickQuestion, Question } from './data/questions';
import { levelMeta } from './data/content';

export const SESSION_LENGTH = 4;
export const MIN_SESSIONS = 3;
export const LEVEL_ORDER: EducationLevel[] = ['beginner', 'intermediate', 'advanced'];

export interface StageEntry { level: EducationLevel; classes: string; title: string; status: 'completed' | 'current' | 'future' | 'skipped' }
export interface PriorStage { level: EducationLevel; currentClass: string; studyGroup: string; favouriteSubjects: string[]; difficultSubjects: string[]; subjectMarks: Record<string, string>; overallPercentage: string; futureFields: string[] }
export interface ResponseLog { questionId: string; level: EducationLevel | null; optionLabel: string | null; session: number }

const emptyProfile: StudentProfile = {
  name: '', email: '', educationLevel: null, currentClass: '', age: '', schoolName: '', studyGroup: '',
  favouriteSubjects: [], difficultSubjects: [], subjectMarks: {}, overallPercentage: '',
  futureIdeas: '', futureFields: [], activities: [], careerGoal: '',
};

const dimKeys: DimensionKey[] = ['analyticalThinking', 'technologyInterest', 'creativity', 'helpingPeople', 'leadership', 'communication', 'handsOnWork', 'researchInterest', 'businessInterest'];
const baseDims = (): InterestDimensions => Object.fromEntries(dimKeys.map(k => [k, 30])) as InterestDimensions;
const zeroEvidence = () => Object.fromEntries(dimKeys.map(k => [k, 0])) as Record<DimensionKey, number>;

interface Entry { screen: Screen; params: NavParams }

export interface AppCtx {
  screen: Screen; params: NavParams;
  nav: (s: Screen, p?: NavParams) => void;
  back: () => void;
  go: (s: Screen, p?: NavParams) => void;
  loadNav: (message: string, s: Screen, p?: NavParams) => void;
  loading: string | null;
  canGoBack: boolean;

  profile: StudentProfile; updateProfile: (p: Partial<StudentProfile>) => void;
  level: EducationLevel | null; setLevel: (l: EducationLevel) => void;
  displayName: string; firstName: string; classLabel: string; levelLabel: string;
  stageHistory: StageEntry[]; priorStages: PriorStage[]; nextLevel: EducationLevel | null;
  currentStageNeedsRefresh: boolean; advanceLevel: () => void; transitionFrom: EducationLevel | null;
  responses: ResponseLog[];
  profileStability: number; evidenceCoverage: number; unresolvedContradictions: number;
  recommendationsReady: boolean; unclearDims: DimensionKey[];
  signUp: (name: string, email: string) => void;
  logIn: (email: string) => void;
  googleLogin: () => void;
  logout: () => void;

  dims: InterestDimensions; topDims: Array<{ key: DimensionKey; value: number }>;
  questionsAnswered: number; profileConfidence: number;
  sessionsCompleted: number; sessionAnswered: number; currentSession: number;
  profileReady: boolean; lastReadyCheck: 'none' | 'ready' | 'more';
  currentQuestion: { question: Question; note?: string };
  answerQuestion: (q: Question, opt: QuestionOption | null) => void;
  finishSession: () => 'ready' | 'more';
  startNextSession: () => void;

  completedActivities: string[]; completeActivity: (id: string) => void;
  videoFeedback: Record<string, number>; rateVideo: (id: string, rating: number) => void;
  savedCareers: string[]; toggleCareer: (id: string) => void;
  savedDegrees: string[]; toggleDegree: (id: string) => void;
  exploredClusters: string[]; exploreCluster: (id: string) => void;
  factIndex: number; nextFact: () => void;
}

const g = globalThis as unknown as { __fmCtx?: React.Context<AppCtx | null> };
const Ctx = (g.__fmCtx ??= createContext<AppCtx | null>(null));
export const useApp = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp outside provider');
  return c;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<Entry[]>([{ screen: 'splash', params: {} }]);
  const [loading, setLoading] = useState<string | null>(null);
  const [profile, setProfile] = useState<StudentProfile>(emptyProfile);
  const [level, setLevelState] = useState<EducationLevel | null>(null);
  const [dims, setDims] = useState<InterestDimensions>(baseDims());
  const [evidence, setEvidence] = useState(zeroEvidence());
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [questionsAnswered, setQA] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [sessionsCompleted, setSessions] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [profileReady, setReady] = useState(false);
  const [lastReadyCheck, setLastCheck] = useState<'none' | 'ready' | 'more'>('none');
  const [completedActivities, setActs] = useState<string[]>([]);
  const [videoFeedback, setVF] = useState<Record<string, number>>({});
  const [savedCareers, setSC] = useState<string[]>([]);
  const [savedDegrees, setSD] = useState<string[]>([]);
  const [exploredClusters, setEC] = useState<string[]>([]);
  const [factIndex, setFact] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<EducationLevel[]>([]);
  const [priorStages, setPriorStages] = useState<PriorStage[]>([]);
  const [transitionFrom, setTransitionFrom] = useState<EducationLevel | null>(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const stageAnswersRef = useRef(0);
  const [responses, setResponses] = useState<ResponseLog[]>([]);
  const [metrics, setMetrics] = useState({ stability: 0, coverage: 0, contradictions: 0 });
  const dimsRef = useRef(dims); const evRef = useRef(evidence); const confRef = useRef(confidence);
  const snapsRef = useRef<InterestDimensions[]>([]);
  const sessionsRef = useRef(0); const readyRef = useRef(false);
  const tagsRef = useRef<string[]>([]);

  const cur = stack[stack.length - 1];
  const nav = useCallback((screen: Screen, params: NavParams = {}) => setStack(s => [...s, { screen, params }]), []);
  const back = useCallback(() => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)), []);
  const go = useCallback((screen: Screen, params: NavParams = {}) => setStack(
    screen === 'dashboard' || screen === 'splash' || screen === 'login' || screen === 'level'
      ? [{ screen, params }]
      : [{ screen: 'dashboard', params: {} }, { screen, params }]), []);
  const loadNav = useCallback((message: string, screen: Screen, params: NavParams = {}) => {
    setLoading(message);
    setTimeout(() => { setLoading(null); nav(screen, params); }, 800);
  }, [nav]);

  const setLevel = (l: EducationLevel) => { setLevelState(l); setCompletedLevels([]); setPriorStages([]); setTransitionFrom(null); setNeedsRefresh(false); setProfile(p => ({ ...p, educationLevel: l, currentClass: '', studyGroup: '', favouriteSubjects: [], difficultSubjects: [], subjectMarks: {}, futureFields: [], futureIdeas: '', activities: [] })); };
  const updateProfile = (p: Partial<StudentProfile>) => setProfile(prev => ({ ...prev, ...p }));

  const signUp = (name: string, email: string) => { setProfile(p => ({ ...p, name: name.trim(), email: email.trim() })); };
  const logIn = (email: string) => {
    setProfile(p => {
      if (p.name) return { ...p, email: p.email || email.trim() };
      const prefix = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
      const name = prefix ? prefix.replace(/\b\w/g, c => c.toUpperCase()) : 'Student';
      return { ...p, name, email: email.trim() };
    });
  };
  const googleLogin = () => setProfile(p => ({ ...p, name: p.name || 'Ayesha Khan', email: p.email || 'ayesha.khan@gmail.com' }));

  const logout = () => {
    setProfile(emptyProfile); setLevelState(null); setDims(baseDims()); setEvidence(zeroEvidence()); setAskedIds([]); setTags([]);
    setQA(0); setConfidence(0); setSessions(0); setSessionAnswered(0); setReady(false); setLastCheck('none');
    setActs([]); setVF({}); setSC([]); setSD([]); setEC([]); setFact(0);
    setStack([{ screen: 'login', params: {} }]);
    setCompletedLevels([]); setPriorStages([]); setTransitionFrom(null); setNeedsRefresh(false); setResponses([]); setMetrics({ stability: 0, coverage: 0, contradictions: 0 });
    dimsRef.current = baseDims(); evRef.current = zeroEvidence(); confRef.current = 0; snapsRef.current = []; sessionsRef.current = 0; readyRef.current = false; tagsRef.current = [];
  };

  const currentIdx = level ? LEVEL_ORDER.indexOf(level) : -1;
  const nextLevel = currentIdx >= 0 && currentIdx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[currentIdx + 1] : null;
  const stageHistory: StageEntry[] = LEVEL_ORDER.map((l, i) => ({
    level: l, classes: levelMeta[l].classes, title: levelMeta[l].title,
    status: i === currentIdx ? 'current' : completedLevels.includes(l) ? 'completed' : i < currentIdx ? 'skipped' : 'future',
  }));

  const advanceLevel = () => {
    if (!level || !nextLevel) return;
    setPriorStages(p => [...p, { level, currentClass: profile.currentClass, studyGroup: profile.studyGroup, favouriteSubjects: profile.favouriteSubjects, difficultSubjects: profile.difficultSubjects, subjectMarks: profile.subjectMarks, overallPercentage: profile.overallPercentage, futureFields: profile.futureFields }]);
    setCompletedLevels(c => (c.includes(level) ? c : [...c, level]));
    setTransitionFrom(level); setNeedsRefresh(true); stageAnswersRef.current = 0;
    setLevelState(nextLevel);
    setProfile(p => ({ ...p, educationLevel: nextLevel, currentClass: '', studyGroup: '', favouriteSubjects: [], difficultSubjects: [], subjectMarks: {}, overallPercentage: '' }));
    setSessionAnswered(0);
    nav('stage-transition');
  };

  const currentQuestion = useMemo(() => pickQuestion({ askedIds, tags, evidence, dims, level }), [askedIds, tags, evidence, dims, level]);

  const answerQuestion = (q: Question, opt: QuestionOption | null) => {
    setAskedIds(a => [...a, q.id]);
    setQA(n => n + 1);
    setSessionAnswered(n => n + 1);
    setResponses(r => [...r, { questionId: q.id, level, optionLabel: opt ? opt.label : null, session: sessionsRef.current + 1 }]);
    if (opt) {
      if (opt.tag) { tagsRef.current = [...tagsRef.current, opt.tag]; setTags(tagsRef.current); }
      const nd = { ...dimsRef.current };
      for (const [k, v] of Object.entries(opt.effects) as [DimensionKey, number][]) nd[k] = Math.min(96, nd[k] + v);
      dimsRef.current = nd; setDims(nd);
      const ne = { ...evRef.current };
      for (const k of Object.keys(opt.effects) as DimensionKey[]) ne[k] += 1;
      evRef.current = ne; setEvidence(ne);
    }
    confRef.current = Math.min(95, confRef.current + (opt ? 6 : 1)); setConfidence(confRef.current);
    stageAnswersRef.current += 1;
    if (stageAnswersRef.current >= SESSION_LENGTH) setNeedsRefresh(false);
  };

  const finishSession = () => {
    const done = sessionsRef.current + 1;
    sessionsRef.current = done; setSessions(done);
    setSessionAnswered(0);
    const snaps = [...snapsRef.current, { ...dimsRef.current }];
    snapsRef.current = snaps;
    const top = (d: InterestDimensions, n: number) => (Object.entries(d) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
    const bottom = (d: InterestDimensions, n: number) => (Object.entries(d) as [DimensionKey, number][]).sort((a, b) => a[1] - b[1]).slice(0, n).map(x => x[0]);
    let stability = 0; let contradictions = 0;
    if (snaps.length >= 2) {
      const a = snaps[snaps.length - 2]; const b = snaps[snaps.length - 1];
      const ta = top(a, 3); const tb = top(b, 3);
      const overlap = ta.filter(k => tb.includes(k)).length / 3;
      const drift = dimKeys.reduce((s, k) => s + Math.abs(a[k] - b[k]), 0) / dimKeys.length;
      stability = Math.max(0, Math.min(1, overlap * 0.7 + Math.max(0, 1 - drift / 12) * 0.3));
      const first = snaps[0]; const bt = bottom(b, 3);
      contradictions = top(first, 3).filter(k => bt.includes(k) && evRef.current[k] >= 2).length;
    }
    const coverage = dimKeys.filter(k => evRef.current[k] >= 2).length / dimKeys.length;
    setMetrics({ stability, coverage, contradictions });
    const strong = done >= MIN_SESSIONS && confRef.current >= 60 && stability >= 0.6 && coverage >= 0.55 && contradictions === 0;
    const ready = readyRef.current || strong;
    readyRef.current = ready; setReady(ready);
    setLastCheck(done < MIN_SESSIONS ? 'none' : ready ? 'ready' : 'more');
    return ready ? 'ready' as const : 'more' as const;
  };
  const startNextSession = () => setSessionAnswered(0);

  const completeActivity = (id: string) => {
    setActs(a => (a.includes(id) ? a : [...a, id]));
    confRef.current = Math.min(95, confRef.current + 3); setConfidence(confRef.current);
    const nd = { ...dimsRef.current, analyticalThinking: Math.min(96, dimsRef.current.analyticalThinking + 2), creativity: Math.min(96, dimsRef.current.creativity + 1) };
    dimsRef.current = nd; setDims(nd);
  };
  const rateVideo = (id: string, rating: number) => {
    setVF(v => ({ ...v, [id]: rating }));
    confRef.current = Math.min(95, confRef.current + 1); setConfidence(confRef.current);
  };
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) => set(a => (a.includes(id) ? a.filter(x => x !== id) : [...a, id]));
  const exploreCluster = (id: string) => setEC(a => (a.includes(id) ? a : [...a, id]));

  const topDims = (Object.entries(dims) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]).map(([key, value]) => ({ key, value }));
  const meta = level ? levelMeta[level] : null;
  const displayName = profile.name || 'Student';

  const value: AppCtx = {
    screen: cur.screen, params: cur.params, nav, back, go, loadNav, loading, canGoBack: stack.length > 1,
    profile, updateProfile, level, setLevel, displayName, firstName: displayName.split(' ')[0],
    classLabel: profile.currentClass || meta?.classes || '', levelLabel: meta?.label ?? '',
    stageHistory, priorStages, nextLevel, advanceLevel, transitionFrom, responses,
    profileStability: metrics.stability, evidenceCoverage: metrics.coverage, unresolvedContradictions: metrics.contradictions,
    recommendationsReady: profileReady && !needsRefresh, currentStageNeedsRefresh: needsRefresh,
    unclearDims: dimKeys.filter(k => evidence[k] < 2),
    signUp, logIn, googleLogin, logout,
    dims, topDims, questionsAnswered, profileConfidence: confidence, sessionsCompleted, sessionAnswered,
    currentSession: sessionsCompleted + 1, profileReady: profileReady && !needsRefresh, lastReadyCheck, currentQuestion, answerQuestion, finishSession, startNextSession,
    completedActivities, completeActivity, videoFeedback, rateVideo,
    savedCareers, toggleCareer: toggle(setSC), savedDegrees, toggleDegree: toggle(setSD), exploredClusters, exploreCluster,
    factIndex, nextFact: () => setFact(i => i + 1),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
