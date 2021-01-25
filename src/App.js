
import './App.css';
import EstimateForm from './components/EstimateForm';

import './components/styles/Overrides.css';

function App() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center',backgroundColor: '#3f51b5',paddingTop: '1rem', marginTop: 0}}>
        <h1 style={{ color: 'white',textAlign: 'center' }}>Estimate Request</h1>
      </div>
      <EstimateForm />
    </div>
  );
}

export default App;
