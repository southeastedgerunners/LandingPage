import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import EstimatorPage from './pages/EstimatorPage';
import EstimatorResultsPage from './pages/EstimatorResultsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="estimator" element={<EstimatorPage />} />
        <Route path="estimator/results" element={<EstimatorResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
