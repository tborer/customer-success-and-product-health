import React, { useState } from 'react';
import './App.css';
import DashboardLayout from './components/Layout/DashboardLayout';
import FilterBar from './components/Interactive/FilterBar';
import PredictiveRiskWidget from './components/Widgets/PredictiveRiskWidget';
import FrictionHeatmapWidget from './components/Widgets/FrictionHeatmapWidget';
import SeatUtilizationWidget from './components/Widgets/SeatUtilizationWidget';
import DrillDownPanel from './components/Interactive/DrillDownPanel';

function App() {
  const [cohort, setCohort] = useState('all');
  const [drillDownData, setDrillDownData] = useState(null);

  const handleOpenDrillDown = (data) => {
    setDrillDownData(data);
  };

  const handleCloseDrillDown = () => {
    setDrillDownData(null);
  };

  return (
    <div className="app-container">
      <DashboardLayout>
        <FilterBar currentCohort={cohort} onCohortChange={setCohort} />
        
        <div className="dashboard-grid">
          {/* FR-2.0: Predictive Learner Risk Indicator */}
          <div className="col-span-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <PredictiveRiskWidget cohort={cohort} onOpenDrillDown={handleOpenDrillDown} />
          </div>

          {/* FR-2.2: Seat Utilization & ROI Tracker */}
          <div className="col-span-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SeatUtilizationWidget cohort={cohort} onOpenDrillDown={handleOpenDrillDown} />
          </div>

          {/* FR-2.1: Content Friction Heatmap */}
          <div className="col-span-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <FrictionHeatmapWidget cohort={cohort} onOpenDrillDown={handleOpenDrillDown} />
          </div>
        </div>
      </DashboardLayout>

      {/* FR-3.1: "Root Cause" Drill-Down */}
      <DrillDownPanel 
        data={drillDownData} 
        isOpen={!!drillDownData} 
        onClose={handleCloseDrillDown} 
      />
    </div>
  );
}

export default App;
