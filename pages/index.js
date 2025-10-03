import Head from 'next/head';
import Layout from '../components/Layout';
import PropertySlider from '../components/PropertySlider';
import { propertyService } from '../lib/supabase';
import { Phone, MessageCircle, TrendingUp, Shield, Award } from 'lucide-react';

export default function Home({ properties, error }) {
  // Show error state if database connection fails
  if (error) {
    return (
      <Layout>
        <Head>
          <title>Helios Land - Premium Real Estate in Gurgaon</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Please ensure Supabase is configured and the database schema is set up.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Separate properties by type
  const commercial = properties.filter(p => p.type === 'commercial');
  const residential = properties.filter(p => p.type === 'residential');
  const featured = properties.filter(p => p.type === 'sco' || p.featured);
  return (
    <Layout>
      <Head>
        <title>Helios Land - Premium Real Estate in Gurgaon | SCO Plots, Commercial & Residential</title>
        <meta name="description" content="Discover premium real estate opportunities in Gurgaon with Helios Land. Specializing in SCO plots, commercial spaces, and luxury residential properties." />
      </Head>

      {/* Hero Banner */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/header.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-dark-blue bg-opacity-75"></div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Premium Real Estate in <span className="text-brand-gold">Gurgaon</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 text-white font-light">
              Discover exceptional SCO plots, commercial spaces, and luxury residential properties
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="tel:+919811677423" className="btn btn-primary btn-large transform hover:scale-105">
                <Phone size={24} />
                Call +91 98116 77423
              </a>
              <a
                href="https://wa.me/919811677423"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-large bg-white text-brand-dark-blue hover:bg-brand-gold hover:text-white border-2 border-white transform hover:scale-105"
              >
                <MessageCircle size={24} />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-light-gray">
        <div className="container">
          <h2 className="section-title">Why Choose Helios Land?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Proven Returns</h3>
              <p className="text-gray-600">Consistent high returns on investment with carefully selected properties in prime locations.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Trusted Service</h3>
              <p className="text-gray-600">Years of experience and thousands of satisfied clients trust us for their real estate needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-blue mb-2">Premium Properties</h3>
              <p className="text-gray-600">Handpicked premium properties in Gurgaon's most sought-after locations and developments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured SCO Projects */}
      <PropertySlider
        title="Featured SCO Projects"
        properties={featured}
      />

      {/* Commercial Properties */}
      <PropertySlider
        title="Commercial Properties"
        properties={commercial}
      />

      {/* Residential Properties */}
      <PropertySlider
        title="Residential Properties"
        properties={residential}
      />

      {/* SCO Plots Information Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">SCO (SHOP CUM OFFICE) PLOTS</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Helios Land presents a prime investment in one of India's most robust real estate markets:
                Shop-Cum-Office (SCO) Plots in Gurugram.
              </p>
              <p>
                Driven by accelerated urbanization and its status as a hub for over 500 Fortune companies,
                Gurugram offers a fertile ground for commercial asset appreciation. This unique SCO concept,
                approved under the Haryana Government's New Commercial Plotted Colony Policy, allows for
                the development of independent, multi-story commercial properties (B+G+4).
              </p>

              <div className="bg-brand-light-gray p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Key Investment Highlights:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">•</span>
                    <span><strong>Asset Class:</strong> Plotted commercial development with 100% land ownership.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">•</span>
                    <span><strong>High Demand:</strong> Caters to the modern, integrated lifestyle of working, shopping, and dining.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">•</span>
                    <span><strong>Location Advantage:</strong> Positioned in Gurugram's designated growth corridors.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">•</span>
                    <span><strong>Versatile Revenue Streams:</strong> Ideal for high-street retail, corporate offices, and F&B outlets.</span>
                  </li>
                </ul>
              </div>

              <p className="mt-6">
                As specialists in SCO and residential properties, <span className="text-brand-gold font-semibold">Helios Land</span> provides access to the most
                lucrative plots with exclusive offers. Connect with us to explore this unparalleled investment opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-dark-blue text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest in Your Future?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Contact our experts today for personalized real estate solutions in Gurgaon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919811677423" className="btn btn-primary btn-large">
                <Phone size={20} />
                Call Now
              </a>
              <a
                href="https://wa.me/919811677423"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-large"
              >
                <MessageCircle size={20} />
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch from Supabase database only
    const result = await propertyService.getAllProperties();

    if (result.error) {
      console.error('Supabase error:', result.error);
      return {
        props: {
          properties: [],
          error: 'Database connection error. Please check Supabase configuration.',
        },
      };
    }

    return {
      props: {
        properties: result.data || [],
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      props: {
        properties: [],
        error: 'Failed to load properties from database.',
      },
    };
  }
}