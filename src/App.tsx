import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

// TODO handle error when not fetching prospects
// TODO total loan can only be positive
// TODO interest can only be positive
// TODO years can only be positive
// TODO "Prospect added successfully!" message should disappear after a few seconds
// TODO H1, H2 and footer

interface Prospect {
  id?: number;
  customerName: string;
  totalLoan: number;
  years: number;
  monthlyPayment?: number;
}

const App: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    totalLoan: '',
    interest: '',
    years: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get<Prospect[]>('http://localhost:8080/prospects')
      .then(response => {
        setProspects(response.data);
      })
      .catch(err => {
        console.error('Error fetching prospects:', err);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newProspect = {
      customerName: formData.customerName,
      totalLoan: parseFloat(formData.totalLoan),
      interest: parseFloat(formData.interest),
      years: parseInt(formData.years, 10)
    };

    axios.post('http://localhost:8080/prospects', newProspect)
      .then(() => {
        setMessage('Prospect added successfully!');
        return axios.get<Prospect[]>('http://localhost:8080/prospects');
      })
      .then(response => {
        setProspects(response.data);
      })
      .catch(err => {
        console.error('Error posting prospect:', err);
        setMessage('Error posting prospect.');
      });

    setFormData({
      customerName: '',
      totalLoan: '',
      interest: '',
      years: ''
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>========== Prospects ==========</h2>
      <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {prospects.map((prospect, index) => (
          <div key={prospect.id || index}>
            {`Prospect ${index + 1}: ${prospect.customerName} wants to borrow ${prospect.totalLoan.toFixed(2)} € for a period of ${prospect.years} years and pay ${prospect.monthlyPayment?.toFixed(2)} € each month`}
          </div>
        ))}
      </div>
      <h2>===============================</h2>

      <hr />

      <h3>Add a New Prospect (POST)</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Total Loan:
            <input
              type="number"
              step="0.01"
              name="totalLoan"
              value={formData.totalLoan}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Interest:
            <input
              type="number"
              step="0.01"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Years:
            <input
              type="number"
              name="years"
              value={formData.years}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Prospect</button>
      </form>
    </div>
  );
};

export default App;
