import { useLocation, Link } from 'react-router-dom';
import './EstimatorResultsPage.css';

interface ResultItem {
  name: string;
  quantity: string;
  unitPrice: number;
  totalPrice: number;
  link?: string;
}

interface ResultsState {
  results: {
    items: ResultItem[];
    grandTotal: number;
    notes?: string;
  };
  jobType: string;
  store: string;
}

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function EstimatorResultsPage() {
  const location = useLocation();
  const state = location.state as ResultsState | null;

  if (!state?.results) {
    return (
      <div className="results">
        <div className="results__empty">
          <p>No estimate results found.</p>
          <Link to="/estimator" className="cta-button cta-button--pink">
            Start New Estimate
          </Link>
        </div>
      </div>
    );
  }

  const { results, jobType, store } = state;
  const items: ResultItem[] = results.items ?? [];

  return (
    <div className="results">
      <div className="results__header">
        <h1>Your Materials List</h1>
        <p>Estimated materials for: <strong>{jobType}</strong> · Prices sourced from <strong>{store}</strong></p>
      </div>

      {items.length === 0 ? (
        <div className="results__empty">
          <p>No items were returned for this estimate.</p>
        </div>
      ) : (
        <div className="results__items">
          {items.map((item, i) => (
            <div className="results__item" key={i}>
              <div className="results__item-left">
                <span className="results__item-name">{item.name}</span>
                <span className="results__item-qty">Qty: {item.quantity}</span>
              </div>
              <div className="results__item-right">
                <span className="results__item-unit">{fmt.format(item.unitPrice)} / unit</span>
                <span className="results__item-price">Total: {fmt.format(item.totalPrice)}</span>
                {item.link && (
                  <a
                    className="results__item-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results__summary">
        <span className="results__summary-label">Estimated Total</span>
        <span className="results__summary-total">{fmt.format(results.grandTotal)}</span>
        {results.notes && (
          <p className="results__summary-notes">{results.notes}</p>
        )}
      </div>

      <div className="results__actions">
        <Link to="/estimator" className="cta-button cta-button--pink">
          Start New Estimate
        </Link>
      </div>

      <p className="results__disclaimer">
        Prices are estimates based on current market data. Actual costs may vary by region and supplier.
      </p>
    </div>
  );
}
