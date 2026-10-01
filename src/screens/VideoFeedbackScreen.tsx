import { useApp } from '../state';
import { ratingLabels, videos } from '../data/videos';
import { Btn, C, Card, Screen } from '../components/ui';

export default function VideoFeedbackScreen() {
  const { params, videoFeedback, rateVideo, nav, back } = useApp();
  const video = videos.find(v => v.id === params.videoId);

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
  const rating = videoFeedback[video.id];

  return (
    <Screen title="Your Feedback" subtitle={video.title} onBack={back}>
      <h2 style={{ margin: '4px 0 16px', fontSize: 20, lineHeight: 1.35 }}>How interesting was this to you?</h2>
      <div className="flex flex-col" style={{ gap: 10 }}>
        {[1, 2, 3, 4].map(n => (
          <Card key={n} onClick={() => rateVideo(video.id, n)} selected={rating === n}
            style={{ minHeight: 56, background: rating === n ? 'rgba(0,210,255,0.08)' : C.card }}>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14 }}>{ratingLabels[n]}</span>
              {rating === n && <span style={{ color: C.cyan, fontWeight: 700 }}>✓</span>}
            </div>
          </Card>
        ))}
      </div>
      {rating && (
        <div className="fade-down flex flex-col" style={{ gap: 10, marginTop: 20 }}>
          <Btn onClick={() => video.clusterId ? nav('career-list', { clusterId: video.clusterId }) : nav('clusters')}>Tell Me More</Btn>
          <Btn variant="ghost" onClick={back}>Show Me Something Different</Btn>
        </div>
      )}
      <p style={{ margin: '16px 0 0', fontSize: 12, color: C.muted, lineHeight: 1.5 }}>Your feedback is a small signal that helps refine suggestions.</p>
    </Screen>
  );
}
