import { useMemo } from 'react';
import { FiAlertCircle, FiGlobe, FiActivity, FiShield } from 'react-icons/fi';
import './KPICards.css';

function KPICards({ alerts, gdacsFeatures }) {
  const kpis = useMemo(() => {
    // Calculate KPIs from real data - Germany focused
    const totalAlerts = alerts.length;
    const totalEvents = gdacsFeatures.length; // Already filtered to Germany
    
    // Alert severity breakdown (Germany MOWAS)
    const extremeAlerts = alerts.filter(a => a.severity === 'Extreme').length;
    const severeAlerts = alerts.filter(a => a.severity === 'Severe').length;
    const minorAlerts = alerts.filter(a => a.severity === 'Minor').length;
    const totalSevere = extremeAlerts + severeAlerts;
    
    // GDACS alert level breakdown (Germany events)
    const redEvents = gdacsFeatures.filter(f => (f.properties?.alertlevel || '').toLowerCase() === 'red').length;
    const orangeEvents = gdacsFeatures.filter(f => (f.properties?.alertlevel || '').toLowerCase() === 'orange').length;
    const greenEvents = gdacsFeatures.filter(f => (f.properties?.alertlevel || '').toLowerCase() === 'green').length;
    
    // Event type distribution (Germany)
    const eventTypes = {};
    gdacsFeatures.forEach(f => {
      const type = f.properties?.eventtype || 'Unknown';
      const typeLabels = {
        'EQ': 'Earthquake',
        'FL': 'Flood',
        'TC': 'Cyclone',
        'VO': 'Volcano',
        'WF': 'Wildfire',
        'DR': 'Drought',
      };
      const label = typeLabels[type] || type;
      eventTypes[label] = (eventTypes[label] || 0) + 1;
    });
    const mostCommonType = Object.entries(eventTypes).sort((a, b) => b[1] - a[1])[0];
    
    // Active alerts (recent, not cancelled)
    const activeAlerts = alerts.filter(a => a.type !== 'Cancel').length;
    
    // High priority GDACS events (Red + Orange)
    const highPriorityEvents = redEvents + orangeEvents;
    
    return {
      totalAlerts,
      totalEvents,
      extremeAlerts,
      severeAlerts,
      minorAlerts,
      totalSevere,
      redEvents,
      orangeEvents,
      greenEvents,
      mostCommonType: mostCommonType ? `${mostCommonType[0]}` : 'None',
      mostCommonTypeCount: mostCommonType ? mostCommonType[1] : 0,
      activeAlerts,
      highPriorityEvents,
    };
  }, [alerts, gdacsFeatures]);

  return (
    <div className="kpi-cards">
      <div className="kpi-card kpi-card--primary">
        <div className="kpi-card__icon">
          <FiAlertCircle />
        </div>
        <div className="kpi-card__content">
          <div className="kpi-card__value">{kpis.totalAlerts}</div>
          <div className="kpi-card__label">MOWAS Alerts - Germany</div>
          <div className="kpi-card__subtext">
            {kpis.totalSevere} severe/extreme • {kpis.activeAlerts} active
          </div>
        </div>
      </div>

      <div className="kpi-card kpi-card--danger">
        <div className="kpi-card__icon">
          <FiShield />
        </div>
        <div className="kpi-card__content">
          <div className="kpi-card__value">{kpis.highPriorityEvents}</div>
          <div className="kpi-card__label">High Priority Events</div>
          <div className="kpi-card__subtext">
            {kpis.redEvents} red • {kpis.orangeEvents} orange alerts
          </div>
        </div>
      </div>

      <div className="kpi-card kpi-card--secondary">
        <div className="kpi-card__icon">
          <FiGlobe />
        </div>
        <div className="kpi-card__content">
          <div className="kpi-card__value">{kpis.totalEvents}</div>
          <div className="kpi-card__label">GDACS Events - Global</div>
          <div className="kpi-card__subtext">
            {kpis.redEvents} red • {kpis.orangeEvents} orange • {kpis.greenEvents} green
          </div>
        </div>
      </div>

      <div className="kpi-card kpi-card--warning">
        <div className="kpi-card__icon">
          <FiActivity />
        </div>
        <div className="kpi-card__content">
          <div className="kpi-card__value">{kpis.mostCommonType}</div>
          <div className="kpi-card__label">Most Common Event Type</div>
          <div className="kpi-card__subtext">
            {kpis.mostCommonTypeCount} event{kpis.mostCommonTypeCount !== 1 ? 's' : ''} globally
          </div>
        </div>
      </div>
    </div>
  );
}

export default KPICards;
