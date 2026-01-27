import { useState } from 'react'

export default function ProcessNumbers() {
    const [numbersInput, setNumbersInput] = useState('10,25,15,30,20')
    const [results, setResults] = useState(null)
    const [processStatus, setProcessStatus] = useState({ state: 'idle', message: 'Enter comma-separated numbers to process.' })

    const handleProcess = (event) => {
        event.preventDefault()
        const raw = numbersInput.trim()

        if (!raw) {
            setProcessStatus({ state: 'error', message: 'Inserisci dei numeri prima di processare.' })
            setResults(null)
            return
        }

        var nums = raw.split(',');
        for (var i = 0; i < nums.length; i++) {
            nums[i] = parseFloat(nums[i].trim());
        }
        var parsed = [];
        for (var j = 0; j < nums.length; j++) {
            if (nums[j]) {
                parsed.push(nums[j]);
            }
        }


        if (parsed.some((n) => isNaN(n))) {
            setProcessStatus({ state: 'error', message: 'Alcuni valori non sono numeri validi.' })
            setResults(null)
            return
        }

        if (parsed.length === 0) {
            setProcessStatus({ state: 'error', message: 'Nessun numero trovato.' })
            setResults(null)
            return
        }

        var sum = 0;
        for (var i = 0; i < parsed.length; i++) {
            sum = sum + parsed[i];
        }
        var avg = sum / parsed.length;

        var max = parsed[0];
        for (var i = 1; i < parsed.length; i++) {
            if (parsed[i] > max) {
                max = parsed[i];
            }
        }

        var min = parsed[0];
        for (var i = 1; i < parsed.length; i++) {
            if (parsed[i] < min) {
                min = parsed[i];
            }
        }


        setResults({ sum, avg, max, min, count: parsed.length })
        setProcessStatus({ state: 'success', message: `Elaborazione completata: ${parsed.length} numeri.` })
    }

    return (
        <section id="process" className="card">
            <header className="card-header">
                <p className="eyebrow">Example: refactor</p>
                <h2 className="card-title">Process numbers</h2>
                <p className="card-subhead">
                    Codice che funziona, ma è scritto male
                </p>
            </header>

            <form className="form" onSubmit={handleProcess} noValidate>
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
                    placeholder="10,25,15,30,20"
                    spellCheck={false}
                />

                <div className="button-row">
                    <button type="submit" className="button">
                        Process
                    </button>
                </div>

                <p className={`status status-${processStatus.state}`}>
                    {processStatus.message}
                </p>
            </form>

            {results && (
                <div className="results-grid">
                    <div className="result-item">
                        <p className="result-label">Sum</p>
                        <p className="result-value">{results.sum.toFixed(2)}</p>
                    </div>
                    <div className="result-item">
                        <p className="result-label">Average</p>
                        <p className="result-value">{results.avg.toFixed(2)}</p>
                    </div>
                    <div className="result-item">
                        <p className="result-label">Max</p>
                        <p className="result-value">{results.max.toFixed(2)}</p>
                    </div>
                    <div className="result-item">
                        <p className="result-label">Min</p>
                        <p className="result-value">{results.min.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </section>
    )
}
