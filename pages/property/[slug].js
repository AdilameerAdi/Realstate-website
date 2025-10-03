import Head from 'next/head';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { propertyService, inquiryService } from '../../lib/supabase';
import { Phone, MessageCircle, MapPin, Bed, Bath, Square, Calendar, Download, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PropertyDetail({ property }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit to Supabase
      const inquiryData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        property_type: property.type,
        message: `Property Interest: ${property.title}\n\nMessage: ${formData.message}`
      };

      const result = await inquiryService.addInquiry(inquiryData);

      if (result.error) {
        console.error('Supabase error:', result.error);
        alert('Thank you for your inquiry! We will contact you soon. (Note: Database storage pending)');
      } else {
        alert('Thank you for your inquiry! We have received your details and will contact you soon.');
      }

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Thank you for your inquiry! We will contact you soon.');

      // Reset form even if there's an error
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    }
  };

  const handleScheduleVisit = () => {
    const message = `Hi, I would like to schedule a site visit for ${property.title}. Please let me know available dates.`;
    window.open(`https://wa.me/919811677423?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadBrochure = () => {
    alert('Brochure download will be available soon!');
  };

  return (
    <Layout>
      <Head>
        <title>{property.title} - Helios Land</title>
        <meta name="description" content={`${property.title} in ${property.location}. Price: ${property.price}. Premium real estate property by Helios Land.`} />
      </Head>

      {/* Property Header */}
      <section className="py-8 bg-brand-light-gray">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-2" />
                <span>{property.location}</span>
              </div>
              <div className="text-2xl font-bold text-brand-gold">
                {property.price}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <button
                onClick={handleScheduleVisit}
                className="btn btn-primary"
              >
                <Calendar size={18} />
                Schedule Visit
              </button>
              <button
                onClick={handleDownloadBrochure}
                className="btn btn-call"
              >
                <Download size={18} />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Image */}
              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded text-sm font-semibold">
                  {property.type.toUpperCase()}
                </div>
                {property.featured && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Property Specifications */}
              {property.bedrooms && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Bed size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Bath size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <Square size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">{property.area}</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="bg-brand-light-gray p-4 rounded-lg text-center">
                    <MapPin size={24} className="mx-auto mb-2 text-brand-gold" />
                    <div className="font-semibold text-brand-dark-blue">{property.type}</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Property Description</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Experience luxury living at {property.title}, located in the heart of {property.location}.
                    This premium property offers exceptional value and modern amenities designed for contemporary lifestyle.
                  </p>
                  <p>
                    With strategic location advantages and world-class infrastructure, this property represents
                    an excellent investment opportunity in Gurgaon's rapidly growing real estate market.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Prime location in {property.location}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Modern architecture and design
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Excellent connectivity
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      High-quality construction
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      24/7 security
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Power backup
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Ample parking space
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                      Investment potential
                    </li>
                  </ul>
                </div>
              </div>

              {/* Location Advantages */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Location Advantages</h2>
                <div className="bg-brand-light-gray p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-brand-dark-blue mb-2">Connectivity</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Metro station nearby</li>
                        <li>• Major highway access</li>
                        <li>• Airport connectivity</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-dark-blue mb-2">Amenities</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Shopping malls</li>
                        <li>• Educational institutions</li>
                        <li>• Healthcare facilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Get More Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  ></textarea>
                  <button type="submit" className="w-full btn btn-primary">
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Quick Contact */}
              <div className="bg-brand-light-gray p-6 rounded-lg">
                <h3 className="text-lg font-bold text-brand-dark-blue mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a href="tel:+919811677423" className="flex items-center w-full btn btn-call">
                    <Phone size={18} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919811677423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full btn btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;

    // Fetch from Supabase database
    const result = await propertyService.getAllProperties();

    if (result.error) {
      console.error('Supabase error:', result.error);
      return {
        props: {
          property: null,
          error: 'Database connection error.',
        },
      };
    }

    // Find property by slug
    const property = result.data?.find(p => p.slug === slug);

    if (!property) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        property,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return {
      notFound: true,
    };
  }
}