import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #050709 0%, #0D1117 50%, #0A0D16 100%)' }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '44px',
          background: '#0D1117',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.15), 0 0 60px rgba(99,102,241,0.06)',
          flexShrink: 0,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{ width: '126px', height: '37px', background: '#0D1117', borderRadius: '0 0 20px 20px' }}
        />
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-3"
          style={{ height: '44px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: 'white' }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
              <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.35"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
              <rect x="9" y="0" width="3" height="12" rx="1" opacity="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <path d="M8 2.4C5.6 2.4 3.5 3.4 2 5L0 3C2 1.1 4.9 0 8 0s6 1.1 8 3l-2 2c-1.5-1.6-3.6-2.6-6-2.6z" opacity="0.4"/>
              <path d="M8 5.6C6.5 5.6 5.2 6.2 4.2 7.2L2.2 5.2C3.7 3.8 5.7 3 8 3s4.3.8 5.8 2.2l-2 2C10.8 6.2 9.5 5.6 8 5.6z" opacity="0.6"/>
              <path d="M8 8.8c-.9 0-1.7.4-2.3.9L8 12l2.3-2.3c-.6-.5-1.4-.9-2.3-.9z"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.3"/>
              <rect x="2" y="2" width="16" height="8" rx="2" fill="white"/>
              <path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '44px' }}>
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50"
          style={{ width: '134px', height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}
