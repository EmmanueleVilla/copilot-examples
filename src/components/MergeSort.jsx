import { useState } from 'react'

export default function MergeSort() {
  const [numbersInput, setNumbersInput] = useState('1,2,345,3,2,5,32,1')
  const [sortedNumbers, setSortedNumbers] = useState([])
  const [sortStatus, setSortStatus] = useState({ state: 'idle', message: 'Enter comma-separated numbers and sort.' })

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
      setSortStatus({ state: 'error', message: 'Enter numbers before sorting.' })
      setSortedNumbers([])
      return
    }

    const numbers = raw.split(',').map((n) => n.trim()).filter((n) => n.length > 0)
    const parsed = numbers.map((n) => parseFloat(n))

    if (parsed.some((n) => isNaN(n))) {
      setSortStatus({ state: 'error', message: 'Some values are not valid numbers.' })
      setSortedNumbers([])
      return
    }

    const sorted = mergesort(parsed)
    setSortedNumbers(sorted)
    setSortStatus({ state: 'success', message: `Sorting completed: ${sorted.length} numbers.` })
  }

  return (
    <section id="sort" className="card">
      <header className="card-header">
        <p className="eyebrow">Example: explain 😵‍💫</p>
        <h2 className="card-title">Mergesort</h2>
        <p className="card-subhead">
          Code difficult to explain :(
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
  )
}
