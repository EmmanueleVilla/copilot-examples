import { useState } from 'react'

export default function ApodFetcher() {
  const [apiKey, setApiKey] = useState('')
  const [apodData, setApodData] = useState(null)
  const [apodStatus, setApodStatus] = useState({ state: 'idle', message: 'Enter your NASA API key and fetch.' })

  const handleApodFetch = async (event) => {
    event.preventDefault()
    
  }

  return (
    <section id="apod" className="card">
      <header className="card-header">
        <p className="eyebrow">Agentic coding</p>
        <h2 className="card-title">NASA APOD (Astronomy Picture of the Day)</h2>
        <p className="card-subhead">
          Task più complicato, che richiede più passaggi
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
