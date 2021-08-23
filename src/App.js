import './App.css';
import CashRegister from './components/CashRegister';

function App() {
  return (
    <div className="App">
      {/* import bootstrap for obvious reasons */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
      crossorigin="anonymous"></link>

      <link href="https://cashregister-resources.s3.amazonaws.com/digital-7.ttf" rel="stylesheet"></link>

      <header className="App-header">
        <CashRegister/>
      </header>
    </div>
  );
}

export default App;
