import React from 'react';
import { Building2, TrendingUp, Users } from 'lucide-react';

const mockClientData = [
  { client: 'Acme Corp', seats: 500, active: 480, roiScore: 96, status: 'Upsell Ready' },
  { client: 'Stark Ind.', seats: 1200, active: 410, roiScore: 34, status: 'Adoption Risk' },
  { client: 'Globex', seats: 200, active: 150, roiScore: 75, status: 'Healthy' }
];

const SeatUtilizationWidget = ({ cohort, onOpenDrillDown }) => {
  return (
    <div className="glass-panel flex-col" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title">
          <Building2 size={20} />
          B2B Seat Utilization
        </div>
        <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>View All</button>
      </div>

      <div className="flex-row gap-4 mb-6">
        <div className="flex-col p-3 rounded-lg flex-1" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <span className="text-xs text-green-400 font-semibold" style={{ color: 'var(--status-success)' }}>TOTAL ACTIVE SEATS</span>
          <div className="text-2xl font-bold mt-1 text-white">14,289</div>
          <div className="text-xs text-gray-400 mt-1 flex-row items-center gap-1">
            <TrendingUp size={12} className="text-green-400" style={{ color: 'var(--status-success)' }}/> +4% vs last mo
          </div>
        </div>
      </div>

      <div className="flex-col gap-3" style={{ flex: 1, overflowY: 'auto' }}>
        <h4 className="text-sm font-semibold text-gray-300">Client Health Matrix</h4>
        
        {mockClientData.map((client, idx) => (
          <div 
            key={idx} 
            className="flex-col p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800" 
            style={{ backgroundColor: 'rgba(25, 25, 35, 0.4)', border: '1px solid var(--border-light)' }}
            onClick={() => onOpenDrillDown({ type: 'b2b_utilization', data: client })}
          >
            <div className="flex-row justify-between items-center mb-2">
              <span className="font-semibold text-white">{client.client}</span>
              <span className={`badge ${client.roiScore > 80 ? 'badge-success' : client.roiScore < 40 ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                {client.status}
              </span>
            </div>
            
            <div className="flex-row justify-between text-xs text-gray-400 mb-1" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex-row items-center gap-1"><Users size={12}/> {client.active} / {client.seats} Active Users</span>
              <span>{client.roiScore}% Utilization</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-gray-800" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${client.roiScore}%`, 
                  backgroundColor: client.roiScore > 80 ? 'var(--status-success)' : client.roiScore < 40 ? 'var(--status-danger)' : 'var(--status-warning)'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatUtilizationWidget;
