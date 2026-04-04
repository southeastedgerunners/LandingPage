import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './EstimatorPage.css';

type JobType = '' | 'Flooring' | 'Build a Deck' | 'Paint a Room';
type Store = 'Home Depot' | 'Lowe\'s' | 'Menards' | 'Ace Hardware' | 'Amazon';

interface FlooringFields {
  squareFootage: number;
  flooringType: string;
  underlayment: boolean;
  tools: boolean;
}

interface DeckFields {
  length: number;
  width: number;
  deckingMaterial: string;
  height: string;
  railing: boolean;
  stairs: boolean;
  tools: boolean;
}

interface PaintFields {
  wallSquareFootage: number;
  paintFinish: string;
  coats: string;
  primer: boolean;
  ceiling: boolean;
  tools: boolean;
}

function FlooringForm({ onSubmit, loading }: { onSubmit: (data: FlooringFields) => void; loading: boolean }) {
  const [fields, setFields] = useState<FlooringFields>({
    squareFootage: 0,
    flooringType: 'Luxury Vinyl Plank',
    underlayment: true,
    tools: false,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(fields);
  }

  return (
    <form className="est-form" onSubmit={handleSubmit} noValidate>
      <div className="est-field">
        <label htmlFor="floor-sqft">Square Footage</label>
        <input
          id="floor-sqft"
          type="number"
          required
          min={1}
          value={fields.squareFootage || ''}
          onChange={e => setFields(f => ({ ...f, squareFootage: Number(e.target.value) }))}
          placeholder="e.g. 400"
        />
      </div>

      <div className="est-field">
        <label htmlFor="floor-type">Flooring Type</label>
        <select
          id="floor-type"
          value={fields.flooringType}
          onChange={e => setFields(f => ({ ...f, flooringType: e.target.value }))}
        >
          <option>Luxury Vinyl Plank</option>
          <option>Hardwood</option>
          <option>Laminate</option>
          <option>Tile</option>
        </select>
      </div>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.underlayment}
          onChange={e => setFields(f => ({ ...f, underlayment: e.target.checked }))}
        />
        Need underlayment?
      </label>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.tools}
          onChange={e => setFields(f => ({ ...f, tools: e.target.checked }))}
        />
        Include basic tools (tapping block, pull bar, spacers)
      </label>

      <button type="submit" className="cta-button" disabled={loading}>
        {loading ? 'Building your estimate…' : 'Get My Estimate'}
      </button>
    </form>
  );
}

function DeckForm({ onSubmit, loading }: { onSubmit: (data: DeckFields) => void; loading: boolean }) {
  const [fields, setFields] = useState<DeckFields>({
    length: 0,
    width: 0,
    deckingMaterial: 'Pressure Treated Wood',
    height: 'Ground Level (under 12")',
    railing: false,
    stairs: false,
    tools: false,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(fields);
  }

  return (
    <form className="est-form" onSubmit={handleSubmit} noValidate>
      <div className="est-row">
        <div className="est-field">
          <label htmlFor="deck-length">Length (ft)</label>
          <input
            id="deck-length"
            type="number"
            required
            min={1}
            value={fields.length || ''}
            onChange={e => setFields(f => ({ ...f, length: Number(e.target.value) }))}
            placeholder="e.g. 16"
          />
        </div>
        <div className="est-field">
          <label htmlFor="deck-width">Width (ft)</label>
          <input
            id="deck-width"
            type="number"
            required
            min={1}
            value={fields.width || ''}
            onChange={e => setFields(f => ({ ...f, width: Number(e.target.value) }))}
            placeholder="e.g. 12"
          />
        </div>
      </div>

      <div className="est-field">
        <label htmlFor="deck-material">Decking Material</label>
        <select
          id="deck-material"
          value={fields.deckingMaterial}
          onChange={e => setFields(f => ({ ...f, deckingMaterial: e.target.value }))}
        >
          <option>Pressure Treated Wood</option>
          <option>Composite Decking</option>
          <option>Cedar</option>
        </select>
      </div>

      <div className="est-field">
        <label htmlFor="deck-height">Height off Ground</label>
        <select
          id="deck-height"
          value={fields.height}
          onChange={e => setFields(f => ({ ...f, height: e.target.value }))}
        >
          <option>Ground Level (under 12")</option>
          <option>Raised (12"–36")</option>
          <option>Elevated (36"+)</option>
        </select>
      </div>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.railing}
          onChange={e => setFields(f => ({ ...f, railing: e.target.checked }))}
        />
        Include railing?
      </label>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.stairs}
          onChange={e => setFields(f => ({ ...f, stairs: e.target.checked }))}
        />
        Include stairs?
      </label>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.tools}
          onChange={e => setFields(f => ({ ...f, tools: e.target.checked }))}
        />
        Include basic tools (drill bits, saw blades, hardware)
      </label>

      <button type="submit" className="cta-button" disabled={loading}>
        {loading ? 'Building your estimate…' : 'Get My Estimate'}
      </button>
    </form>
  );
}

function PaintForm({ onSubmit, loading }: { onSubmit: (data: PaintFields) => void; loading: boolean }) {
  const [fields, setFields] = useState<PaintFields>({
    wallSquareFootage: 0,
    paintFinish: 'Eggshell',
    coats: '2 coats',
    primer: true,
    ceiling: false,
    tools: false,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(fields);
  }

  return (
    <form className="est-form" onSubmit={handleSubmit} noValidate>
      <div className="est-field">
        <label htmlFor="paint-sqft">Wall Square Footage</label>
        <input
          id="paint-sqft"
          type="number"
          required
          min={1}
          value={fields.wallSquareFootage || ''}
          onChange={e => setFields(f => ({ ...f, wallSquareFootage: Number(e.target.value) }))}
          placeholder="e.g. 800"
        />
        <span className="est-field__hint">
          Measure total wall area (length × height × number of walls)
        </span>
      </div>

      <div className="est-field">
        <label htmlFor="paint-finish">Paint Finish</label>
        <select
          id="paint-finish"
          value={fields.paintFinish}
          onChange={e => setFields(f => ({ ...f, paintFinish: e.target.value }))}
        >
          <option>Flat/Matte</option>
          <option>Eggshell</option>
          <option>Satin</option>
          <option>Semi-Gloss</option>
        </select>
      </div>

      <div className="est-field">
        <label htmlFor="paint-coats">Number of Coats</label>
        <select
          id="paint-coats"
          value={fields.coats}
          onChange={e => setFields(f => ({ ...f, coats: e.target.value }))}
        >
          <option>1 coat</option>
          <option>2 coats</option>
        </select>
      </div>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.primer}
          onChange={e => setFields(f => ({ ...f, primer: e.target.checked }))}
        />
        Include primer?
      </label>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.ceiling}
          onChange={e => setFields(f => ({ ...f, ceiling: e.target.checked }))}
        />
        Paint ceiling too?
      </label>

      <label className="est-checkbox">
        <input
          type="checkbox"
          checked={fields.tools}
          onChange={e => setFields(f => ({ ...f, tools: e.target.checked }))}
        />
        Include tools (rollers, brushes, tape, drop cloth, tray)
      </label>

      <button type="submit" className="cta-button" disabled={loading}>
        {loading ? 'Building your estimate…' : 'Get My Estimate'}
      </button>
    </form>
  );
}

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function EstimatorPage() {
  const navigate = useNavigate();
  const [jobType, setJobType] = useState<JobType>('');
  const [store, setStore] = useState<Store>('Home Depot');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(formData: Record<string, unknown>) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobType, store }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      navigate('/estimator/results', { state: { results: data, jobType, store } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="estimator">
      <div className="estimator__header">
        <h1>Job Estimator</h1>
        <p>Tell us about your job and we'll build a materials list with current pricing.</p>
      </div>

      <div className="estimator__selector">
        <label htmlFor="job-type-select">Select your job type</label>
        <select
          id="job-type-select"
          value={jobType}
          onChange={e => {
            setJobType(e.target.value as JobType);
            setError('');
          }}
        >
          <option value="">— Choose a job type —</option>
          <option value="Flooring">Flooring</option>
          <option value="Build a Deck">Build a Deck</option>
          <option value="Paint a Room">Paint a Room</option>
        </select>

        <label htmlFor="store-select" style={{ marginTop: '1.25rem' }}>Preferred store</label>
        <select
          id="store-select"
          value={store}
          onChange={e => setStore(e.target.value as Store)}
        >
          <option>Home Depot</option>
          <option>Lowe's</option>
          <option>Menards</option>
          <option>Ace Hardware</option>
          <option>Amazon</option>
        </select>
      </div>

      {jobType && (
        <div className="estimator__form-card">
          {error && <p className="est-error">{error}</p>}

          {jobType === 'Flooring' && (
            <FlooringForm
              loading={loading}
              onSubmit={data => submit(data as unknown as Record<string, unknown>)}
            />
          )}
          {jobType === 'Build a Deck' && (
            <DeckForm
              loading={loading}
              onSubmit={data => submit(data as unknown as Record<string, unknown>)}
            />
          )}
          {jobType === 'Paint a Room' && (
            <PaintForm
              loading={loading}
              onSubmit={data => submit(data as unknown as Record<string, unknown>)}
            />
          )}
        </div>
      )}
    </div>
  );
}
