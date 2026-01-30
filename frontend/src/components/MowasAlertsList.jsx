/**
 * Modern MOWAS alerts list (no cards) – compact rows with severity, type, title, location, dates.
 * Data from warnung.bund.de.
 */
import './MowasAlertsList.css';

function MowasAlertsList({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="mowas-list" role="list" aria-label="MOWAS alert list">
      <div className="mowas-list__header">
        <span className="mowas-list__col mowas-list__col--badges">Severity / Type</span>
        <span className="mowas-list__col mowas-list__col--title">Alert</span>
        <span className="mowas-list__col mowas-list__col--location">Location / Area</span>
        <span className="mowas-list__col mowas-list__col--date">Start</span>
        <span className="mowas-list__col mowas-list__col--code">Event code</span>
      </div>
      {alerts.map((alert) => (
        <MowasRow key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

function MowasRow({ alert }) {
  const i18n = alert.i18nTitle || {};
  const fullTitle = i18n.de ?? i18n.en ?? alert.id;
  const location =
    i18n.de && i18n.de.includes(' - ')
      ? i18n.de.split(' - ').pop().trim()
      : null;
  const categoryEn = i18n.en && i18n.en !== fullTitle ? i18n.en : null;

  const startDate = alert.startDate
    ? new Date(alert.startDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—';
  const expiresDate = alert.expiresDate
    ? new Date(alert.expiresDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

  const severityClass =
    alert.severity === 'Severe'
      ? 'mowas-row--severe'
      : alert.severity === 'Extreme'
        ? 'mowas-row--extreme'
        : 'mowas-row--minor';
  const typeClass =
    alert.type === 'Cancel'
      ? 'mowas-row--cancel'
      : alert.type === 'Update'
        ? 'mowas-row--update'
        : '';

  return (
    <article
      className={`mowas-row ${severityClass} ${typeClass}`}
      role="listitem"
    >
      <div className="mowas-row__bar" aria-hidden />
      <div className="mowas-row__badges">
        <span className="mowas-row__badge mowas-row__badge--severity">{alert.severity}</span>
        <span className="mowas-row__badge mowas-row__badge--type">{alert.type}</span>
        {alert.urgency && (
          <span className="mowas-row__badge mowas-row__badge--urgency">{alert.urgency}</span>
        )}
        {categoryEn && (
          <span className="mowas-row__badge mowas-row__badge--category" title="Category">
            {categoryEn}
          </span>
        )}
      </div>
      <div className="mowas-row__title">{fullTitle}</div>
      <div className="mowas-row__location">{location || '—'}</div>
      <div className="mowas-row__dates">
        <span className="mowas-row__start">{startDate}</span>
        {expiresDate && (
          <span className="mowas-row__expires">Expires {expiresDate}</span>
        )}
      </div>
      <div className="mowas-row__code">
        {alert.transKeys?.event && (
          <code className="mowas-row__event">{alert.transKeys.event}</code>
        )}
        {alert.id && (
          <span className="mowas-row__id" title={alert.id}>{alert.id}</span>
        )}
      </div>
    </article>
  );
}

export default MowasAlertsList;
