import logo from './logo.svg';
import './App.css';
// import LedgerCalculator from './components/revuelto';
import LedgerCalculator from './components/LedgerCalculator/LedgerCalculator';

function App() {
  return (
    <div className="App">
      <LedgerCalculator />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
