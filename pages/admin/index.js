import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Building, Users, Phone, Mail, TrendingUp, Eye, AlertCircle, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { propertyService, inquiryService } from '../../lib/supabase';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    newInquiries: 0,
    featuredProperties: 0
  });
  const [loading, setLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication - in real app, use proper authentication
    if (loginData.username === 'admin' && loginData.password === 'helios2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load properties and inquiries
      const [propertiesResult, inquiriesResult] = await Promise.all([
        propertyService.getAllProperties(),
        inquiryService.getAllInquiries()
      ]);

      // Use fallback data if Supabase is not configured
      const propertiesData = propertiesResult.data || [];
      const inquiriesData = inquiriesResult.data || [
        {
          id: 1,
          name: 'John Doe',
          phone: '+91 9876543210',
          email: 'john@example.com',
          property_type: 'SCO Plots',
          message: 'Interested in SCO plots in Sector 84',
          created_at: '2024-01-15',
          status: 'New'
        },
        {
          id: 2,
          name: 'Jane Smith',
          phone: '+91 9876543211',
          email: 'jane@example.com',
          property_type: 'Commercial',
          message: 'Looking for office space in Cyber City',
          created_at: '2024-01-14',
          status: 'Contacted'
        }
      ];

      setProperties(propertiesData);
      setInquiries(inquiriesData);

      // Calculate stats
      setStats({
        totalProperties: propertiesData.length,
        totalInquiries: inquiriesData.length,
        newInquiries: inquiriesData.filter(i => i.status === 'New').length,
        featuredProperties: propertiesData.filter(p => p.featured).length
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-light-gray flex items-center justify-center">
        <Head>
          <title>Admin Login - Helios Land</title>
        </Head>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <Building className="mx-auto h-12 w-12 text-brand-gold mb-4" />
            <h1 className="text-2xl font-bold text-brand-dark-blue">Admin Login</h1>
            <p className="text-gray-600">Helios Land Administration</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="w-full btn btn-primary">
              Login to Admin Panel
            </button>
          </form>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
            <strong>Demo Credentials:</strong><br />
            Username: admin<br />
            Password: helios2024
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <AdminLayout activeTab="dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeTab="dashboard">
      <Head>
        <title>Admin Dashboard - Helios Land</title>
      </Head>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-brand-gold p-3 rounded-full">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-2xl font-semibold text-brand-dark-blue">{stats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-2xl font-semibold text-brand-dark-blue">{stats.totalInquiries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Inquiries</p>
              <p className="text-2xl font-semibold text-brand-dark-blue">{stats.newInquiries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured Properties</p>
              <p className="text-2xl font-semibold text-brand-dark-blue">{stats.featuredProperties}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-brand-dark-blue">Recent Inquiries</h2>
          </div>
          <div className="p-6">
            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-600">{inquiry.property_type}</p>
                      <p className="text-xs text-gray-500">{inquiry.created_at}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'New' ? 'bg-red-100 text-red-800' :
                      inquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No inquiries yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-brand-dark-blue">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <a
              href="/admin/add-property"
              className="block w-full btn btn-primary text-center"
            >
              Add New Property
            </a>
            <a
              href="/admin/properties"
              className="block w-full btn btn-call text-center"
            >
              Manage Properties
            </a>
            <a
              href="/admin/inquiries"
              className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-center"
            >
              View All Inquiries
            </a>
          </div>

          {/* Database Status */}
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Database Status</h3>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Demo Mode (Configure Supabase for live data)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase Setup Instructions */}
      {stats.totalProperties === 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Setup Supabase Database</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>To enable live data management:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create a Supabase project</li>
                  <li>Add your Supabase URL and API key to environment variables</li>
                  <li>Run the SQL commands to create tables</li>
                  <li>Start adding properties through the admin panel</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}