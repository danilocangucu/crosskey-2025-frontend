import React, { useState, FormEvent } from 'react';
import { ValidationErrors, ProspectFormData, validateProspectForm } from '../utils/validation';
import { addProspect } from '../services/prospectService';

interface ProspectFormProps {
  onSuccess: () => void;
  setMessage: (msg: string) => void;
}

const ProspectForm: React.FC<ProspectFormProps> = ({ onSuccess, setMessage }) => {
  const [formData, setFormData] = useState<ProspectFormData>({
    customerName: '',
    totalLoan: '',
    interest: '',
    years: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isPosting, setIsPosting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const validationErrors = validateProspectForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProspect = {
      customerName: formData.customerName.trim(),
      totalLoan: parseFloat(formData.totalLoan),
      interest: parseFloat(formData.interest),
      years: parseInt(formData.years, 10)
    };

    setIsPosting(true);
    try {
      await addProspect(newProspect);
      setMessage('Prospect added successfully!');
      onSuccess();
      setFormData({ customerName: '', totalLoan: '', interest: '', years: '' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error posting prospect:', err);
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data);
      } else {
        setMessage('Error posting prospect.');
      }
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Customer Name */}
      <div>
        <label>Customer Name:</label><br />
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          required
        />
        {errors.customerName && (
          <div className="moneybin-error">{errors.customerName}</div>
        )}
      </div>

      {/* Total Loan */}
      <div>
        <label>Total Loan (€):</label><br />
        <input
          type="number"
          step="0.01"
          name="totalLoan"
          value={formData.totalLoan}
          onChange={handleInputChange}
          required
        />
        {errors.totalLoan && (
          <div className="moneybin-error">{errors.totalLoan}</div>
        )}
      </div>

      {/* Interest */}
      <div>
        <label>Interest (%):</label><br />
        <input
          type="number"
          step="0.01"
          name="interest"
          value={formData.interest}
          onChange={handleInputChange}
          required
        />
        {errors.interest && (
          <div className="moneybin-error">{errors.interest}</div>
        )}
      </div>

      {/* Years */}
      <div>
        <label>Years:</label><br />
        <input
          type="number"
          name="years"
          value={formData.years}
          onChange={handleInputChange}
          required
        />
        {errors.years && (
          <div className="moneybin-error">{errors.years}</div>
        )}
      </div>

      <button type="submit" disabled={isPosting} style={{ marginTop: '1rem' }}>
        {isPosting ? 'Adding...' : 'Add Prospect'}
      </button>
    </form>
  );
};

export default ProspectForm;
