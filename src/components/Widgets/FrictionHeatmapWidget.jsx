import React from 'react';
import { Activity, BookOpen, Clock, MousePointerClick } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockCourseModules = [
  { module: '1. Introduction', timeOnPage: '4m 12s', completion: 98, frictionScore: 12 },
  { module: '2. Basic Syntax', timeOnPage: '18m 45s', completion: 85, frictionScore: 34 },
  { module: '3. Data Structures', timeOnPage: '45m 20s', completion: 62, frictionScore: 88 }, // High Friction
  { module: '4. Async Operations', timeOnPage: '52m 10s', completion: 45, frictionScore: 94 }, // High Friction
  { module: '5. Final Project', timeOnPage: '22m 05s', completion: 40, frictionScore: 45 }
];

const engagementTrendData = [
  { day: 'Mon', 'Data Structures': 45, 'Async Operations': 80 },
  { day: 'Tue', 'Data Structures': 52, 'Async Operations': 85 },
  { day: 'Wed', 'Data Structures': 48, 'Async Operations': 94 },
  { day: 'Thu', 'Data Structures': 70, 'Async Operations': 90 },
  { day: 'Fri', 'Data Structures': 88, 'Async Operations': 82 },
];

const FrictionHeatmapWidget = ({ cohort, onOpenDrillDown }) => {
  return (
    <div className="glass-panel">
      <div className="widget-header">
        <div className="widget-title">
          <Activity size={20} />
          Content Friction & Drop-off Analysis
        </div>
        <div className="flex-row gap-2">
          <span className="text-sm text-gray-400 flex-row items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <MousePointerClick size={14}/> GA4 Event Stream
          </span>
          <span className="text-sm text-gray-400 flex-row items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <BookOpen size={14}/> Backend Assessments
          </span>
        </div>
      </div>

      <div className="flex-row gap-6">
        {/* Module List / Heatmap Mock */}
        <div className="flex-col gap-2" style={{ flex: 1.5 }}>
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Module Performance Matrix</h4>
          
          <div className="flex-col gap-2">
            {mockCourseModules.map((mod, idx) => (
              <div 
                key={idx} 
                className="flex-row items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800"
                style={{ 
                  backgroundColor: mod.frictionScore > 80 ? 'rgba(239, 68, 68, 0.1)' : mod.frictionScore > 50 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(25, 25, 35, 0.4)',
                  border: `1px solid ${mod.frictionScore > 80 ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-light)'}` 
                }}
                onClick={() => onOpenDrillDown({ type: 'content_friction', data: mod })}
              >
                <div className="flex-1 font-medium text-white">{mod.module}</div>
                
                <div className="flex-1 flex-row items-center justify-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Clock size={14}/> {mod.timeOnPage} avg
                </div>
                
                <div className="flex-1 flex-col items-end">
                  <div className="text-sm font-bold" style={{ color: mod.completion < 60 ? 'var(--status-danger)' : 'white' }}>
                    {mod.completion}% Complete
                  </div>
                  <div className="w-24 h-1.5 rounded-full mt-1 bg-gray-800" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${mod.completion}%`, 
                        backgroundColor: mod.completion < 60 ? 'var(--status-danger)' : 'var(--status-success)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friction Trend Chart */}
        <div className="flex-col" style={{ flex: 1 }}>
          <h4 className="text-sm font-semibold text-gray-300 mb-4">High Friction Trend (Pause/Rewind Events)</h4>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--status-warning)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--status-warning)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAsync" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--status-danger)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--status-danger)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="Data Structures" stroke="var(--status-warning)" fillOpacity={1} fill="url(#colorDs)" />
                <Area type="monotone" dataKey="Async Operations" stroke="var(--status-danger)" fillOpacity={1} fill="url(#colorAsync)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
            Spike in video pauses & rewinds correlates with 38% assessment failure rate in "Async Operations".
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrictionHeatmapWidget;
