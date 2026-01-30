/**
 * Single alert card for MOWAS data from warnung.bund.de
 * Uses i18nTitle.de for full text (includes city/region names); en as category.
 */
function AlertCard({ alert }) {
  const i18n = alert.i18nTitle || {};
  // German text has the full message and location (e.g. "... - Stadt Darmstadt")
  const fullTitle = i18n.de ?? i18n.en ?? alert.id;
  // Location is often after the last " - " in the German title
  const location =
    i18n.de && i18n.de.includes(' - ')
      ? i18n.de.split(' - ').pop().trim()
      : null;
  // English is a short category (Epizootic, Contaminated drinking water, etc.)
  const categoryEn = i18n.en && i18n.en !== fullTitle ? i18n.en : null;

  const startDate = alert.startDate
    ? new Date(alert.startDate).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—';
  const expiresDate = alert.expiresDate
    ? new Date(alert.expiresDate).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  const severityClass =
    alert.severity === 'Severe'
      ? 'severity-severe'
      : alert.severity === 'Extreme'
        ? 'severity-extreme'
        : 'severity-minor';
  const typeClass =
    alert.type === 'Cancel'
      ? 'type-cancel'
      : alert.type === 'Update'
        ? 'type-update'
        : 'type-alert';

  return (
    <article className={`alert-card ${severityClass} ${typeClass}`}>
      <div className="alert-card__badges">
        <span className="badge badge--severity">{alert.severity}</span>
        <span className="badge badge--type">{alert.type}</span>
        {alert.urgency && (
          <span className="badge badge--urgency">{alert.urgency}</span>
        )}
        {categoryEn && (
          <span className="badge badge--category" title="Category (English)">
            {categoryEn}
          </span>
        )}
      </div>
      <h3 className="alert-card__title">{fullTitle}</h3>
      {location && (
        <p className="alert-card__location">
          <span className="alert-card__location-label">Location / Area:</span>{' '}
          {location}
        </p>
      )}
      <dl className="alert-card__meta">
        <div>
          <dt>Start</dt>
          <dd>{startDate}</dd>
        </div>
        {expiresDate && (
          <div>
            <dt>Expires</dt>
            <dd>{expiresDate}</dd>
          </div>
        )}
        {alert.transKeys?.event && (
          <div>
            <dt>Event code</dt>
            <dd className="alert-card__event">{alert.transKeys.event}</dd>
          </div>
        )}
      </dl>
      <p className="alert-card__id" title={alert.id}>
        {alert.id}
      </p>
    </article>
  );
}

export default AlertCard;
