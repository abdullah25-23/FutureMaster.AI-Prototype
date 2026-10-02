import { useState } from 'react';
import { useApp } from '../state';
import { Btn, BrandSymbol, C, Card, Screen } from '../components/ui';
import { levelMeta } from '../data/content';
import { EducationLevel } from '../types';

const order: EducationLevel[] = ['beginner', 'intermediate', 'advanced'];

export default function LevelScreen() {
  const { setLevel, nav } = useApp();
  const [sel, setSel] = useState<EducationLevel | null>(null);
  return (
    <Screen footer={<Btn disabled={!sel} onClick={() => { setLevel(sel!); nav('setup'); }}>Continue</Btn>}>
      <div style={{ paddingTop: 44 }}>
        <div className="fade-down" style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}><BrandSymbol height={52} /></div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, textAlign: 'center' }}>Select Your Current Education Stage</h1>
        <p style={{ margin: '8px 8px 22px', fontSize: 14, color: C.sub, textAlign: 'center', lineHeight: 1.5 }}>Select the stage that matches your current class. FutureMaster AI will personalize your exploration and guidance accordingly.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {order.map((l, i) => {
            const m = levelMeta[l]; const on = sel === l;
            return (
              <div key={l} className="stagger" style={{ '--i': i } as React.CSSProperties}>
                <Card selected={on} accent={m.accent} onClick={() => setSel(l)} style={{ padding: 18 }}>
                  <div className="flex items-center" style={{ gap: 14 }}>
                    <div style={{ width: 54, height: 54, borderRadius: 16, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${m.accent}1A`, border: `1px solid ${m.accent}40`, flexShrink: 0 }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontFamily: 'Poppins', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 13, fontWeight: 600, color: m.accent }}>{m.classes}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 12, fontWeight: 600, color: C.text }}>{m.title}</p>
                    </div>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${on ? m.accent : C.border}`, background: on ? m.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D1117', fontSize: 13, fontWeight: 800, transition: 'all .2s' }}>{on && '✓'}</div>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{m.desc}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
