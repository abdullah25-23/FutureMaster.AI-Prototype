import { useState } from 'react';
import { Screen } from '../types';

const C = {
  bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A',
  border: '#2D3548', text: '#FFFFFF', sub: '#A0AEC0',
  muted: '#6B7280', cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
};

export default function LoginScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: C.bg }}>
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #131827 60%, #1A1E2E 100%)',
        paddingTop: '56px', paddingBottom: '28px',
        borderRadius: '0 0 28px 28px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '18px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(99,102,241,0.5)',
        }}>
          <svg width="28" height="28" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <circle cx="26" cy="26" r="3" fill="white"/>
            <path d="M26 6 L30 20 L26 23 L22 20 Z" fill="rgba(255,255,255,0.95)"/>
            <path d="M46 26 L32 22 L29 26 L32 30 Z" fill="rgba(255,255,255,0.5)"/>
            <path d="M26 46 L22 32 L26 29 L30 32 Z" fill="rgba(255,255,255,0.5)"/>
            <path d="M6 26 L20 30 L23 26 L20 22 Z" fill="rgba(255,255,255,0.5)"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: 700, color: C.text, margin: 0 }}>
          FutureMaster <span style={{ color: C.cyan, textShadow: '0 0 16px rgba(0,210,255,0.5)' }}>AI</span>
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: C.sub, margin: 0 }}>
          Welcome back — sign in to continue
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-6 py-5 flex flex-col gap-4">
        <div>
          <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '7px', textTransform: 'uppercase' }}>
            Email Address
          </label>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: C.card, borderRadius: '12px',
            border: `1.5px solid ${C.border}`,
            padding: '0 14px', height: '50px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="student@example.com"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Inter', fontSize: '14px', color: C.text }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: C.muted, letterSpacing: '0.8px', display: 'block', marginBottom: '7px', textTransform: 'uppercase' }}>
            Password
          </label>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: C.card, borderRadius: '12px',
            border: `1.5px solid ${C.border}`,
            padding: '0 14px', height: '50px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <input
              type={showPass ? 'text' : 'password'} value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Inter', fontSize: '14px', color: C.text }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
                {showPass
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <button style={{ fontFamily: 'Inter', fontSize: '12px', color: C.cyan, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('education')}
          style={{
            width: '100%', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            color: 'white', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600,
            border: 'none', cursor: 'pointer', marginTop: '4px',
            boxShadow: '0 0 24px rgba(99,102,241,0.45), 0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          Sign In
        </button>

        <div className="flex items-center gap-3">
          <div style={{ flex: 1, height: '1px', background: C.border }} />
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: C.muted }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: C.border }} />
        </div>

        <button
          onClick={() => navigate('education')}
          style={{
            width: '100%', height: '50px', borderRadius: '14px',
            background: C.card, border: `1.5px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            cursor: 'pointer',
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
          Don't have an account?{' '}
          <button onClick={() => navigate('signup')} style={{ color: C.cyan, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}
