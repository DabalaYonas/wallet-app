import { useState } from 'react';
import TransactionsList from './screens/TransactionsList';
import TransactionDetail from './screens/TransactionDetail';
import type { Transaction } from './types';
import './App.css';

function App() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <div className="app">
      {selectedTx ? (
        <TransactionDetail
          transaction={selectedTx}
          onBack={() => setSelectedTx(null)}
        />
      ) : (
        <TransactionsList onSelectTransaction={setSelectedTx} />
      )}
    </div>
  );
}

export default App;
