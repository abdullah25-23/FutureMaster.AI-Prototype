import { useState } from 'react';
import { useApp, SESSION_LENGTH, MIN_SESSIONS } from '../state';
import { C, Card, Screen } from '../components/ui';
import { QuestionOption } from '../types';

const unsure: QuestionOption = { id: 'unsure', label: "I'm not sure yet", effects: {} };

export default function AssessmentScreen() {
  const { currentQuestion, currentSession, sessionAnswered, answerQuestion, finishSession, loadNav, back, level } = useApp();
  const [picked, setPicked] = useState<string | null>(null);
  const { question: q, note } = currentQuestion;
  const additional = currentSession > MIN_SESSIONS;

  function choose(opt: QuestionOption) {
    if (picked) return;
    setPicked(opt.id);
    setTimeout(() => {
      const real = opt.id === 'unsure' ? null : opt;
      answerQuestion(q, real);
      if (sessionAnswered + 1 >= SESSION_LENGTH) {
        finishSession(real ? 6 : 1);
        loadNav('Updating your interest profile...', 'session-result');
      }
      setPicked(null);
    }, 380);
  }

  return (
    <Screen title={additional ? 'Additional Exploration' : `Exploration Session ${currentSession}`}
      subtitle={additional ? `Session ${currentSession} · a few areas to clarify` : `Question ${sessionAnswered + 1}`} onBack={back}>
      <div className="flex" style={{ gap: 6, marginBottom: 18 }} aria-label={`Question ${sessionAnswered + 1} of this session`}>
        {Array.from({ length: SESSION_LENGTH }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= sessionAnswered ? 'linear-gradient(90deg,#6366F1,#00D2FF)' : C.border, transition: 'background .4s' }} />
        ))}
      </div>
      <div key={q.id} className="pop-in">
        {note && (
          <div style={{ marginBottom: 14, padding: '10px 12px', borderRadius: 12, background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.25)', fontSize: 12, lineHeight: 1.5, color: C.sub }}>
            <span style={{ color: C.cyan, fontWeight: 700 }}>✦ Adapting to you · </span>{note}
          </div>
        )}
        <Card style={{ padding: 20, marginBottom: 16, background: 'linear-gradient(145deg,#1C1F2E,#202545)' }}>
          <div className="flex items-center" style={{ gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{q.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.cyan, textTransform: 'uppercase', letterSpacing: 0.8 }}>{q.scenario}</span>
          </div>
          <h2 style={{ margin: 0, fontSize: level === 'beginner' ? 19 : 18, lineHeight: 1.4 }}>{q.prompt}</h2>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...q.options, unsure].map(o => {
            const on = picked === o.id;
            return (
              <button key={o.id} className="pressable" onClick={() => choose(o)} style={{
                width: '100%', minHeight: 54, padding: '12px 16px', borderRadius: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
                color: on ? C.text : o.id === 'unsure' ? C.muted : C.sub, border: `1px solid ${on ? C.cyan : C.border}`,
                background: on ? 'rgba(0,210,255,0.14)' : C.card, boxShadow: on ? '0 0 16px rgba(0,210,255,0.25)' : 'none', transition: 'all .2s',
              }}>{on && <span style={{ color: C.cyan, marginRight: 8 }}>✓</span>}{o.label}</button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
