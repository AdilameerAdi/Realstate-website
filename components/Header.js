import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Helios Land Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-brand-dark-blue">
                Helios Land
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              Home
            </Link>
            <Link href="/commercial" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              Commercial
            </Link>
            <Link href="/residential" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              Residential
            </Link>
            <Link href="/sco-plots" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              SCO Plots
            </Link>
            <Link href="/about" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-brand-dark-blue hover:text-brand-gold transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="tel:+919811677423" className="btn btn-call btn-small">
              <Phone size={16} />
              Call Now
            </a>
            <a
              href="https://wa.me/919811677423"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-small"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-brand-light-gray py-2 px-4 rounded-lg mb-4">
          <div className="flex items-center justify-center text-sm text-brand-dark-blue">
            <Phone size={14} className="mr-2" />
            <span className="font-semibold">Contact: +91 98116 77423</span>
          </div>
        </div>
      </div>
    </header>
  );
}