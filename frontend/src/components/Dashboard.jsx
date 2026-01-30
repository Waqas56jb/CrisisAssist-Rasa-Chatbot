import { useState, useEffect, useCallback, useMemo } from 'react';
import { FiRefreshCw, FiAlertCircle, FiGlobe, FiClock, FiFilter, FiMapPin } from 'react-icons/fi';
import GdacsMap from './GdacsMap';
import GermanyWeather from './GermanyWeather';
import MowasAlertsList from './MowasAlertsList';
import KPICards from './KPICards';
import Charts from './Charts';
import './Dashboard.css';

const API_BASE = '/api';
const POLL_INTERVAL_MS = 60 * 1000; // 1 minute

const EVENT_TYPES = [
  { value: '', label: 'All types' },
  { value: 'EQ', label: 'Earthquake' },
  { value: 'FL', label: 'Flood' },
  { value: 'TC', label: 'Tropical Cyclone' },
  { value: 'VO', label: 'Volcanic Eruption' },
  { value: 'WF', label: 'Forest Fire' },
  { value: 'DR', label: 'Drought' },
];

const ALERT_LEVELS = [
  { value: '', label: 'All levels' },
  { value: 'Red', label: 'Red' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Green', label: 'Green' },
];

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [gdacsFeatures, setGdacsFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gdacsLoading, setGdacsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gdacsError, setGdacsError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [filterEventType, setFilterEventType] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterAlertLevel, setFilterAlertLevel] = useState('');

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load alerts');
        setAlerts([]);
        return;
      }
      setError(null);
      setAlerts(data.alerts ?? (Array.isArray(data) ? data : []));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Network error');
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGdacs = useCallback(async () => {
    setGdacsLoading(true);
    try {
      // Fetch all GDACS events (no country filter by default)
      const res = await fetch(`${API_BASE}/gdacs`);
      const data = await res.json();
      if (!res.ok) {
        setGdacsError(data.error || 'Failed to load GDACS events');
        setGdacsFeatures([]);
        return;
      }
      setGdacsError(null);
      setGdacsFeatures(Array.isArray(data.features) ? data.features : []);
    } catch (err) {
      setGdacsError(err.message || 'Network error');
      setGdacsFeatures([]);
    } finally {
      setGdacsLoading(false);
    }
  }, []);

  const filteredGdacs = useMemo(() => {
    return gdacsFeatures.filter((f) => {
      const p = f.properties || {};
      if (filterEventType && (p.eventtype || '').toUpperCase() !== filterEventType) return false;
      if (filterAlertLevel && (p.alertlevel || '') !== filterAlertLevel) return false;
      if (filterCountry.trim()) {
        const country = (p.country || '').toLowerCase();
        const search = filterCountry.trim().toLowerCase();
        if (!country.includes(search)) return false;
      }
      return true;
    });
  }, [gdacsFeatures, filterEventType, filterAlertLevel, filterCountry]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  useEffect(() => {
    fetchGdacs();
    const interval = setInterval(fetchGdacs, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchGdacs]);

  const initialLoading = loading && alerts.length === 0;

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-content">
          <div>
          <h1 className="dashboard__title">CrisisAssist Dashboard</h1>
          <p className="dashboard__subtitle">
            Real-time emergency alerts, disaster events, and weather intelligence for <strong>Germany</strong>
          </p>
          </div>
          <div className="dashboard__meta">
            <div className="dashboard__stat">
              <FiAlertCircle className="dashboard__stat-icon" />
              <div>
                <span className="dashboard__stat-value">{alerts.length}</span>
                <span className="dashboard__stat-label">MOWAS Alerts</span>
                <span className="dashboard__stat-sublabel">Germany</span>
              </div>
            </div>
            <div className="dashboard__stat">
              <FiGlobe className="dashboard__stat-icon" />
              <div>
                <span className="dashboard__stat-value">{gdacsFeatures.length}</span>
                <span className="dashboard__stat-label">GDACS Events</span>
                <span className="dashboard__stat-sublabel">Global</span>
              </div>
            </div>
            {lastUpdated && (
              <div className="dashboard__stat">
                <FiClock className="dashboard__stat-icon" />
                <div>
                  <span className="dashboard__stat-value">{lastUpdated.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="dashboard__stat-label">Last Updated</span>
                </div>
              </div>
            )}
            <button
              type="button"
              className="dashboard__refresh"
              onClick={() => {
                fetchAlerts();
                fetchGdacs();
              }}
              disabled={loading}
            >
              <FiRefreshCw className={loading ? 'dashboard__refresh-icon--spinning' : ''} />
              <span>{loading ? 'Refreshing…' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <KPICards alerts={alerts} gdacsFeatures={gdacsFeatures} />

      {/* Charts and Visualizations */}
      <Charts alerts={alerts} gdacsFeatures={gdacsFeatures} />

      {/* Germany Weather – 5-day outlook */}
      <GermanyWeather />

      {/* MOWAS Alerts (warnung.bund.de) */}
      <section className="dashboard__section" aria-label="MOWAS alerts">
        <div className="dashboard__section-header">
          <div className="dashboard__section-title-wrapper">
            <FiAlertCircle className="dashboard__section-icon" />
            <div>
              <h2 className="dashboard__section-title">MOWAS Alerts – Germany</h2>
              <p className="dashboard__section-subtitle">
                Public warnings from{' '}
                <a
                  href="https://warnung.bund.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  warnung.bund.de
                </a>
              </p>
            </div>
          </div>
        </div>
        {error && (
          <div className="dashboard__error" role="alert">
            {error}
          </div>
        )}
        {!error && initialLoading && (
          <div className="dashboard dashboard--loading">
            <div className="dashboard__spinner" aria-hidden />
            <p>Loading MOWAS alerts…</p>
          </div>
        )}
        {!error && !initialLoading && alerts.length === 0 && (
          <p className="dashboard__empty">No active MOWAS alerts.</p>
        )}
        {!error && alerts.length > 0 && (
          <MowasAlertsList alerts={alerts} />
        )}
      </section>

      {/* GDACS – All events + filters + map */}
      <section className="dashboard__section" aria-label="GDACS all events">
        <div className="dashboard__section-header">
          <div className="dashboard__section-title-wrapper">
            <FiGlobe className="dashboard__section-icon" />
            <div>
              <h2 className="dashboard__section-title">GDACS – Global Disaster Events</h2>
              <p className="dashboard__section-subtitle">
                Earthquake, Flood, Cyclone, Volcano, Forest fire, Drought — with GPS coordinates and interactive map. From{' '}
                <a
                  href="https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GDACS API
                </a>
              </p>
            </div>
          </div>
        </div>

        {gdacsError && (
          <div className="dashboard__error" role="alert">
            {gdacsError}
          </div>
        )}

        {!gdacsError && gdacsLoading && gdacsFeatures.length === 0 && (
          <div className="dashboard dashboard--loading">
            <div className="dashboard__spinner" aria-hidden />
            <p>Loading GDACS events…</p>
          </div>
        )}

        {!gdacsError && !gdacsLoading && (
          <>
            <div className="gdacs-filters">
              <div className="gdacs-filters__header">
                <FiFilter className="gdacs-filters__icon" />
                <span className="gdacs-filters__title">Filter Events</span>
              </div>
              <div className="gdacs-filters__grid">
                <label className="gdacs-filters__label">
                  <span className="gdacs-filters__label-text">Event Type</span>
                  <select
                    value={filterEventType}
                    onChange={(e) => setFilterEventType(e.target.value)}
                    aria-label="Filter by event type"
                    className="gdacs-filters__select"
                  >
                    {EVENT_TYPES.map((o) => (
                      <option key={o.value || 'all'} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="gdacs-filters__label">
                  <span className="gdacs-filters__label-text">Alert Level</span>
                  <select
                    value={filterAlertLevel}
                    onChange={(e) => setFilterAlertLevel(e.target.value)}
                    aria-label="Filter by alert level"
                    className="gdacs-filters__select"
                  >
                    {ALERT_LEVELS.map((o) => (
                      <option key={o.value || 'all'} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="gdacs-filters__label gdacs-filters__label--wide">
                  <span className="gdacs-filters__label-text">
                    <FiMapPin className="gdacs-filters__input-icon" />
                    Country
                  </span>
                  <input
                    type="text"
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    placeholder="e.g. Germany, India (leave empty for all)"
                    aria-label="Filter by country name"
                    className="gdacs-filters__input"
                  />
                </label>
              </div>
            </div>

            {filteredGdacs.length === 0 && (
              <p className="dashboard__empty">
                No events match the current filters.
              </p>
            )}

            {filteredGdacs.length > 0 && (
              <GdacsMap features={filteredGdacs} />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
