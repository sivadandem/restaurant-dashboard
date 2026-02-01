import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import OrdersPage from './pages/OrdersPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/menu" element={<MenuManagement />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#22c55e',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </Router>
    </AppProvider>
  );
}

export default App;