import { useState } from 'react'
import './App.css'

// COMPLETION
function validateEmail(email) {
}

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: 'Awaiting validation.' })
  const [csvInput, setCsvInput] = useState('name,email\nAda Lovelace,ada@example.com\nAlan Turing,alan@bletchley.uk')
  const [tableData, setTableData] = useState([])
  const [csvStatus, setCsvStatus] = useState({ state: 'idle', message: 'Paste CSV text and parse.' })
  const [numbersInput, setNumbersInput] = useState('1,2,345,3,2,5,32,1')
  const [sortedNumbers, setSortedNumbers] = useState([])
  const [sortStatus, setSortStatus] = useState({ state: 'idle', message: 'Enter comma-separated numbers and sort.' })

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

  const handleCsvParse = (event) => {
    event.preventDefault()
    const raw = csvInput.trim()

    if (!raw) {
      setCsvStatus({ state: 'error', message: 'Inserisci del testo CSV prima di parsare.' })
      setTableData([])
      return
    }

    const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0)
    const rows = lines.map((line) => line.split(',').map((cell) => cell.trim()))

    if (rows.length === 0) {
      setCsvStatus({ state: 'error', message: 'Nessuna riga trovata.' })
      setTableData([])
      return
    }

    const columnCount = Math.max(...rows.map((r) => r.length))
    const normalized = rows.map((r) => {
      if (r.length === columnCount) return r
      const padded = [...r]
      while (padded.length < columnCount) padded.push('')
      return padded
    })

    setTableData(normalized)
    setCsvStatus({ state: 'success', message: `Parse completato: ${normalized.length} righe, ${columnCount} colonne.` })
  }

  // Mergesort implementation
  const mergesort = (arr) => {
    if (arr.length <= 1) return arr

    const mid = Math.floor(arr.length / 2)
    const left = mergesort(arr.slice(0, mid))
    const right = mergesort(arr.slice(mid))

    return merge(left, right)
  }

  const merge = (left, right) => {
    const result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i])
        i++
      } else {
        result.push(right[j])
        j++
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }

  const handleSort = (event) => {
    event.preventDefault()
    const raw = numbersInput.trim()

    if (!raw) {
      setSortStatus({ state: 'error', message: 'Inserisci dei numeri prima di ordinare.' })
      setSortedNumbers([])
      return
    }

    const numbers = raw.split(',').map((n) => n.trim()).filter((n) => n.length > 0)
    const parsed = numbers.map((n) => parseFloat(n))

    if (parsed.some((n) => isNaN(n))) {
      setSortStatus({ state: 'error', message: 'Alcuni valori non sono numeri validi.' })
      setSortedNumbers([])
      return
    }

    const sorted = mergesort(parsed)
    setSortedNumbers(sorted)
    setSortStatus({ state: 'success', message: `Ordinamento completato: ${sorted.length} numeri.` })
  }

  return (
    <div className="page">
      <main className="content">
        <section id="completions" className="card">
          <header className="card-header">
            <p className="eyebrow">Completion</p>
            <h2 className="card-title">Regex email validation form</h2>
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

        <section id="csv" className="card">
          <header className="card-header">
            <p className="eyebrow">Fixer</p>
            <h2 className="card-title">CSV parser</h2>
          </header>

          <form className="form" onSubmit={handleCsvParse} noValidate>
            <label className="label" htmlFor="csv-input">
              CSV input
            </label>
            <textarea
              id="csv-input"
              name="csv-input"
              className="input"
              rows={4}
              value={csvInput}
              onChange={(event) => setCsvInput(event.target.value)}
              spellCheck={false}
            />

            <div className="button-row">
              <button type="submit" className="button">
                Parse CSV
              </button>
            </div>

            <p className={`status status-${csvStatus.state}`}>
              {csvStatus.message}
            </p>
          </form>

          {tableData.length > 0 && (
            <div className="table-wrap" role="region" aria-label="CSV preview">
              <table className="table">
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={`${rowIndex}-${row.length}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`}>{cell || '\u00a0'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="sort" className="card">
          <header className="card-header">
            <p className="eyebrow">Algorithm</p>
            <h2 className="card-title">Mergesort numbers</h2>
            <p className="card-subhead">
              Inserisci numeri separati da virgola e ordinali con mergesort.
            </p>
          </header>

          <form className="form" onSubmit={handleSort} noValidate>
            <label className="label" htmlFor="numbers-input">
              Numbers (comma-separated)
            </label>
            <input
              id="numbers-input"
              name="numbers-input"
              type="text"
              className="input"
              value={numbersInput}
              onChange={(event) => setNumbersInput(event.target.value)}
              placeholder="1,2,345,3,2,5,32,1"
              spellCheck={false}
            />

            <div className="button-row">
              <button type="submit" className="button">
                Sort with Mergesort
              </button>
            </div>

            <p className={`status status-${sortStatus.state}`}>
              {sortStatus.message}
            </p>
          </form>

          {sortedNumbers.length > 0 && (
            <div className="hint" role="region" aria-label="Sorted result">
              <p className="hint-title">Sorted numbers</p>
              <p className="hint-code">{sortedNumbers.join(', ')}</p>
            </div>
          )}
        </section>

        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Tests</p>
            <h2 className="card-title">Setup and write tests</h2>
          </header>
        </section>
      </main>
    </div>
  )
}

export default App
