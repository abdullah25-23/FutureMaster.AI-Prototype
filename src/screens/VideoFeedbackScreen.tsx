import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useApp } from '../state';
import { ratingLabels, videos, videosForLevel } from '../data/videos';
import { Btn, C, Card, Screen } from '../components/ui';

export default function VideoFeedbackScreen() {
  const { params, videoFeedback, rateVideo, nav, back, level, dims } = useApp();
  const video = videos.find(v => v.id === params.videoId);
  const [hover, setHover] = useState(0);

  if (!video) {
    return (
      <Screen title="Feedback" onBack={back}>
        <Card style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', color: C.sub }}>We could not find this video.</p>
          <Btn onClick={back}>Back</Btn>
        </Card>
      </Screen>
    );
  }
  const rating = videoFeedback[video.id] ?? 0;
  const shown = hover || rating;

  const different = () => {
    const s = videosForLevel(level, dims);
    const other = [...s.related, ...s.new, ...s.interests].find(v => v.id !== video.id && !videoFeedback[v.id]);
    nav('videos', other ? { videoId: other.id } : {});
  };

  return (
    <Screen noBack title="" footer={!rating ? <Btn variant="ghost" small onClick={back}>Skip for now</Btn> : undefined}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
        <button onClick={back} aria-label="Close" className="pressable" style={{ width: 44, height: 44, borderRadius: 14, border: `1px solid ${C.border}`, background: C.elevated, color: C.sub, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
      </div>
      <p style={{ margin: '0 0 6px', fontSize: 12, color: C.muted }}>{video.title}</p>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, lineHeight: 1.35 }}>How interested are you in this career or field after watching?</h2>
      <div role="radiogroup" aria-label="Interest rating" style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}: ${ratingLabels[n]}`} className="pressable"
            onClick={() => rateVideo(video.id, n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
            style={{ width: 52, height: 52, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={38} strokeWidth={1.6} color={n <= shown ? C.warning : C.muted} fill={n <= shown ? C.warning : 'none'} />
          </button>
        ))}
      </div>
      <p aria-live="polite" style={{ margin: '12px 0 0', minHeight: 22, textAlign: 'center', fontSize: 15, fontWeight: 600, color: shown ? C.cyan : C.muted }}>{shown ? `${shown} · ${ratingLabels[shown]}` : 'Tap a star to rate'}</p>
      {rating > 0 && (
        <div className="fade-down flex flex-col" style={{ gap: 10, marginTop: 28 }}>
          <Btn onClick={() => video.clusterId ? nav('career-list', { clusterId: video.clusterId }) : nav('clusters')}>Tell Me More</Btn>
          <Btn variant="ghost" onClick={different}>Show Me Something Different</Btn>
        </div>
      )}
      <p style={{ margin: '20px 0 0', fontSize: 12, color: C.muted, lineHeight: 1.5, textAlign: 'center' }}>Your rating is only a small signal. Skipping records nothing.</p>
    </Screen>
  );
}
