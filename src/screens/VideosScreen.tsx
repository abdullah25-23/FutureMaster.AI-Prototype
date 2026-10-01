import { useState } from 'react';
import { useApp } from '../state';
import { Video, videos, videoSections, ratingLabels } from '../data/videos';
import { Btn, C, Card, Modal, Pill, Screen, SectionTitle } from '../components/ui';

export default function VideosScreen() {
  const { videoFeedback, nav, back } = useApp();
  const [open, setOpen] = useState<Video | null>(null);

  return (
    <Screen title="Videos" subtitle="Short looks at different areas" onBack={back}>
      {videoSections.map(sec => (
        <div key={sec.key} style={{ marginBottom: 20 }}>
          <SectionTitle>{sec.title}</SectionTitle>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {videos.filter(v => v.section === sec.key).map((v, i) => {
              const r = videoFeedback[v.id];
              return (
                <div key={v.id} className="stagger" style={{ '--i': i } as React.CSSProperties}>
                  <Card onClick={() => setOpen(v)} style={{ padding: 12 }}>
                    <div className="flex items-center" style={{ gap: 12 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 14, background: 'linear-gradient(135deg,#4F46E5,#00D2FF55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{v.thumb}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, lineHeight: 1.35 }}>{v.title}</p>
                        <p style={{ margin: '2px 0 6px', fontSize: 12, color: C.sub }}>{v.area} · {v.duration}</p>
                        {r ? <Pill text={`✓ ${ratingLabels[r]}`} color={C.success} /> : <span style={{ fontSize: 12, color: C.cyan, fontWeight: 600 }}>▶ Watch</span>}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {open && (
        <Modal onClose={() => setOpen(null)}>
          <div style={{ height: 150, borderRadius: 16, background: 'linear-gradient(135deg,#4F46E5,#7C3AED 55%,#00D2FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 14 }}>
            <span style={{ position: 'absolute', top: 10, left: 12, fontSize: 28 }}>{open.thumb}</span>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#4F46E5"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 11, color: '#fff' }}>{open.duration}</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 16 }}>{open.title}</h3>
          <p style={{ margin: '4px 0 6px', fontSize: 12, color: C.cyan }}>{open.area}</p>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: C.sub, lineHeight: 1.5 }}>{open.description}</p>
          <Btn onClick={() => { const id = open.id; setOpen(null); nav('video-feedback', { videoId: id }); }}>Finish watching</Btn>
          <div style={{ height: 8 }} />
          <Btn variant="ghost" small onClick={() => setOpen(null)}>Close</Btn>
        </Modal>
      )}
    </Screen>
  );
}
