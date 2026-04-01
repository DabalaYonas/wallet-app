import type { Transaction } from '../types';
import { formatTransactionDate } from '../utils/dateUtils';
import './TransactionItem.css';

interface Props {
  transaction: Transaction;
  now: Date;
  onClick: (transaction: Transaction) => void;
}

export default function TransactionItem({ transaction, now, onClick }: Props) {
  const { type, amount, name, description, date, pending, authorizedUser, icon, iconBg, cashback } = transaction;

  const isPayment = type === 'Payment';
  const amountStr = isPayment
    ? `+$${amount.toFixed(2)}`
    : `$${amount.toFixed(2)}`;

  const dateLabel = formatTransactionDate(date, now);

  // Payment transactions use the Apple Cash-style gradient (pink to orange to yellow)
  const iconStyle = isPayment
    ? { background: 'linear-gradient(135deg, #df8ce5 0%, #fb935c 50%, #fed43b 100%)' }
    : { backgroundColor: iconBg };

  // Description line: "Pending · <description>" if pending
  const descLine = pending ? (
    <><span className="tx-pending">Pending</span> · {description}</>
  ) : description;

  // Bottom line: "Diana – Yesterday" or just "Yesterday"
  const bottomLine = authorizedUser
    ? `${authorizedUser} \u2013 ${dateLabel}`
    : dateLabel;

  return (
    <div className="transaction-item" onClick={() => onClick(transaction)}>
      {/* Icon */}
      <div className="tx-icon" style={iconStyle}>
        <i className={icon}></i>
      </div>

      {/* Body */}
      <div className="tx-body">
        {/* Row 1: name + amount */}
        <div className="tx-row tx-top">
          <span className="tx-name">{name}</span>
          <span className={`tx-amount ${isPayment ? 'payment' : ''}`}>{amountStr}</span>
        </div>

        {/* Row 2: description + cashback% */}
        <div className="tx-row tx-mid">
          <span className="tx-description">{descLine}</span>
          {cashback !== null && <span className="tx-cashback">{cashback}%</span>}
        </div>

        {/* Row 3: user – date */}
        <div className="tx-row tx-bottom">
          <span className="tx-date">{bottomLine}</span>
        </div>
      </div>

      {/* Chevron */}
      <div className="tx-chevron">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
}
