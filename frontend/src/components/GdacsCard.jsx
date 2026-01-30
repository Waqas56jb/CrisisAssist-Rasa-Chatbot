/**
 * Single GDACS disaster event card (from geteventlist/SEARCH).
 * Shows name, country, GPS (lat/lon), alert level, dates, severity, type, and report link.
 */
function GdacsCard({ feature }) {
  const props = feature.properties || {};
  const geom = feature.geometry || {};
  const coords = geom.coordinates || []; // GeoJSON: [longitude, latitude]
  const longitude = coords.length >= 1 ? Number(coords[0]).toFixed(4) : null;
  const latitude = coords.length >= 2 ? Number(coords[1]).toFixed(4) : null;

  const name = props.name || props.description || 'Event';
  const country = props.country || '';
  const alertlevel = props.alertlevel || '';
  const eventtype = props.eventtype || ''; // EQ, FL, TC, VO, WF, DR
  const fromdate = props.fromdate
    ? new Date(props.fromdate).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—';
  const todate = props.todate
    ? new Date(props.todate).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;
  const severitydata = props.severitydata || {};
  const severitytext = severitydata.severitytext || '';
  const url = props.url || {};
  const reportUrl = url.report || '';

  const eventTypeLabels = {
    EQ: 'Earthquake',
    FL: 'Flood',
    TC: 'Tropical Cyclone',
    VO: 'Volcanic Eruption',
    WF: 'Forest Fire',
    DR: 'Drought',
  };
  const typeLabel = eventTypeLabels[eventtype] || eventtype;

  const alertClass =
    alertlevel === 'Red'
      ? 'gdacs-card--red'
      : alertlevel === 'Orange'
        ? 'gdacs-card--orange'
        : 'gdacs-card--green';

  return (
    <article className={`gdacs-card ${alertClass}`}>
      <div className="gdacs-card__badges">
        <span className="gdacs-card__alert">{alertlevel}</span>
        <span className="gdacs-card__type">{typeLabel}</span>
      </div>
      <h3 className="gdacs-card__title">{name}</h3>
      {country && (
        <p className="gdacs-card__country">
          <span className="gdacs-card__label">Country / Area:</span> {country}
        </p>
      )}
      {(longitude != null || latitude != null) && (
        <p className="gdacs-card__coords">
          <span className="gdacs-card__label">GPS:</span>{' '}
          <span className="gdacs-card__coord">Lat {latitude}</span>
          <span className="gdacs-card__coord">Lon {longitude}</span>
        </p>
      )}
      <dl className="gdacs-card__meta">
        <div>
          <dt>From</dt>
          <dd>{fromdate}</dd>
        </div>
        {todate && (
          <div>
            <dt>To</dt>
            <dd>{todate}</dd>
          </div>
        )}
        {severitytext && (
          <div>
            <dt>Details</dt>
            <dd>{severitytext}</dd>
          </div>
        )}
      </dl>
      {reportUrl && (
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gdacs-card__link"
        >
          View report on GDACS →
        </a>
      )}
    </article>
  );
}

export default GdacsCard;
