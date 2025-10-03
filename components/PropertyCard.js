import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

export default function PropertyCard({ property, isSlider = false }) {
  const cardClasses = isSlider
    ? "property-slide property-card"
    : "property-card";

  return (
    <div className={cardClasses}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {property.featured && (
          <div className="absolute top-2 left-2 bg-brand-gold text-white px-2 py-1 rounded text-sm font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 bg-brand-dark-blue text-white px-2 py-1 rounded text-sm capitalize">
          {property.type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-dark-blue mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {property.bedrooms && (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Bed size={14} className="mr-1" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center">
              <Bath size={14} className="mr-1" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center">
              <Square size={14} className="mr-1" />
              <span>{property.area}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="text-brand-gold font-bold text-lg">
            {property.price}
          </div>
          {property.external_link ? (
            <a
              href={property.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-small"
            >
              View Details
            </a>
          ) : (
            <Link
              href={`/property/${property.slug}`}
              className="btn btn-primary btn-small"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}