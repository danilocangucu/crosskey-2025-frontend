import React from 'react';
import { Prospect } from '../types/Prospect';
import '../moneyBin.css';

interface ProspectListProps {
  prospects: Prospect[];
  isLoading: boolean;
}

const ProspectList: React.FC<ProspectListProps> = ({ prospects, isLoading }) => {
  if (isLoading) {
    return <p>Loading prospects...</p>;
  }

  return (
    <ul className="moneybin-list">
      {prospects.map((prospect, index) => (
        <li key={prospect.id || index} className="moneybin-list-item">
          <div className="moneybin-list-header">
            <strong>Prospect {index + 1}:</strong> {prospect.customerName}
          </div>
          <div className="moneybin-list-body">
            <p>
              Wants to borrow <strong>{prospect.totalLoan.toFixed(2)} €</strong> for a
              period of <strong>{prospect.years}</strong> year(s).
            </p>
            <p>
              Monthly Payment: <strong>{prospect.monthlyPayment?.toFixed(2) ?? '—'} €</strong>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProspectList;
