import data from '../data/transactions.json';
import TransactionItem from '../components/TransactionItem';
import type { Transaction } from '../types';
import { calculateDailyPoints, formatPoints } from '../utils/dateUtils';
import './TransactionsList.css';

interface Props {
  onSelectTransaction: (tx: Transaction) => void;
}

const NOW = new Date('2026-04-01T01:48:42+03:00');

// Dynamic month name for "No Payment Due" text
const MONTH_NAME = NOW.toLocaleDateString('en-US', { month: 'long' });

export default function TransactionsList({ onSelectTransaction }: Props) {
  const { card, transactions } = data as {
    card: { limit: number; balance: number };
    transactions: Transaction[];
  };

  const available = card.limit - card.balance;
  const points = calculateDailyPoints(NOW);
  const pointsDisplay = formatPoints(points);

  return (
    <div className="tl-screen">
      {/* Summary Grid: 2 columns */}
      <div className="tl-summary-grid">

        {/* Left Column */}
        <div className="tl-left-col">
          {/* Card Balance */}
          <div className="tl-card balance-card">
            <span className="summary-label">Card Balance</span>
            <span className="summary-value">${card.balance.toFixed(2)}</span>
            <span className="summary-sub">
              ${available.toLocaleString('en-US', { minimumFractionDigits: 2 })} Available
            </span>
          </div>

          {/* Daily Points */}
          <div className="tl-card points-card">
            <span className="summary-label">Daily Points</span>
            <span className="summary-sub">{pointsDisplay}</span>
          </div>
        </div>

        {/* Right Column: Tall Card */}
        <div className="tl-card payment-card">
          <div className="payment-card-text">
            <span className="payment-title">No Payment Due</span>
            <span className="paid-text">You've paid your {MONTH_NAME} balance.</span>
          </div>
          
          <div className="check-circle">
            <i className="fa-solid fa-check check-icon"></i>
          </div>
        </div>

      </div>

      {/* Latest Transactions */}
      <div className="tl-transactions-section">
        <h2 className="tl-section-title">Latest Transactions</h2>
        <div className="tl-transactions-list">
          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              now={NOW}
              onClick={onSelectTransaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
