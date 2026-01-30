import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiPieChart } from 'react-icons/fi';
import './Charts.css';

const COLORS = {
  primary: '#2563eb',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#dc2626',
  info: '#06b6d4',
};

const CHART_COLORS = ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b', '#dc2626', '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#eab308', '#a855f7', '#ef4444', '#3b82f6'];

// Colorful severity-specific colors for MOWAS alerts
const SEVERITY_COLORS = {
  'Extreme': '#dc2626',    // Red
  'Severe': '#f59e0b',     // Orange/Amber
  'Minor': '#10b981',      // Green
  'Unknown': '#64748b',    // Gray
};

function Charts({ alerts, gdacsFeatures }) {
  // Alert severity distribution
  const alertSeverityData = useMemo(() => {
    const severityCount = {
      'Extreme': 0,
      'Severe': 0,
      'Minor': 0,
      'Unknown': 0,
    };
    
    alerts.forEach(alert => {
      const severity = alert.severity || 'Unknown';
      severityCount[severity] = (severityCount[severity] || 0) + 1;
    });
    
    return Object.entries(severityCount)
      .filter(([_, count]) => count > 0)
      .map(([name, value]) => ({ name, value }));
  }, [alerts]);

  // GDACS event type distribution (Germany only)
  const eventTypeData = useMemo(() => {
    const typeCount = {};
    
    gdacsFeatures.forEach(feature => {
      const type = feature.properties?.eventtype || 'Unknown';
      const typeLabels = {
        'EQ': 'Earthquake',
        'FL': 'Flood',
        'TC': 'Cyclone',
        'VO': 'Volcano',
        'WF': 'Wildfire',
        'DR': 'Drought',
      };
      const label = typeLabels[type] || type;
      typeCount[label] = (typeCount[label] || 0) + 1;
    });
    
    return Object.entries(typeCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [gdacsFeatures]);

  // Alert level distribution (GDACS)
  const alertLevelData = useMemo(() => {
    const levelCount = {
      'Red': 0,
      'Orange': 0,
      'Green': 0,
      'Unknown': 0,
    };
    
    gdacsFeatures.forEach(feature => {
      const level = feature.properties?.alertlevel || 'Unknown';
      levelCount[level] = (levelCount[level] || 0) + 1;
    });
    
    return Object.entries(levelCount)
      .filter(([_, count]) => count > 0)
      .map(([name, value]) => ({ name, value }));
  }, [gdacsFeatures]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__label">{payload[0].name}</p>
          <p className="chart-tooltip__value">
            <span style={{ color: payload[0].color }}>●</span> {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      <div className="charts-grid">
        {/* Alert Severity Pie Chart */}
        {alertSeverityData.length > 0 && (
          <div className="chart-card">
            <div className="chart-card__header">
              <FiPieChart className="chart-card__icon" />
              <h3 className="chart-card__title">MOWAS Alert Severity - Germany</h3>
            </div>
            <div className="chart-card__content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={alertSeverityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {alertSeverityData.map((entry, index) => {
                      // Use severity-specific colors if available, otherwise use colorful palette
                      const color = SEVERITY_COLORS[entry.name] || CHART_COLORS[index % CHART_COLORS.length];
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Event Type Bar Chart */}
        {eventTypeData.length > 0 && (
          <div className="chart-card">
            <div className="chart-card__header">
              <FiBarChart2 className="chart-card__icon" />
              <h3 className="chart-card__title">Disaster Event Types - Global</h3>
            </div>
            <div className="chart-card__content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Alert Level Distribution */}
        {alertLevelData.length > 0 && (
          <div className="chart-card">
            <div className="chart-card__header">
              <FiBarChart2 className="chart-card__icon" />
              <h3 className="chart-card__title">GDACS Alert Levels - Global</h3>
            </div>
            <div className="chart-card__content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={alertLevelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill={COLORS.secondary}
                    radius={[8, 8, 0, 0]}
                  >
                    {alertLevelData.map((entry, index) => {
                      let color = COLORS.secondary;
                      if (entry.name === 'Red') color = COLORS.danger;
                      if (entry.name === 'Orange') color = COLORS.warning;
                      if (entry.name === 'Green') color = COLORS.success;
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Charts;
