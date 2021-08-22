import './App.css';
import CashRegister from './components/CashRegister';

function App() {
  return (
    <div className="App">
      {/* import bootstrap for obvious reasons */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
      crossorigin="anonymous"></link>

      <header className="App-header">
        <CashRegister/>
      </header>
    </div>
  );
}

export default App;
