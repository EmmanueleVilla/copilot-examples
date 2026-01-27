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
            <h2 className="card-title">Setup and write tests </h2>
            <p>Using the /setupTests and /tests you can configure and write tests for your project.</p>
          </header>
        </section>
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Example: commit messages</p>
            <h2 className="card-title">Generate commit messages.</h2>
            <p>Using the github.copilot.chat.commitMessageGeneration.instructions config you can generate commit messages based on your code changes, following your specified guidelines.</p>
          </header>
        </section>
      </main>
    </div>
  )
}

export default App
