import React from 'react'

const AuthTest: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0c11',
      color: '#d6a242',
      fontSize: '24px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🎉 Auth Page Test</h1>
        <p>If you see this, React is rendering!</p>
        <p style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
          This is a test page to verify the app is working
        </p>
      </div>
    </div>
  )
}

export default AuthTest
