import { useState } from 'react'

// COMPLETION
function validateEmail(email) {
}

export default function EmailValidator() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: 'Awaiting validation.' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = validateEmail(email)

    if (result === true) {
      setStatus({ state: 'success', message: 'Email looks valid.' })
    } else if (result === false) {
      setStatus({ state: 'error', message: 'Email is invalid.' })
    } else {
      setStatus({ state: 'pending', message: 'Implement validateEmail to run regex validation.' })
    }
  }

  return (
    <section id="completions" className="card">
      <header className="card-header">
        <p className="eyebrow">Example: completion</p>
        <h2 className="card-title">Regex email validation form to be implemented</h2>
      </header>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
          required
        />

        <div className="button-row">
          <button type="submit" className="button">
            Validate
          </button>
        </div>

        <p className={`status status-${status.state}`}>
          {status.message}
        </p>
      </form>
    </section>
  )
}
