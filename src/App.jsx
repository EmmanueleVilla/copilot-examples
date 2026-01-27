import './App.css'
import EmailValidator from './components/EmailValidator'
import CsvParser from './components/CsvParser'
import MergeSort from './components/MergeSort'
import ProcessNumbers from './components/ProcessNumbers'
import ApodFetcher from './components/ApodFetcher'

function App() {
  return (
    <div className="page">
      <main className="content">
        <EmailValidator />
        <CsvParser />
        <MergeSort />
        <ProcessNumbers />
        <ApodFetcher />

        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Example: tests</p>
            <h2 className="card-title">Setup and write tests using /setupTests and /tests</h2>
          </header>
        </section>
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Example: commit messages</p>
            <h2 className="card-title">Generate commit with custom options using github.copilot.chat.commitMessageGeneration.instructions</h2>
          </header>
        </section>
      </main>
    </div>
  )
}

export default App
