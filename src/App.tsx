import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import EstimatorPage from './pages/EstimatorPage';
import EstimatorResultsPage from './pages/EstimatorResultsPage';
import QuickContactPage from './pages/QuickContactPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="estimator" element={<EstimatorPage />} />
        <Route path="estimator/results" element={<EstimatorResultsPage />} />
        <Route path="quick-contact" element={<QuickContactPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
