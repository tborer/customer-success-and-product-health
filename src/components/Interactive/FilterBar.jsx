import React from 'react';
import { Filter, Download, Calendar, ArrowUpRight } from 'lucide-react';

const FilterBar = ({ currentCohort, onCohortChange }) => {
  return (
    <div className="flex-row justify-between items-center" style={{ padding: '1.5rem 1.5rem 0', gap: '1rem' }}>
      <div className="flex-row gap-4 items-center">
        <div className="glass-panel flex-row items-center gap-2" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <Filter size={16} color="var(--accent-primary)" />
          <span className="text-sm font-medium text-gray-400">Cohort Segment:</span>
          <select 
            value={currentCohort} 
            onChange={(e) => onCohortChange(e.target.value)}
            style={{ background: 'transparent', border: 'none', padding: '0 0.5rem', fontWeight: 600, color: 'white' }}
          >
            <option value="all">All Active Users</option>
            <option value="b2c-pro">B2C - Pro Tier</option>
            <option value="b2b-enterprise">B2B - Enterprise</option>
            <option value="acquisition-organic">Acquisition: Organic Search</option>
          </select>
        </div>

        <div className="glass-panel flex-row items-center gap-2" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
          <Calendar size={16} color="var(--text-muted)" />
          <select style={{ background: 'transparent', border: 'none', padding: '0 0.5rem', color: 'var(--text-secondary)' }}>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
      </div>

      <div className="flex-row gap-3">
        <button className="btn btn-outline">
          <Download size={16} />
          Export Cohort CSV
        </button>
        <button className="btn btn-primary">
          <ArrowUpRight size={16} />
          Sync to HubSpot CRM
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
