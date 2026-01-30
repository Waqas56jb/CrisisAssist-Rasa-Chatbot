import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GdacsMap.css';

const EVENT_TYPE_LABELS = {
  EQ: 'Earthquake',
  FL: 'Flood',
  TC: 'Tropical Cyclone',
  VO: 'Volcanic Eruption',
  WF: 'Forest Fire',
  DR: 'Drought',
};

const EVENT_COLORS = {
  EQ: '#dc3545',
  FL: '#0d6efd',
  TC: '#fd7e14',
  VO: '#6f42c1',
  WF: '#198754',
  DR: '#6c757d',
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function formatCountry(raw) {
  if (!raw || typeof raw !== 'string') return '—';
  return raw
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function EventTooltip({ feature }) {
  const p = feature.properties || {};
  const geom = feature.geometry || {};
  const coords = geom.coordinates || [];
  const lon = coords[0] != null ? Number(coords[0]).toFixed(4) : '—';
  const lat = coords[1] != null ? Number(coords[1]).toFixed(4) : '—';
  const type = EVENT_TYPE_LABELS[(p.eventtype || '').toUpperCase()] || p.eventtype || 'Event';
  const country = formatCountry(p.country);
  const name = p.name || p.description || 'Event';
  const alert = p.alertlevel || '—';
  const from = formatDate(p.fromdate);
  const to = formatDate(p.todate);
  const severity = (p.severitydata || {}).severitytext || null;
  return (
    <div className="gdacs-map-tooltip">
      <strong>{name}</strong>
      <div className="gdacs-map-tooltip__country">
        <span className="gdacs-map-tooltip__label">Country:</span> {country}
      </div>
      <div className="gdacs-map-tooltip__row">
        <span className="gdacs-map-tooltip__label">Type:</span> {type}
      </div>
      <div className="gdacs-map-tooltip__row">
        <span className="gdacs-map-tooltip__label">Alert:</span> {alert}
      </div>
      <div className="gdacs-map-tooltip__row">
        <span className="gdacs-map-tooltip__label">From:</span> {from}
      </div>
      {p.todate && (
        <div className="gdacs-map-tooltip__row">
          <span className="gdacs-map-tooltip__label">To:</span> {to}
        </div>
      )}
      <div className="gdacs-map-tooltip__row">
        <span className="gdacs-map-tooltip__label">GPS:</span> {lat}, {lon}
      </div>
      {severity && (
        <div className="gdacs-map-tooltip__details">{severity}</div>
      )}
      <div className="gdacs-map-tooltip__hint">Click for full report link</div>
    </div>
  );
}

function EventPopup({ feature }) {
  const p = feature.properties || {};
  const geom = feature.geometry || {};
  const coords = geom.coordinates || [];
  const lon = coords[0] != null ? Number(coords[0]).toFixed(4) : '—';
  const lat = coords[1] != null ? Number(coords[1]).toFixed(4) : '—';

  const type = EVENT_TYPE_LABELS[(p.eventtype || '').toUpperCase()] || p.eventtype || 'Event';
  const country = formatCountry(p.country);
  const name = p.name || p.description || 'Event';
  const alert = p.alertlevel || '—';
  const from = formatDate(p.fromdate);
  const to = formatDate(p.todate);
  const severity = (p.severitydata || {}).severitytext || '—';
  const reportUrl = (p.url || {}).report || '';

  return (
    <div className="gdacs-map-popup">
      <h4 className="gdacs-map-popup__title">{name}</h4>
      <dl className="gdacs-map-popup__list">
        <dt>Country / Area</dt>
        <dd>{country}</dd>
        <dt>Event type</dt>
        <dd>{type}</dd>
        <dt>Alert level</dt>
        <dd>{alert}</dd>
        <dt>From</dt>
        <dd>{from}</dd>
        <dt>To</dt>
        <dd>{to}</dd>
        <dt>GPS (Lat, Lon)</dt>
        <dd>{lat}, {lon}</dd>
        <dt>Details</dt>
        <dd>{severity}</dd>
      </dl>
      {reportUrl && (
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gdacs-map-popup__link"
        >
          View full report on GDACS →
        </a>
      )}
    </div>
  );
}

function MapFitBounds({ features }) {
  const map = useMap();
  const bounds = useMemo(() => {
    const points = features
      .map((f) => f.geometry?.coordinates)
      .filter((c) => c && c.length >= 2)
      .map((c) => [Number(c[1]), Number(c[0])]);
    if (points.length === 0) return null;
    return L.latLngBounds(points);
  }, [features]);

  if (bounds && bounds.isValid()) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
  }
  return null;
}

function GdacsMap({ features }) {
  const markers = useMemo(() => {
    return features.filter((f) => {
      const c = f.geometry?.coordinates;
      return c && c.length >= 2 && Number.isFinite(Number(c[0])) && Number.isFinite(Number(c[1]));
    });
  }, [features]);

  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  return (
    <figure className="gdacs-map">
      <div className="gdacs-map__container">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          className="gdacs-map__leaflet"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.length > 0 && <MapFitBounds features={markers} />}
          {markers.map((feature, i) => {
            const c = feature.geometry.coordinates;
            const lat = Number(c[1]);
            const lon = Number(c[0]);
            const type = (feature.properties?.eventtype || '').toUpperCase();
            const color = EVENT_COLORS[type] || '#6c757d';
            const icon = L.divIcon({
              className: 'gdacs-marker',
              html: `<div style="background-color:${color};width:22px;height:22px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
              iconSize: [22, 22],
              iconAnchor: [11, 11],
            });
            const key = feature.properties?.eventid != null && feature.properties?.episodeid != null
              ? `${feature.properties.eventtype}-${feature.properties.eventid}-${feature.properties.episodeid}`
              : `marker-${i}`;
            return (
              <Marker key={key} position={[lat, lon]} icon={icon}>
                <Tooltip direction="top" offset={[0, -14]} className="gdacs-map-tooltip-wrap" sticky>
                  <EventTooltip feature={feature} />
                </Tooltip>
                <Popup maxWidth={380} className="gdacs-map-popup-wrap">
                  <EventPopup feature={feature} />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <figcaption className="gdacs-map__caption">
        OpenStreetMap — {markers.length} event(s). Hover on a dot for full details; click for report link.
      </figcaption>
      <div className="gdacs-map__legend">
        <span className="gdacs-map__legend-item" style={{ color: '#dc3545' }}>EQ</span>
        <span className="gdacs-map__legend-item" style={{ color: '#0d6efd' }}>FL</span>
        <span className="gdacs-map__legend-item" style={{ color: '#fd7e14' }}>TC</span>
        <span className="gdacs-map__legend-item" style={{ color: '#6f42c1' }}>VO</span>
        <span className="gdacs-map__legend-item" style={{ color: '#198754' }}>WF</span>
        <span className="gdacs-map__legend-item" style={{ color: '#6c757d' }}>DR</span>
      </div>
    </figure>
  );
}

export default GdacsMap;
