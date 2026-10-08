import { Ico } from '../components/Icon';
import { useState } from 'react';
import { useApp } from '../state';
import { Bar, Card, C, LockedBox, Pill, Screen, SectionTitle } from '../components/ui';
import { clusterFit, clusters, fitColor, fitLabel } from '../data/careers';
import { Cluster } from '../types';

export default function ClustersScreen() {
  const { level, profileReady, dims, loadNav, nav, exploreCluster, exploredClusters } = useApp();
  const [all, setAll] = useState(false);
  const title = level === 'advanced' ? 'Career Paths' : 'Explore Careers';

  const open = (c: Cluster) => { exploreCluster(c.id); loadNav('Finding career areas worth exploring...', 'career-list', { clusterId: c.id }); };
  const ranked = profileReady ? [...clusters].sort((a, b) => clusterFit(b, dims) - clusterFit(a, dims)) : clusters;
  const top = ranked.slice(0, 6);
  const rest = ranked.slice(6);

  const row = (c: Cluster, i: number, personal: boolean) => {
    const fit = clusterFit(c, dims);
    const label = fitLabel(fit);
    const col = fitColor(label);
    return (
      <div key={c.id} className="stagger" style={{ '--i': i, marginBottom: 10 } as React.CSSProperties}>
        <Card onClick={() => open(c)}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}><Ico e={c.icon} size={22} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between" style={{ gap: 8 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, fontFamily: 'Poppins' }}>{c.name}</p>
                {personal && <Pill text={`${label} fit`} color={col} />}
              </div>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.45 }}>{c.blurb}</p>
              {personal && <div style={{ marginTop: 8 }}><Bar value={fit} color={col} delay={i * 60} /></div>}
              {exploredClusters.includes(c.id) && <p style={{ margin: '6px 0 0', fontSize: 11, color: C.muted }}>Explored</p>}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <Screen title={title} subtitle={level === 'beginner' ? 'Areas you might enjoy' : undefined}>
      {profileReady ? (
        <>
          <SectionTitle>Strongest areas first</SectionTitle>
          {top.map((c, i) => row(c, i, true))}
          {rest.length > 0 && (
            <>
              <div style={{ marginTop: 18 }}><SectionTitle>More areas to browse</SectionTitle></div>
              {(all ? rest : []).map((c, i) => row(c, i, true))}
              {!all && <button className="pressable" onClick={() => setAll(true)} style={showBtn}>Show all areas ({rest.length} more)</button>}
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}><LockedBox onCta={() => nav('assessment')} /></div>
          <SectionTitle>Browse Career Areas</SectionTitle>
          <p style={{ margin: '-4px 0 12px', fontSize: 12, color: C.sub }}>A general list. Personalized results appear after more exploration.</p>
          {(all ? clusters : clusters.slice(0, 6)).map((c, i) => row(c, i, false))}
          {!all && <button className="pressable" onClick={() => setAll(true)} style={showBtn}>Show all areas</button>}
        </>
      )}
    </Screen>
  );
}

const showBtn: React.CSSProperties = { width: '100%', minHeight: 46, borderRadius: 14, background: 'none', border: `1px dashed ${C.border}`, color: C.cyan, fontWeight: 600, fontSize: 13, cursor: 'pointer' };
