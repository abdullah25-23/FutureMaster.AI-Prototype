import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { DimensionKey, EducationLevel, InterestDimensions, NavParams, QuestionOption, Screen, StudentProfile } from './types';
import { pickQuestion, Question } from './data/questions';
import { levelMeta } from './data/content';

export const SESSION_LENGTH = 4;
export const MIN_SESSIONS = 3;

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
  finishSession: (extraConfidence?: number) => 'ready' | 'more';
  startNextSession: () => void;

  completedActivities: string[]; completeActivity: (id: string) => void;
  videoFeedback: Record<string, number>; rateVideo: (id: string, rating: number) => void;
  savedCareers: string[]; toggleCareer: (id: string) => void;
  savedDegrees: string[]; toggleDegree: (id: string) => void;
  exploredClusters: string[]; exploreCluster: (id: string) => void;
  factIndex: number; nextFact: () => void;
}

const Ctx = createContext<AppCtx | null>(null);
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

  const setLevel = (l: EducationLevel) => { setLevelState(l); setProfile(p => ({ ...p, educationLevel: l, currentClass: '', studyGroup: '', favouriteSubjects: [], difficultSubjects: [], subjectMarks: {}, futureFields: [], futureIdeas: '', activities: [] })); };
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
  };

  const currentQuestion = useMemo(() => pickQuestion({ askedIds, tags, evidence, dims }), [askedIds, tags, evidence, dims]);

  const answerQuestion = (q: Question, opt: QuestionOption | null) => {
    setAskedIds(a => [...a, q.id]);
    setQA(n => n + 1);
    setSessionAnswered(n => n + 1);
    if (opt) {
      if (opt.tag) setTags(t => [...t, opt.tag!]);
      setDims(d => {
        const n = { ...d };
        for (const [k, v] of Object.entries(opt.effects) as [DimensionKey, number][]) n[k] = Math.min(96, n[k] + v);
        return n;
      });
      setEvidence(e => {
        const n = { ...e };
        for (const k of Object.keys(opt.effects) as DimensionKey[]) n[k] += 1;
        return n;
      });
    }
    setConfidence(c => Math.min(95, c + (opt ? 6 : 1)));
  };

  const finishSession = (extra = 0) => {
    const done = sessionsCompleted + 1;
    setSessions(done);
    setSessionAnswered(0);
    const ready = profileReady || (done >= MIN_SESSIONS && confidence + extra >= 60);
    setReady(ready);
    const result = done < MIN_SESSIONS ? 'none' : ready ? 'ready' : 'more';
    setLastCheck(result);
    return ready ? 'ready' : 'more';
  };
  const startNextSession = () => setSessionAnswered(0);

  const completeActivity = (id: string) => {
    setActs(a => (a.includes(id) ? a : [...a, id]));
    setConfidence(c => Math.min(95, c + 3));
    setDims(d => ({ ...d, analyticalThinking: Math.min(96, d.analyticalThinking + 2), creativity: Math.min(96, d.creativity + 1) }));
  };
  const rateVideo = (id: string, rating: number) => {
    setVF(v => ({ ...v, [id]: rating }));
    setConfidence(c => Math.min(95, c + 1));
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
    signUp, logIn, googleLogin, logout,
    dims, topDims, questionsAnswered, profileConfidence: confidence, sessionsCompleted, sessionAnswered,
    currentSession: sessionsCompleted + 1, profileReady, lastReadyCheck, currentQuestion, answerQuestion, finishSession, startNextSession,
    completedActivities, completeActivity, videoFeedback, rateVideo,
    savedCareers, toggleCareer: toggle(setSC), savedDegrees, toggleDegree: toggle(setSD), exploredClusters, exploreCluster,
    factIndex, nextFact: () => setFact(i => i + 1),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
