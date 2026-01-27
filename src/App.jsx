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
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">The tool</p>
            <h2 className="card-title">What is copilot</h2>
            <ul>
              <li>Programming assistant developed by GitHub and OpenAI.</li>
              <li>Integrated into IDEs: VS Code, JetBrains...</li>
              <li>Uses predictive LLMs: predicts code from context.</li>
              <li>Advantages: speeds up, reduces boilerplate, helps with new APIs.</li>
              <li>Disadvantages: possible errors, security, dependency. Requires human review!!</li>
            </ul>
          </header>
        </section>
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Init</p>
            <h2 className="card-title">Setup copilot</h2>
            <p>Install the plugin and log in to GitHub to get started.</p>
          </header>
        </section>
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
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Example: assign an issue</p>
            <h2 className="card-title">Create issues.</h2>
            <p>Create an issue on the github portal and assign it to an agent</p>
          </header>
        </section>
        <section id="tests" className="card">
          <header className="card-header">
            <p className="eyebrow">Example: Pull request</p>
            <h2 className="card-title">Create a PR.</h2>
            <p>Open a PR and assign copilot to review it</p>
          </header>
        </section>
      </main>
    </div>
  )
}

export default App
