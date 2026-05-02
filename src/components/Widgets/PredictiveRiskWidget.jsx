import React from 'react';
import { AlertTriangle, MailWarning, UserMinus } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const mockRiskData = [
  { id: 'U-8271', name: 'Sarah J.', riskScore: 88, daysToRenewal: 12, dropReason: '0 logins in 14d', severity: 'high' },
  { id: 'U-9102', name: 'Alex M.', riskScore: 75, daysToRenewal: 4, dropReason: 'Low assessment score', severity: 'high' },
  { id: 'U-3341', name: 'Dev P.', riskScore: 62, daysToRenewal: 21, dropReason: 'Paused course at 20%', severity: 'medium' },
  { id: 'U-5529', name: 'Maria C.', riskScore: 58, daysToRenewal: 45, dropReason: 'Decreased viewing time', severity: 'medium' }
];

const riskChartData = [
  { cohort: '0-25%', users: 450 },
  { cohort: '26-50%', users: 320 },
  { cohort: '51-75%', users: 150 },
  { cohort: '76-100%', users: 80 } // High risk
];

const PredictiveRiskWidget = ({ cohort, onOpenDrillDown }) => {
  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title">
          <UserMinus size={20} />
          Predictive Churn Risk Indicator
        </div>
        <div className="badge badge-danger">80 High Risk Learners</div>
      </div>

      <div className="flex-row gap-6" style={{ flex: 1 }}>
        <div className="flex-col" style={{ flex: 1 }}>
          <p className="text-sm text-gray-400 mb-4" style={{ color: 'var(--text-muted)' }}>
            AI-driven risk scoring blending engagement drops (GA4) with subscription expiry data (Backend).
          </p>
          
          <div style={{ height: '180px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="cohort" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'var(--bg-secondary)' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }} />
                <Bar dataKey="users" radius={[4, 4, 0, 0]}>
                  {riskChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? 'var(--status-danger)' : index === 2 ? 'var(--status-warning)' : 'var(--accent-primary)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-col" style={{ flex: 1.2, gap: '0.75rem', overflowY: 'auto', maxHeight: '240px', paddingRight: '0.5rem' }}>
          <h4 className="text-sm font-semibold text-gray-300">Action Required: Highest Risk Accounts</h4>
          {mockRiskData.map(user => (
            <div key={user.id} className="flex-row justify-between items-center bg-gray-900 rounded-lg p-3" style={{ backgroundColor: 'rgba(25, 25, 35, 0.4)', border: '1px solid var(--border-light)' }}>
              <div className="flex-col">
                <div className="flex-row items-center gap-2">
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-xs text-gray-500">({user.id})</span>
                  {user.severity === 'high' && <AlertTriangle size={14} className="text-red-500" style={{ color: 'var(--status-danger)' }}/>}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {user.dropReason} • <span style={{ color: user.daysToRenewal < 14 ? 'var(--status-danger)' : 'inherit' }}>Renews in {user.daysToRenewal}d</span>
                </div>
              </div>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                onClick={() => onOpenDrillDown({ type: 'user_risk', data: user })}
              >
                <MailWarning size={14} />
                Intervene
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveRiskWidget;
