import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Building,
  Users,
  Phone,
  Mail,
  Plus,
  Settings,
  LogOut,
  Home,
  FileText,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = ({ children, activeTab = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      href: '/admin'
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: Building,
      href: '/admin/properties'
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: Mail,
      href: '/admin/inquiries'
    },
    {
      id: 'add-property',
      label: 'Add Property',
      icon: Plus,
      href: '/admin/add-property'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark-blue transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>

        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-brand-dark-blue border-b border-blue-800">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-brand-gold" />
            <span className="ml-2 text-xl font-bold text-white">Helios Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-brand-gold"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-brand-gold text-brand-dark-blue'
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Logout */}
          <div className="mt-8 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 w-full p-4 bg-blue-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-dark-blue font-bold text-sm">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-300">admin@heliosland.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-600"
              >
                <Menu size={24} />
              </button>
              <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;