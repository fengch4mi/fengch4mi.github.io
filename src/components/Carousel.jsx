import { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';
function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 900) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  return (
    <div className="ui-carousel-container">
      <button 
        className="carousel-btn prev-btn" 
        onClick={goToPrev}
        disabled={currentIndex === 0}
        aria-label="Previous"
      >
        ❮
      </button>
      
      <div className="ui-carousel-wrapper">
        <div 
          className="ui-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView + 20 / itemsPerView)}%)`
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="ui-carousel-item">
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                blurIn={true}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="carousel-btn next-btn" 
        onClick={goToNext}
        disabled={currentIndex === maxIndex}
        aria-label="Next"
      >
        ❯
      </button>
      
      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
