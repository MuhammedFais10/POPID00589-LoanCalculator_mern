// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [yearsToRepay, setYearsToRepay] = useState('');
  const [results, setResults] = useState(null);

  const calculateLoan = async () => {
    const response = await axios.post('http://localhost:5000/calculate', {
      loanAmount,
      interestRate,
      yearsToRepay,
    });
    setResults(response.data);
  };

  return (
    <div>
      <h1>Loan Calculator</h1>
      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Years to Repay"
        value={yearsToRepay}
        onChange={(e) => setYearsToRepay(e.target.value)}
      />
      <button onClick={calculateLoan}>Calculate</button>
      {results && (
        <div>
          <h2>Results</h2>
          <p>Monthly Payment: {results.monthlyPayment.toFixed(2)}</p>
          <p>Total Payment: {results.totalPayment.toFixed(2)}</p>
          <p>Total Interest: {results.totalInterest.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
