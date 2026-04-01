import type { Transaction } from '../types';
import './TransactionDetail.css';

interface Props {
  transaction: Transaction;
  onBack: () => void;
}

export default function TransactionDetail({ transaction, onBack }: Props) {
  const { type, amount, name, date, status, paymentMethod, cashback } = transaction;

  const isPayment = type === 'Payment';
  const amountStr = isPayment
    ? `$${amount.toFixed(2)}`
    : `$${amount.toFixed(2)}`;

  // Format date like "5/26/22, 12:47" — use the date from JSON + a fixed time
  const dateObj = new Date(date + 'T12:47:00');
  const formattedDate =
    dateObj.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    }) +
    ', ' +
    dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });

  return (
    <div className="td-screen">
      {/* Back chevron */}
      <button className="td-back" onClick={onBack}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Hero: large amount, merchant, date */}
      <div className="td-hero">
        <h1 className="td-amount">{amountStr}</h1>
        <p className="td-merchant">{name}</p>
        <p className="td-date">{formattedDate}</p>
      </div>

      {/* Detail card */}
      <div className="td-detail-card">
        {/* Status row */}
        <div className="td-row">
          <span className="td-row-title">Status: {status}</span>
          <span className="td-row-sub">{paymentMethod}</span>
        </div>

        <div className="td-divider"></div>

        {/* Total row */}
        <div className="td-row td-row-inline">
          <span className="td-total-label">Total</span>
          <span className="td-total-amount">{amountStr}</span>
        </div>

        {cashback !== null && (
          <>
            <div className="td-divider"></div>
            <div className="td-row td-row-inline">
              <span className="td-total-label">Cash Back</span>
              <span className="td-cashback-value">{cashback}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
