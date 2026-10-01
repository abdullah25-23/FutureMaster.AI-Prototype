import { useState } from 'react';
import { useApp } from '../state';
import { Btn, BrandNameTitle, C, Input } from '../components/ui';
import { GoogleG, lab } from './LoginScreen';

export default function SignupScreen() {
  const { back, go, signUp, googleLogin } = useApp();
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setErr(''); };

  function submit() {
    if (f.name.trim().length < 2) return setErr('Please enter your full name.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Please enter a valid email address.');
    if (f.password.length < 6) return setErr('Password must be at least 6 characters.');
    if (f.password !== f.confirm) return setErr('Passwords do not match.');
    signUp(f.name, f.email); go('level');
  }
  const s = (i: number) => ({ '--i': i } as React.CSSProperties);
  const fields: Array<[keyof typeof f, string, string, string]> = [
    ['name', 'Full Name', 'text', 'Your full name'], ['email', 'Email', 'email', 'you@example.com'],
    ['password', 'Password', 'password', 'At least 6 characters'], ['confirm', 'Confirm Password', 'password', 'Repeat your password'],
  ];
  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div className="flex-1 mobile-scroll" style={{ padding: '60px 24px 36px' }}>
        <div className="fade-down" style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}><BrandNameTitle width={220} /></div>
        <div className="stagger" style={s(0)}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Create Account</h1>
          <p style={{ margin: '4px 0 18px', fontSize: 14, color: C.sub }}>Start discovering what interests you</p>
        </div>
        {fields.map(([k, label, type, ph], i) => (
          <div key={k} className="stagger" style={{ ...s(i + 1), marginBottom: 12 }}>
            <label style={lab}>{label}</label><Input type={type} value={f[k]} onChange={set(k)} placeholder={ph} autoComplete={k === 'name' ? 'name' : k === 'email' ? 'email' : 'new-password'} />
          </div>
        ))}
        {err && <p role="alert" style={{ color: C.error, fontSize: 12, margin: '0 0 10px' }}>{err}</p>}
        <div className="stagger" style={{ ...s(5), marginTop: 6 }}><Btn onClick={submit}>Create Account</Btn></div>
        <div className="stagger" style={{ ...s(6), marginTop: 12 }}>
          <Btn variant="ghost" onClick={() => { googleLogin(); go('level'); }}><span className="flex items-center justify-center" style={{ gap: 10 }}><GoogleG />Continue with Google</span></Btn>
        </div>
        <p className="stagger" style={{ ...s(7), textAlign: 'center', fontSize: 14, color: C.sub, marginTop: 18 }}>
          Already have an account? <button onClick={back} style={{ background: 'none', border: 'none', color: C.cyan, fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 40 }}>Sign In</button>
        </p>
      </div>
    </div>
  );
}
