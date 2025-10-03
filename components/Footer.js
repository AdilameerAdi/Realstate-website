import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark-blue text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-brand-gold mb-4">Helios Land</h3>
            <p className="text-gray-300 mb-4">
              Premium real estate solutions in Gurgaon. Your trusted partner for commercial,
              residential, and SCO plot investments.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/heliosland"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold text-brand-dark-blue p-2 rounded-full hover:bg-yellow-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-brand-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/commercial" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Commercial Properties
                </a>
              </li>
              <li>
                <a href="/residential" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Residential Properties
                </a>
              </li>
              <li>
                <a href="/sco-plots" className="text-gray-300 hover:text-brand-gold transition-colors">
                  SCO Plots
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-brand-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-brand-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-brand-gold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="mr-3 text-brand-gold" />
                <span className="text-gray-300">+91 98116 77423</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-3 text-brand-gold" />
                <span className="text-gray-300">info@heliosland.com</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-3 text-brand-gold mt-1" />
                <span className="text-gray-300">Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Helios Land. All rights reserved. | Premium Real Estate Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}