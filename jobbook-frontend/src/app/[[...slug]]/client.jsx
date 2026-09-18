'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const App = dynamic(() => import('../../App'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#090d16',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#6366f1' }}>JobBook</h2>
        <p style={{ color: '#94a3b8', marginTop: '8px' }}>Initializing platform...</p>
      </div>
    </div>
  ),
});

export default function ClientOnlyApp() {
  return <App />;
}
