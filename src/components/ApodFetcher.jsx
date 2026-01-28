import { useState } from 'react'

export default function ApodFetcher() {
  const [apiKey, setApiKey] = useState('')
  const [apodData, setApodData] = useState(null)
  const [apodStatus, setApodStatus] = useState({ state: 'idle', message: 'Enter your NASA API key and fetch.' })

  const handleApodFetch = async (event) => {
    event.preventDefault()
    const key = apiKey.trim() || 'DEMO_KEY'
    setApodStatus({ state: 'loading', message: key === 'DEMO_KEY' ? 'Using DEMO_KEY — may be rate-limited.' : 'Fetching APOD...' })
    setApodData(null)

    const controller = new AbortController()
    const timeoutMs = 8000
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(key)}`
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)

      if (!res.ok) {
        // try to parse structured error, fall back to text
        let details = ''
        try {
          const body = await res.json()
          if (body && (body.msg || body.message)) details = body.msg || body.message
          else details = JSON.stringify(body)
        } catch (e) {
          const txt = await res.text().catch(() => '')
          details = txt || ''
        }

        if (res.status === 429) throw new Error('Rate limit exceeded. Riprova più tardi.')
        if (res.status === 503) throw new Error('Servizio non disponibile (API outage).')
        throw new Error(`${res.status} ${res.statusText}${details ? ' - ' + details : ''}`)
      }

      let data = await res.json()
      if (Array.isArray(data)) data = data[0]

      if (!data || typeof data !== 'object' || (!data.url && !data.thumbnail_url && !data.hdurl)) {
        throw new Error('Unexpected API response')
      }

      setApodData(data)
      setApodStatus({ state: 'success', message: 'APOD caricato con successo.' })
    } catch (err) {
      if (err.name === 'AbortError') {
        setApodStatus({ state: 'error', message: `Richiesta scaduta dopo ${timeoutMs / 1000}s.` })
      } else {
        setApodStatus({ state: 'error', message: `Errore durante il fetch: ${err.message}` })
      }
      setApodData(null)
      clearTimeout(timeout)
    }
  }

  return (
    <section id="apod" className="card">
      <header className="card-header">
        <p className="eyebrow">Agentic coding</p>
        <h2 className="card-title">NASA APOD (Astronomy Picture of the Day)</h2>
        <p className="card-subhead">
          More complex task, which requires multiple steps
        </p>
      </header>

      <form className="form" onSubmit={handleApodFetch} noValidate>
        <label className="label" htmlFor="api-key">
          API Key
        </label>
        <input
          id="api-key"
          name="api-key"
          type="text"
          className="input"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          placeholder="Your NASA API key"
          autoComplete="off"
        />

        <div className="button-row">
          <button type="submit" className="button">
            Get
          </button>
        </div>

        <p className={`status status-${apodStatus.state}`}>
          {apodStatus.message}
        </p>
      </form>

      {apodData && (
        <div className="apod-result" role="region" aria-label="APOD result">
          <h3 className="apod-title">{apodData.title}</h3>
          <p className="apod-date">{apodData.date}</p>
          
          {apodData.media_type === 'image' && (
            <img
              src={apodData.url}
              alt={apodData.title}
              className="apod-image"
            />
          )}
          
          {apodData.media_type === 'video' && (
            <iframe
              src={apodData.url}
              title={apodData.title}
              className="apod-video"
              frameBorder="0"
              allowFullScreen
            />
          )}
          
          <p className="apod-explanation">{apodData.explanation}</p>
          
          {apodData.copyright && (
            <p className="apod-copyright">© {apodData.copyright}</p>
          )}
        </div>
      )}
    </section>
  )
}
