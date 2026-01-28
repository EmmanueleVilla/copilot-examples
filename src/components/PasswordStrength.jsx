import { useState } from 'react'

// Documentation generation example
function checkPasswordStrength(password) {
  if (!password) return { score: 0, label: 'No password', color: '#64748b' }
  
  let score = 0
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  }
  
  if (checks.length) score++
  if (checks.uppercase) score++
  if (checks.lowercase) score++
  if (checks.numbers) score++
  if (checks.special) score++
  
  if (score <= 2) return { score, label: 'Weak', color: '#ef4444', checks }
  if (score === 3) return { score, label: 'Fair', color: '#f59e0b', checks }
  if (score === 4) return { score, label: 'Good', color: '#3b82f6', checks }
  return { score, label: 'Strong', color: '#10b981', checks }
}

export default function PasswordStrength() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState(null)



  return (
    <section id="password" className="card">
      <header className="card-header">
        <p className="eyebrow">Example: documentation</p>
        <h2 className="card-title">Password strength checker</h2>
        <p className="card-subhead">
          Code that needs documentation and JSDoc comments
        </p>
      </header>

      <div className="form">
        <label className="label" htmlFor="password-input">
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="password-input"
            name="password-input"
            type={showPassword ? 'text' : 'password'}
            className="input"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (event.target.value) {
                setResult(checkPasswordStrength(event.target.value))
              } else {
                setResult(null)
              }
            }}
            placeholder="Enter a password"
            autoComplete="off"
            style={{ paddingRight: '100px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '4px 8px'
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

      </div>

      {result && (
        <div className="password-result" role="region" aria-label="Password strength result" style={{ marginTop: '16px' }}>
          <div 
            className="strength-bar" 
            style={{
              height: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}
          >
            <div
              style={{
                width: `${(result.score / 5) * 100}%`,
                height: '100%',
                background: result.color,
                transition: 'width 0.3s ease, background 0.3s ease'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: result.color }}>
              {result.label}
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>
              ({result.score}/5 criteria met)
            </span>
          </div>

          {result.checks && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '13px', color: result.checks.length ? '#10b981' : '#ef4444' }}>
                {result.checks.length ? '✓' : '✗'} At least 8 characters
              </div>
              <div style={{ fontSize: '13px', color: result.checks.uppercase ? '#10b981' : '#ef4444' }}>
                {result.checks.uppercase ? '✓' : '✗'} Contains uppercase letter
              </div>
              <div style={{ fontSize: '13px', color: result.checks.lowercase ? '#10b981' : '#ef4444' }}>
                {result.checks.lowercase ? '✓' : '✗'} Contains lowercase letter
              </div>
              <div style={{ fontSize: '13px', color: result.checks.numbers ? '#10b981' : '#ef4444' }}>
                {result.checks.numbers ? '✓' : '✗'} Contains number
              </div>
              <div style={{ fontSize: '13px', color: result.checks.special ? '#10b981' : '#ef4444' }}>
                {result.checks.special ? '✓' : '✗'} Contains special character
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
