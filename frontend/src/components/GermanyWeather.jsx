import { useState, useEffect, useCallback } from 'react';
import './GermanyWeather.css';

const API_BASE = '/api';
const POLL_WEATHER_MS = 15 * 60 * 1000; // 15 minutes
const OWM_ICON_URL = (icon) =>
  icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

const WEATHER_SHOWCASE_IMAGES = {
  '01d': 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80',
  '01n': 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80',
  '02d': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
  '02n': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  '03d': 'https://images.unsplash.com/photo-1475274047050-f1d0c17e8723?w=1200&q=80',
  '03n': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  '04d': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  '04n': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  '09d': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&q=80',
  '09n': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&q=80',
  '10d': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&q=80',
  '10n': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&q=80',
  '11d': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80',
  '11n': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80',
  '13d': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=80',
  '13n': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=80',
  '50d': 'https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?w=1200&q=80',
  '50n': 'https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?w=1200&q=80',
};
const DEFAULT_SHOWCASE_IMAGE =
  'https://images.unsplash.com/photo-1475274047050-f1d0c17e8723?w=1200&q=80';

function getShowcaseImageUrl(icon) {
  return WEATHER_SHOWCASE_IMAGES[icon] || DEFAULT_SHOWCASE_IMAGE;
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}

function formatDateTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function capitalize(str) {
  if (!str) return '';
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GermanyWeather() {
  const [data, setData] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [locationError, setLocationError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState({ type: 'city', city: 'Berlin' });

  const fetchWeather = useCallback(async (query) => {
    if (!query) query = { type: 'city', city: 'Berlin' };
    setLoading(true);
    setError(null);
    setLocationError(null);
    let url = `${API_BASE}/weather?`;
    if (query.type === 'coords' && query.lat != null && query.lon != null) {
      url += `lat=${query.lat}&lon=${query.lon}`;
    } else {
      url += `city=${encodeURIComponent(query.city || 'Berlin')}`;
    }
    try {
      const [res, citiesRes] = await Promise.all([
        fetch(url),
        fetch(`${API_BASE}/weather/cities`),
      ]);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to load weather');
        setData(null);
        return;
      }
      setError(null);
      setData(json);
      setCurrentQuery(query);
      try {
        const citiesJson = await citiesRes.json();
        setCities(citiesJson.cities || []);
      } catch {
        setCities([]);
      }
    } catch (err) {
      setError(err.message || 'Network error');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const city = searchInput.trim();
    if (!city) return;
    fetchWeather({ type: 'city', city });
  };

  const handleLiveLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather({ type: 'coords', lat: latitude, lon: longitude });
      },
      () => {
        setLocationError('Location access denied or unavailable.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchWeather({ type: 'city', city: 'Berlin' });
  }, []);

  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => fetchWeather(currentQuery), POLL_WEATHER_MS);
    return () => clearInterval(interval);
  }, [currentQuery, data, fetchWeather]);

  if (loading && !data) {
    return (
      <section className="weather-section" aria-label="Germany weather">
        <h2 className="weather-section__title">Weather Dashboard</h2>
        <div className="weather-section__loading">
          <div className="dashboard__spinner" aria-hidden />
          <p>Loading weather…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-section" aria-label="Germany weather">
        <h2 className="weather-section__title">Weather Dashboard</h2>
        <div className="dashboard__error" role="alert">{error}</div>
      </section>
    );
  }

  const current = data?.current || {};
  const forecast = data?.forecast || [];
  const hourly = data?.hourly || [];
  const city = data?.city || 'Berlin';
  const currentIconUrl = OWM_ICON_URL(current.icon);
  const showcaseImageUrl = getShowcaseImageUrl(current.icon);

  const hourlyTemps = hourly.map((h) => h.temp).filter((t) => t != null);
  const minH = hourlyTemps.length ? Math.min(...hourlyTemps) : 0;
  const maxH = hourlyTemps.length ? Math.max(...hourlyTemps) : 20;
  const rangeH = maxH - minH || 1;

  const nowStr = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="weather-section" aria-label="Germany weather">
      <h2 className="weather-section__title">Weather Dashboard</h2>
      <p className="weather-section__subtitle">
        Germany – live conditions & forecast. Search a city or use your location. Data from{' '}
        <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>.
      </p>

      <div className="weather-toolbar">
        <form className="weather-search" onSubmit={handleSearch}>
          <span className="weather-search__icon" aria-hidden>🔍</span>
          <input
            type="text"
            className="weather-search__input"
            placeholder="Search for a city (e.g. Berlin, Munich, Hamburg)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search city for weather"
          />
          <button type="submit" className="weather-search__btn" disabled={loading}>
            {loading ? '…' : 'Search'}
          </button>
        </form>
        <button
          type="button"
          className="weather-location-btn"
          onClick={handleLiveLocation}
          disabled={loading}
          title="Use my current location for weather"
          aria-label="Use my current location"
        >
          <span className="weather-location-btn__icon" aria-hidden>📍</span>
          <span className="weather-location-btn__label">My location</span>
        </button>
      </div>

      {locationError && (
        <div className="weather-section__error" role="alert">
          {locationError}
        </div>
      )}

      <div className="weather-dashboard">
        {/* Left panel – local weather & AQI & hourly */}
        <div className="weather-panel weather-panel--left">
          <div className="weather-panel__glass">
            <div className="weather-location">
              <span className="weather-location__icon" aria-hidden>📍</span>
              <span className="weather-location__text">{current.city || city}{current.country ? `, ${current.country}` : ''}</span>
            </div>
            <div className="weather-now">
              {currentIconUrl && (
                <img src={currentIconUrl} alt="" className="weather-now__icon" width={64} height={64} />
              )}
              <div className="weather-now__temps">
                {current.temp != null && (
                  <span className="weather-now__temp">{Math.round(current.temp)}°</span>
                )}
                {current.feels_like != null && (
                  <span className="weather-now__feels">Feels like {Math.round(current.feels_like)}°C</span>
                )}
              </div>
            </div>
            <div className="weather-details">
              {current.humidity != null && (
                <span className="weather-details__item">{current.humidity}% humidity</span>
              )}
              {current.wind_speed != null && (
                <span className="weather-details__item">Wind: {current.wind_speed} m/s</span>
              )}
            </div>
            <div className="weather-aqi">
              <span className="weather-aqi__label">Air quality</span>
              <div className="weather-aqi__bar">
                <span className="weather-aqi__dot weather-aqi__dot--safe" />
                <span className="weather-aqi__dot weather-aqi__dot--moderate" />
                <span className="weather-aqi__dot weather-aqi__dot--high" />
                <span className="weather-aqi__dot weather-aqi__dot--danger" />
              </div>
              <p className="weather-aqi__text">
                Generally acceptable for Germany. Sensitive groups: check local AQI.
              </p>
            </div>
            {hourly.length > 0 && (
              <div className="weather-hourly">
                <span className="weather-hourly__label">{Math.round(current.temp ?? hourly[0]?.temp ?? 0)}°C</span>
                <div className="weather-hourly__chart">
                  {hourly.map((h, i) => (
                    <div key={i} className="weather-hourly__bar-wrap">
                      <div
                        className="weather-hourly__bar"
                        style={{
                          height: `${20 + ((h.temp - minH) / rangeH) * 60}%`,
                        }}
                        title={`${h.time} ${h.temp != null ? Math.round(h.temp) + '°C' : ''}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="weather-hourly__times">
                  {hourly.map((h, i) => (
                    <span key={i} className="weather-hourly__time">{h.time}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel – forecast with live background image */}
        <div
          className="weather-panel weather-panel--right"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 20, 25, 0.82) 0%, rgba(26, 35, 50, 0.72) 50%, rgba(15, 20, 25, 0.6) 100%), url(${showcaseImageUrl})`,
          }}
        >
          <div className="weather-panel__glass weather-panel__glass--overlay">
            <span className="weather-panel__badge">NATIONAL WEATHER</span>
            <h3 className="weather-forecast-title">Weather Forecast</h3>
            <p className="weather-forecast-main">
              {current.description ? capitalize(current.description) : 'Current conditions'}
            </p>
            <p className="weather-forecast-meta">
              {currentIconUrl && (
                <img src={currentIconUrl} alt="" className="weather-forecast-meta__icon" width={28} height={28} />
              )}
              Germany, {formatDateTime(forecast[0]?.date || new Date().toISOString().slice(0, 10))}, {nowStr}
            </p>
            <p className="weather-forecast-desc">
              {current.description && capitalize(current.description)}. High {forecast[0]?.temp_max != null ? Math.round(forecast[0].temp_max) : '—'}°C,
              low {forecast[0]?.temp_min != null ? Math.round(forecast[0].temp_min) : '—'}°C. Wind {current.wind_speed != null ? current.wind_speed + ' m/s' : '—'}.
            </p>
            <a
              href="https://openweathermap.org/city/2950159"
              target="_blank"
              rel="noopener noreferrer"
              className="weather-forecast-link"
            >
              SEE DETAILS →
            </a>

            <div className="weather-daily-trend">
              {forecast.slice(0, 7).map((day) => (
                <div key={day.date} className="weather-daily-trend__day">
                  <span className="weather-daily-trend__label">{formatDate(day.date)}</span>
                  <span className="weather-daily-trend__high">
                    {day.temp_max != null ? Math.round(day.temp_max) : '—'}°
                  </span>
                  <span className="weather-daily-trend__low">
                    {day.temp_min != null ? Math.round(day.temp_min) : '—'}°
                  </span>
                </div>
              ))}
            </div>
            <div className="weather-daily-trend__line" aria-hidden />

            {cities.length > 0 && (
              <div className="weather-cities">
                {cities.map((c) => (
                  <span key={c.city} className="weather-cities__item">
                    {c.temp}° {c.city}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
