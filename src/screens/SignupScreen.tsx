import { useState } from 'react';
import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', border: '#2D3548',
  text: '#FFFFFF', sub: '#A0AEC0', muted: '#6B7280',
  cyan: '#00D2FF', indigo: '#6366F1',
};

export default function SignupScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const Field = ({ label, placeholder, field, type = 'text' }: { label: string; placeholder: string; field: keyof typeof form; type?: string }) => (
    <div>
      <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '7px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type} value={form[field]}
        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
        placeholder={placeholder}
        style={{
          width: '100%', height: '50px', borderRadius: '12px',
          border: `1.5px solid ${C.border}`, background: C.card,
          padding: '0 14px', fontFamily: 'Inter', fontSize: '14px', color: C.text,
          outline: 'none', boxSizing: 'border-box',
        }}
      />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #131827 60%, #1A1E2E 100%)',
        padding: '52px 20px 20px',
        borderRadius: '0 0 28px 28px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button onClick={() => navigate('login')} style={{
          background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
          borderRadius: '10px', width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: '14px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: '0 0 4px 0' }}>
          Create Account
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.sub, margin: 0 }}>
          Join FutureMaster AI and discover your path
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-6 py-4 flex flex-col gap-3">
        <Field label="Full Name" placeholder="Alex Hassan" field="name" />
        <Field label="Email Address" placeholder="student@example.com" field="email" type="email" />
        <Field label="Password" placeholder="••••••••" field="password" type="password" />
        <Field label="Confirm Password" placeholder="••••••••" field="confirm" type="password" />

        <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted, lineHeight: '1.6', marginTop: '2px' }}>
          By creating an account, you agree to our{' '}
          <span style={{ color: C.cyan }}>Terms of Service</span> and{' '}
          <span style={{ color: C.cyan }}>Privacy Policy</span>.
        </p>

        <button
          onClick={() => navigate('education')}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(99,102,241,0.45)',
          }}
        >
          Create Account
        </button>

        <div className="flex items-center gap-3">
          <div style={{ flex: 1, height: '1px', background: C.border }} />
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted }}>or</span>
          <div style={{ flex: 1, height: '1px', background: C.border }} />
        </div>

        <button
          onClick={() => navigate('education')}
          style={{
            width: '100%', height: '50px', borderRadius: '14px',
            background: C.card, border: `1.5px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: C.text }}>Continue with Google</span>
        </button>

        <p style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: C.muted }}>
          Already have an account?{' '}
          <button onClick={() => navigate('login')} style={{ color: C.cyan, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
