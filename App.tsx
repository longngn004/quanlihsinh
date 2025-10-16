import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/views/Dashboard';
import SystemAnalytics from './components/views/SystemAnalytics';
import AIAssistant from './components/views/AIAssistant';
import ProsCons from './components/views/ProsCons';
import ProjectPlan from './components/views/ProjectPlan';
import Privacy from './components/views/Privacy';
import Login from './components/Login';
import StudentDashboard from './components/views/StudentDashboard';
import { useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import type { View } from './types';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'plan':
        return <ProjectPlan />;
      case 'analytics':
        return <SystemAnalytics />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'pros-cons':
        return <ProsCons />;
      case 'privacy':
        return <Privacy />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};


const App: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (user.role === UserRole.STUDENT) {
    return <StudentDashboard />;
  }

  return <AppContent />;
};

export default App;