import { Ico } from '../components/Icon';
import { useState } from 'react';
import { useApp } from '../state';
import { Bar, Btn, Card, C, Pill, Screen, SectionTitle } from '../components/ui';
import { careerAlignment, careerById, clusters, fitColor, fitLabel, readinessColor, readinessFor } from '../data/careers';

export default function CareerListScreen() {
  const { params, nav, profile, level, dims, profileReady } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const cluster = clusters.find(c => c.id === params.clusterId) ?? clusters[0];
  const list = cluster.careerIds.map(careerById).filter((c): c is NonNullable<typeof c> => !!c);
  const lv = level ?? 'beginner';

  return (
    <Screen title={cluster.name}>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{cluster.blurb}</p>
      <SectionTitle>Careers Worth Exploring</SectionTitle>
      {list.map((c, i) => {
        const score = careerAlignment(c, dims);
        const fit = fitLabel(score);
        const r = readinessFor(c, profile, lv);
        return (
          <div key={c.id} className="stagger" style={{ '--i': i, marginBottom: 12 } as React.CSSProperties}>
            <Card selected={sel === c.id} accent={cluster.color} onClick={() => setSel(c.id)}>
              <div className="flex items-center" style={{ gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${cluster.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cluster.color }}><Ico e={c.icon} size={22} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, fontFamily: 'Poppins' }}>{c.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.45 }}>{c.blurb}</p>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Interest alignment</span>
                  {profileReady ? <Pill text={`${fit} fit`} color={fitColor(fit)} /> : <span style={{ fontSize: 11, color: C.muted }}>Explore to see alignment</span>}
                </div>
                {profileReady && <Bar value={score} color={fitColor(fit)} delay={i * 80} />}
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Academic readiness</span>
                  <Pill text={r.readiness} color={readinessColor(r.readiness)} />
                </div>
                <p style={{ margin: 0, fontSize: 12, color: C.sub, lineHeight: 1.45 }}>{r.summary}</p>
              </div>

              <p style={{ margin: '12px 0', fontSize: 12, color: C.sub, lineHeight: 1.45, paddingLeft: 10, borderLeft: `2px solid ${cluster.color}` }}>
                <span style={{ color: C.success }}>✓ </span>{c.reasons[0]}
              </p>
              <Btn small onClick={() => nav('why-career', { clusterId: cluster.id, careerId: c.id })}>Explore {c.name}</Btn>
            </Card>
          </div>
        );
      })}
    </Screen>
  );
}
