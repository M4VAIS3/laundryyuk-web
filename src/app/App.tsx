import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { CustomerManagement } from './components/CustomerManagement';
import { ServiceManagement } from './components/ServiceManagement';
import { TransactionManagement } from './components/TransactionManagement';
import { RelationDisplay } from './components/RelationDisplay';
import { Statistics } from './components/Statistics';
import { 
  Users, 
  Shirt, 
  Receipt, 
  Network, 
  BarChart3,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';

export type MenuItem = 
  | 'dashboard'
  | 'customers' 
  | 'services' 
  | 'transactions' 
  | 'relations' 
  | 'statistics';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers' as MenuItem, label: 'Customer', icon: Users },
    { id: 'services' as MenuItem, label: 'Layanan', icon: Shirt },
    { id: 'transactions' as MenuItem, label: 'Transaksi', icon: Receipt },
    { id: 'relations' as MenuItem, label: 'Relasi', icon: Network },
    { id: 'statistics' as MenuItem, label: 'Statistik', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveMenu} />;
      case 'customers':
        return <CustomerManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'transactions':
        return <TransactionManagement />;
      case 'relations':
        return <RelationDisplay />;
      case 'statistics':
        return <Statistics />;
      default:
        return <Dashboard onNavigate={setActiveMenu} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">LaundrYuk!</h1>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-white text-blue-600'
                      : 'hover:bg-blue-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Sistem Administrasi LaundrYuk!
                </h2>
                <p className="text-sm text-gray-500">
                  Kelola bisnis laundry Anda dengan mudah
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-xs text-gray-400">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
