import { Ico } from '../components/Icon';
import { useState } from 'react';
import { useApp } from '../state';
import { C, Card, Screen } from '../components/ui';
import { notificationItems } from '../data/content';

export default function NotificationsScreen() {
  const { nav } = useApp();
  const [read, setRead] = useState<string[]>(notificationItems.filter(n => !n.unread).map(n => n.id));
  const unread = notificationItems.filter(n => !read.includes(n.id)).length;
  return (
    <Screen title="Notifications" subtitle={unread ? `${unread} unread` : 'All caught up'}
      right={<button className="pressable" disabled={!unread} onClick={() => setRead(notificationItems.map(n => n.id))} style={{ background: 'none', border: 'none', color: unread ? C.cyan : C.muted, fontSize: 12, fontWeight: 600, cursor: unread ? 'pointer' : 'default', minHeight: 44 }}>Mark all read</button>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notificationItems.map((n, i) => {
          const isUnread = !read.includes(n.id);
          return (
            <div key={n.id} className="stagger" style={{ ['--i' as string]: i }}>
              <Card onClick={() => { setRead(r => (r.includes(n.id) ? r : [...r, n.id])); nav(n.screen); }} style={{ padding: 14 }}>
                <div className="flex items-start" style={{ gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.indigo, flexShrink: 0 }}><Ico e={n.icon} size={18} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center justify-between" style={{ gap: 8 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: isUnread ? 700 : 600 }}>{n.title}</p>
                      {isUnread && <span aria-label="Unread" style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan, boxShadow: '0 0 6px rgba(0,210,255,0.8)', flexShrink: 0 }} />}
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: C.sub, lineHeight: 1.45 }}>{n.body}</p>
                    <p style={{ margin: '5px 0 0', fontSize: 11, color: C.muted }}>{n.time}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
