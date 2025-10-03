import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertySlider({ title, properties }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 320; // Width of one card plus margin

    if (direction === 'left') {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }

    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        slider.scrollLeft < slider.scrollWidth - slider.clientWidth
      );
    }, 300);
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth
    );
  };

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`slider-btn ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`slider-btn ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="slider-container"
          onScroll={handleScroll}
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSlider={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}