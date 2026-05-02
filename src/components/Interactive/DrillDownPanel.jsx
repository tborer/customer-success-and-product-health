import React from 'react';
import { X, Search, ChevronRight, Zap } from 'lucide-react';

const DrillDownPanel = ({ data, isOpen, onClose }) => {
  if (!data) return null;

  return (
    <>
      <div className={`drill-down-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`drill-down-panel ${isOpen ? 'open' : ''}`}>
        <div className="drill-down-header">
          <div className="flex-col">
            <span className="text-sm uppercase tracking-wider text-gray-400 font-bold" style={{ color: 'var(--accent-primary)' }}>
              Root Cause Isolation
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">
              {data.type === 'user_risk' ? `Learner: ${data.data.name}` : 
               data.type === 'content_friction' ? `Module: ${data.data.module}` : 
               `Client: ${data.data.client}`}
            </h2>
          </div>
          <button className="btn btn-outline" onClick={onClose} style={{ padding: '0.5rem', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div className="drill-down-content">
          {/* Contextual view based on what was clicked */}
          
          {data.type === 'content_friction' && (
            <div className="animate-fade-in">
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Isolating variables driving the <strong>{data.data.completion}% completion rate</strong>. Blended GA4 + Backend data.
              </p>

              <div className="flex-row gap-4 mb-6">
                <div className="metric-card flex-1">
                  <div className="text-xs text-gray-400 uppercase">Avg Time</div>
                  <div className="metric-value">{data.data.timeOnPage}</div>
                  <div className="metric-trend trend-down mt-1">↑ 45% vs avg</div>
                </div>
                <div className="metric-card flex-1">
                  <div className="text-xs text-gray-400 uppercase">Quiz Pass Rate</div>
                  <div className="metric-value">42%</div>
                  <div className="metric-trend trend-down mt-1">↓ 22% drop</div>
                </div>
              </div>

              <h3 className="text-md font-semibold text-white mb-3 flex-row items-center gap-2">
                <Search size={16} color="var(--accent-primary)" /> Variable Isolation
              </h3>
              
              <div className="glass-panel" style={{ padding: '1rem' }}>
                <div className="flex-row justify-between py-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Browser: Safari</span>
                  <span className="text-sm text-red-400" style={{ color: 'var(--status-danger)' }}>65% Error Rate</span>
                </div>
                <div className="flex-row justify-between py-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Device: Mobile (iOS)</span>
                  <span className="text-sm text-red-400" style={{ color: 'var(--status-danger)' }}>82% Drop-off</span>
                </div>
                <div className="flex-row justify-between py-2">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Event: Video Player</span>
                  <span className="text-sm text-yellow-400" style={{ color: 'var(--status-warning)' }}>High Rewind Count</span>
                </div>
              </div>

              <div className="mt-8 bg-gray-900 p-4 rounded-lg border border-indigo-500" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                <h4 className="text-sm font-bold text-white mb-2 flex-row items-center gap-2">
                  <Zap size={16} color="var(--accent-primary)" /> Suggested Actions
                </h4>
                <ul className="text-sm text-gray-300 ml-5 list-disc" style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
                  <li className="mb-2">Create ticket for Engineering: Investigate Safari video playback bug.</li>
                  <li className="mb-2">Notify Content Team: Review module script for complexity (high rewind rate).</li>
                </ul>
                <button className="btn btn-primary w-full mt-4 justify-center">
                  Execute Workflows <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {data.type === 'b2b_utilization' && (
            <div className="animate-fade-in">
               <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Reviewing institutional seat usage for <strong>{data.data.client}</strong> to prep for Q3 QBR.
              </p>
               <div className="flex-row gap-4 mb-6">
                <div className="metric-card flex-1">
                  <div className="text-xs text-gray-400 uppercase">Licenses Used</div>
                  <div className="metric-value">{data.data.active}/{data.data.seats}</div>
                </div>
                <div className="metric-card flex-1" style={{ borderColor: data.data.roiScore < 50 ? 'rgba(239, 68, 68, 0.5)' : 'var(--border-light)' }}>
                  <div className="text-xs text-gray-400 uppercase">ROI Health</div>
                  <div className="metric-value" style={{ color: data.data.roiScore < 50 ? 'var(--status-danger)' : 'white' }}>{data.data.roiScore}%</div>
                </div>
              </div>

              <button className="btn btn-primary w-full justify-center">
                Send Adoption Report to Admin <ChevronRight size={16} />
              </button>
            </div>
          )}

          {data.type === 'user_risk' && (
             <div className="animate-fade-in">
               <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Analyzing drop-off patterns for <strong>{data.data.name}</strong>.
              </p>
              <div className="glass-panel mb-6" style={{ padding: '1rem' }}>
                <div className="text-sm font-bold mb-2">Churn Risk Factors:</div>
                <div className="text-sm text-red-400 mb-1 flex-row items-center gap-2" style={{ color: 'var(--status-danger)' }}>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div> {data.data.dropReason}
                </div>
                <div className="text-sm text-yellow-400 mb-1 flex-row items-center gap-2" style={{ color: 'var(--status-warning)' }}>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Upcoming renewal in {data.data.daysToRenewal} days
                </div>
              </div>

              <button className="btn btn-outline w-full justify-center border-indigo-500 text-indigo-400 hover:bg-indigo-900" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>
                Trigger 20% Discount Email <ChevronRight size={16} />
              </button>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DrillDownPanel;
