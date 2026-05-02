import React, { useState } from 'react';
import { LayoutDashboard, Bell, Search, Settings, ShieldAlert } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [role, setRole] = useState('pm'); // Internal PM vs B2B Client mock

  return (
    <div className="flex-col" style={{ flex: 1 }}>
      {/* Global Alert Mock (FR-4.0 context) */}
      <div className="bg-red-500 text-white px-4 py-2 flex-row justify-center items-center gap-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <ShieldAlert size={16} className="text-red-400" />
        <span className="text-sm font-medium" style={{ color: '#fca5a5' }}>Automated Alert: 15% drop in completion rates for "Intro to Python" cohort over last 48 hours.</span>
      </div>

      {/* Top Navigation Bar */}
      <nav className="flex-row justify-between items-center px-6 py-4 border-b border-gray-800" style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex-row items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <h1 className="text-xl font-bold ml-2">Customer Metrics and Product Health Hub</h1>
        </div>

        <div className="flex-row items-center gap-6">
          <div className="flex-row items-center gap-2 glass-panel" style={{ padding: '0.4rem 1rem', borderRadius: '20px' }}>
            <Search size={16} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search user or institution..." 
              style={{ background: 'transparent', border: 'none', padding: 0, width: '200px' }} 
            />
          </div>

          <div className="flex-row items-center gap-4">
            <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
              <Bell size={18} />
            </button>
            <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
              <Settings size={18} />
            </button>
            
            <div className="h-8 w-px bg-gray-800" style={{ backgroundColor: 'var(--border-light)', width: '1px', height: '2rem' }}></div>
            
            {/* FR-1.2: Role-Based Access Control Mock Selector */}
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="text-sm font-medium"
              style={{ padding: '0.4rem 2rem 0.4rem 1rem' }}
            >
              <option value="pm">Internal PM View</option>
              <option value="cs">Customer Success View</option>
              <option value="b2b">B2B Client View (Acme Corp)</option>
            </select>
            
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-col flex-1" style={{ background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%)' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
