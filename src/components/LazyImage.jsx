import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  effect = 'blur',
  threshold = 100,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [threshold]);

  // Convert image path to WebP with fallback
  useEffect(() => {
    if (isInView && src) {
      // Try WebP version first
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Test if WebP exists
      const img = new Image();
      img.onload = () => {
        setImageSrc(webpSrc);
      };
      img.onerror = () => {
        // Fallback to original if WebP doesn't exist
        setImageSrc(src);
      };
      img.src = webpSrc;
    }
  }, [isInView, src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const wrapperClass = `lazy-load-image-background ${effect} ${isLoaded ? 'lazy-load-image-loaded' : ''}`;

  return (
    <span className={wrapperClass} ref={imgRef}>
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </span>
  );
};

export default LazyImage;
