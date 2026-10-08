import { Ico } from '../components/Icon';
import { useState } from 'react';
import { useApp } from '../state';
import { Btn, Card, C, Chip, Modal, Pill, Screen } from '../components/ui';
import { relatedVideoForDegree } from '../data/videos';
import { careerById, Degree, degreeCategories, degrees } from '../data/careers';

export default function DegreeExplorerScreen() {
  const { savedDegrees, toggleDegree, nav } = useApp();
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState<Degree | null>(null);
  const list = degrees.filter(d => cat === 'All' || d.category === cat);
  const names = (d: Degree) => d.careers.map(careerById).filter((c): c is NonNullable<typeof c> => !!c);

  const saveBtn = (d: Degree, flex?: boolean) => {
    const s = savedDegrees.includes(d.id);
    return (
      <button className="pressable" onClick={e => { e.stopPropagation(); toggleDegree(d.id); }} aria-pressed={s} style={{ flex: flex ? 1 : undefined, minHeight: 44, padding: '0 16px', borderRadius: 12, cursor: 'pointer', background: s ? 'rgba(0,210,255,0.12)' : 'transparent', border: `1px solid ${s ? C.cyan : C.border}`, color: s ? C.cyan : C.text, fontWeight: 600, fontSize: 13 }}>
        <Ico e="Star" size={14} style={{ marginRight: 4, verticalAlign: 'middle', fill: s ? 'currentColor' : 'none' }} />{s ? 'Saved' : 'Save'}
      </button>
    );
  };

  return (
    <Screen title="Degree Explorer" subtitle="Degree routes worth exploring">
      <div className="flex" style={{ gap: 8, overflowX: 'auto', paddingBottom: 12, margin: '0 -16px', padding: '0 16px 12px' }}>
        {['All', ...degreeCategories].map(c => <div key={c} style={{ flexShrink: 0 }}><Chip label={c} selected={cat === c} onClick={() => setCat(c)} /></div>)}
      </div>

      {list.map((d, i) => (
        <div key={d.id} className="stagger" style={{ '--i': Math.min(i, 8), marginBottom: 12 } as React.CSSProperties}>
          <Card>
            <div className="flex items-start justify-between" style={{ gap: 8 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, fontFamily: 'Poppins' }}>{d.name}</p>
              <Pill text={d.category} />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{d.description}</p>
            <p style={{ margin: '8px 0 0', fontSize: 12 }}><span style={{ color: C.muted }}>Related subjects: </span>{d.subjects.join(', ')}</p>
            <p style={{ margin: '4px 0 0', fontSize: 12 }}><span style={{ color: C.muted }}>Related careers: </span>{names(d).slice(0, 3).map(c => c.name).join(', ')}</p>
            <p style={{ margin: '8px 0 12px', fontSize: 12, color: C.cyan, lineHeight: 1.45 }}>Pathway relevance: {d.relevance}</p>
            {(() => { const rv = relatedVideoForDegree(d.id); return rv ? (
              <button className="pressable" onClick={() => nav('videos', { videoId: rv.id })} style={{ display: 'block', width: '100%', textAlign: 'left', margin: '0 0 12px', padding: 0, background: 'none', border: 'none', cursor: 'pointer', color: C.sub, fontSize: 12, minHeight: 32 }}>
                <span style={{ color: C.muted }}>Related video: </span><span style={{ color: C.text }}><Ico e="Play" size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />{rv.title}</span>
              </button>) : null; })()}
            <div className="flex" style={{ gap: 8 }}>
              <div style={{ flex: 1 }}><Btn small onClick={() => setOpen(d)}>Explore</Btn></div>
              {saveBtn(d)}
            </div>
          </Card>
        </div>
      ))}

      {open && (
        <Modal onClose={() => setOpen(null)}>
          <div style={{ maxHeight: 560, overflowY: 'auto' }}>
            <Pill text={open.category} />
            <h3 style={{ margin: '10px 0 6px', fontSize: 18 }}>{open.name}</h3>
            <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.55 }}>{open.description}</p>
            <p style={{ margin: '12px 0 4px', fontSize: 12, fontWeight: 600 }}>Related subjects</p>
            <div className="flex flex-wrap" style={{ gap: 6 }}>{open.subjects.map(s => <Pill key={s} text={s} color={C.sub} />)}</div>
            <p style={{ margin: '12px 0 6px', fontSize: 12, fontWeight: 600 }}>Related careers</p>
            {names(open).map(c => (
              <button key={c.id} className="pressable" onClick={() => { setOpen(null); nav('why-career', { clusterId: c.clusterId, careerId: c.id }); }} style={{ display: 'block', width: '100%', textAlign: 'left', minHeight: 44, padding: '8px 12px', marginBottom: 6, borderRadius: 12, background: C.elevated, border: `1px solid ${C.border}`, color: C.text, fontSize: 13, cursor: 'pointer' }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Ico e={c.icon} size={16} color={C.cyan} />{c.name}</span> <span style={{ color: C.cyan, float: 'right' }}>→</span></button>
            ))}
            <p style={{ margin: '10px 0 14px', fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{open.relevance} Always check current entry requirements with each institution.</p>
            <div className="flex" style={{ gap: 8 }}>
              <div style={{ flex: 1 }}><Btn small variant="ghost" onClick={() => setOpen(null)}>Close</Btn></div>
              {saveBtn(open, true)}
            </div>
          </div>
        </Modal>
      )}
    </Screen>
  );
}
