import { useState } from 'react';
import { useApp } from '../state';
import { Btn, BrandNameTitle, C, Input, Modal } from '../components/ui';

export const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" /></svg>
);

export default function LoginScreen() {
  const { nav, go, logIn, googleLogin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [err, setErr] = useState('');

  function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Please enter a valid email address.');
    if (password.length < 4) return setErr('Please enter your password.');
    logIn(email); go('level');
  }
  const s = (i: number) => ({ '--i': i } as React.CSSProperties);

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: C.bg }}>
      <div className="flex-1 mobile-scroll" style={{ padding: '64px 24px 36px' }}>
        <div className="fade-down" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <BrandNameTitle width={240} />
        </div>
        <div className="stagger" style={s(0)}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Welcome back</h1>
          <p style={{ margin: '4px 0 22px', fontSize: 14, color: C.sub }}>Sign in to continue your exploration</p>
        </div>
        <div className="stagger" style={s(1)}><label style={lab}>Email</label><Input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(''); }} placeholder="you@example.com" autoComplete="email" /></div>
        <div className="stagger" style={{ ...s(2), marginTop: 14, position: 'relative' }}>
          <label style={lab}>Password</label>
          <Input type={show ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setErr(''); }} placeholder="Your password" autoComplete="current-password" style={{ paddingRight: 56 }} />
          <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: 6, bottom: 2, height: 44, padding: '0 10px', background: 'none', border: 'none', color: C.cyan, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{show ? 'Hide' : 'Show'}</button>
        </div>
        <div className="stagger" style={{ ...s(3), textAlign: 'right', marginTop: 4 }}>
          <button onClick={() => setForgot(true)} style={{ background: 'none', border: 'none', color: C.cyan, fontSize: 13, cursor: 'pointer', minHeight: 40 }}>Forgot Password?</button>
        </div>
        {err && <p role="alert" style={{ color: C.error, fontSize: 12, margin: '0 0 10px' }}>{err}</p>}
        <div className="stagger" style={s(4)}><Btn onClick={submit}>Sign In</Btn></div>
        <div className="stagger flex items-center" style={{ ...s(5), gap: 12, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontSize: 12, color: C.muted }}>or</span><div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div className="stagger" style={s(6)}>
          <Btn variant="ghost" onClick={() => { googleLogin(); go('level'); }}><span className="flex items-center justify-center" style={{ gap: 10 }}><GoogleG />Continue with Google</span></Btn>
        </div>
        <p className="stagger" style={{ ...s(7), textAlign: 'center', fontSize: 14, color: C.sub, marginTop: 22 }}>
          New here? <button onClick={() => nav('signup')} style={{ background: 'none', border: 'none', color: C.cyan, fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 40 }}>Create Account</button>
        </p>
      </div>
      {forgot && (
        <Modal onClose={() => setForgot(false)}>
          <h3 style={{ margin: 0, fontSize: 17 }}>Reset your password</h3>
          <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.5, margin: '8px 0 16px' }}>In this prototype no email is sent. In the full app you will receive a reset link at {email || 'your email address'}.</p>
          <Btn small onClick={() => setForgot(false)}>Got it</Btn>
        </Modal>
      )}
    </div>
  );
}
export const lab: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: C.sub, marginBottom: 6 };
