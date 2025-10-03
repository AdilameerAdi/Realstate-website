import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Save, ArrowLeft, Upload } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { propertyService } from '../../lib/supabase';

export default function AddProperty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('/images/placeholder.svg');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'commercial',
    image: '/images/placeholder.svg',
    slug: '',
    external_link: '',
    featured: false,
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    specifications: '',
    special_offer: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target.result;
        setImagePreview(previewUrl);
        setFormData(prev => ({ ...prev, image: previewUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare property data
      const propertyData = {
        ...formData,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      };

      console.log('Submitting property data:', propertyData);

      // Try to add to Supabase
      const result = await propertyService.addProperty(propertyData);

      console.log('Supabase result:', result);

      if (result.error) {
        console.error('Supabase error details:', result.error);
        alert(`Database error: ${result.error.message || 'Please run the SQL schema in Supabase dashboard first.'}`);
        return;
      }

      if (result.data) {
        alert('Property added successfully!');
        router.push('/admin/properties');
      } else {
        alert('Property submission failed. Please check database configuration.');
      }

    } catch (error) {
      console.error('Error adding property:', error);
      alert(`Error: ${error.message || 'Please ensure Supabase is configured and database schema is set up.'}`);
    } finally {
      setLoading(false);
    }
  };

  const propertyTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'sco', label: 'SCO Plot' }
  ];

  return (
    <AdminLayout activeTab="add-property">
      <Head>
        <title>Add New Property - Helios Land Admin</title>
      </Head>

      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-gray-600">Create a new property listing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-brand-dark-blue mb-4">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="e.g., M3M Market 84 SCO Plots"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="e.g., Sector 84, Gurgaon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="e.g., ₹2,25,00,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="Auto-generated from title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    External Link
                  </label>
                  <input
                    type="url"
                    name="external_link"
                    value={formData.external_link}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="https://example.com/property-details"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Featured Property
                  </span>
                </label>
              </div>
            </div>

            {/* Property Details */}
            {formData.type === 'residential' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-brand-dark-blue mb-4">Property Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      placeholder="e.g., 3,500 sq ft"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-brand-dark-blue mb-4">Description & Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="Property description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications
                  </label>
                  <textarea
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="Size Range: 70-127 SQYD, B+G+4+Terrace..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Offer
                  </label>
                  <input
                    type="text"
                    name="special_offer"
                    value={formData.special_offer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="EOI PRICE: ₹2.70 Cr (All Inclusive) + GST"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-brand-dark-blue mb-4">Property Image</h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Upload property image
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or use Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image === imagePreview ? '' : formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-brand-dark-blue mb-4">Preview</h2>

              <div className="border rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Property preview"
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 truncate">
                    {formData.title || 'Property Title'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formData.location || 'Location'}
                  </p>
                  <p className="text-lg font-bold text-brand-gold">
                    {formData.price || 'Price'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Property
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/admin/properties')}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}