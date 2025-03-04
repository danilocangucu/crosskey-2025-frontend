import React from 'react';
import '../moneyBin.css';

const Header: React.FC = () => {
  return (
    <header className="moneybin-header">
      <h1>Money Bin Inc. Mortgage Calculator</h1>
      <p className="moneybin-quote">
        “A penny saved is a penny ready to swim in tomorrow!” – Scrooge McDuck
      </p>
    </header>
  );
};

export default Header;
