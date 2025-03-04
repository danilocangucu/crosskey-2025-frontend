import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProspectList from './components/ProspectList';
import ProspectForm from './components/ProspectForm';
import { getProspects } from './services/prospectService';
import { Prospect } from './types/Prospect';
import './moneyBin.css';

const App: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchProspects = () => {
    setIsLoading(true);
    setFetchError('');
    getProspects()
      .then(data => setProspects(data))
      .catch(err => {
        console.error('Error fetching prospects:', err);
        setFetchError('Unable to fetch prospects. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  const handleFormSuccess = () => {
    fetchProspects();
  };

  return (
    <>
      <Header />
      <div className="moneybin-container">
        <section className="moneybin-card">
          <h2>Prospects</h2>
          {fetchError && <p className="moneybin-error">{fetchError}</p>}
          <ProspectList prospects={prospects} isLoading={isLoading} />
        </section>

        <section className="moneybin-card">
          <h2>Add a New Prospect</h2>
          {message && <p className="moneybin-success">{message}</p>}
          <ProspectForm onSuccess={handleFormSuccess} setMessage={setMessage} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default App;
