import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Building, Edit, Trash2, Eye, Plus, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { propertyService } from '../../lib/supabase';
import { allProperties } from '../../data/properties';

export default function PropertiesManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const result = await propertyService.getAllProperties();

      // Use fallback data if Supabase is not configured
      const propertiesData = result.data?.length > 0 ? result.data : allProperties;
      setProperties(propertiesData);
    } catch (error) {
      console.error('Error loading properties:', error);
      // Use static data as fallback
      setProperties(allProperties);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.deleteProperty(id);
        setProperties(properties.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property. Please try again.');
      }
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <AdminLayout activeTab="properties">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeTab="properties">
      <Head>
        <title>Properties Management - Helios Land Admin</title>
      </Head>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties Management</h1>
          <p className="text-gray-600">Manage all your real estate properties</p>
        </div>
        <a
          href="/admin/add-property"
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add New Property
        </a>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="all">All Types</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="sco">SCO Plots</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-brand-dark-blue">
            All Properties ({filteredProperties.length})
          </h2>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={property.image}
                          alt={property.title}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                        property.type === 'residential' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.featured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {property.externalLink ? (
                        <a
                          href={property.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </a>
                      ) : (
                        <a
                          href={`/property/${property.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterType !== 'all'
                ? 'No properties match your search criteria.'
                : 'Get started by adding your first property.'}
            </p>
            <a
              href="/admin/add-property"
              className="btn btn-primary"
            >
              <Plus size={20} />
              Add New Property
            </a>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-brand-dark-blue">
            {properties.filter(p => p.type === 'commercial').length}
          </div>
          <div className="text-sm text-gray-600">Commercial Properties</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-brand-dark-blue">
            {properties.filter(p => p.type === 'residential').length}
          </div>
          <div className="text-sm text-gray-600">Residential Properties</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-brand-dark-blue">
            {properties.filter(p => p.type === 'sco').length}
          </div>
          <div className="text-sm text-gray-600">SCO Plots</div>
        </div>
      </div>
    </AdminLayout>
  );

  function handleEdit(id) {
    // Navigate to edit page
    window.location.href = `/admin/edit-property/${id}`;
  }
}