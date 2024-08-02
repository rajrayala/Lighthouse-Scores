import React, { useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import LHResults from './components/LHResults/LHResults';
import InputForm from './components/InputForm/InputForm';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunTests = async (urls: string[], runs: number, device: string) => {
    setLoading(true);
    setResults(null);
    try {
      const response = await axios.post('http://localhost:3000/run-tests', {
        urls,
        runs,
        device,
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Lighthouse UI Dashboard</h1>
      <InputForm onRunTests={handleRunTests} />
      {loading ? <Loader /> : <LHResults results={results} />}
    </div>
  );
};

export default App;
