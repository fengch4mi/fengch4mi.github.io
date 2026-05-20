import { useState, useEffect, useRef } from 'react';

/**
 * Simple optimized image component with:
 * - WebP format with fallback
 * - Native lazy loading
 * - Optional blur-in effect
 * - No CSS conflicts
 * - Robust error handling
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  loading = 'lazy', // 'lazy' | 'eager'
  blurIn = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const imgRef = useRef(null);

  // Convert to WebP path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  useEffect(() => {
    // Check if image is already loaded (cached)
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalHeight !== 0) {
      setIsLoaded(true);
    }

    // Test if WebP version exists
    const testImg = new Image();
    testImg.onload = () => {
      // WebP exists and loaded successfully
      setImageSrc(webpSrc);
    };
    testImg.onerror = () => {
      // WebP doesn't exist or failed, use original
      setImageSrc(src);
    };
    testImg.src = webpSrc;
  }, [src, webpSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // If image fails to load, try original if we were using webp
    if (imageSrc !== src) {
      setImageSrc(src);
    } else {
      // Even original failed, just show it anyway
      setIsLoaded(true);
    }
  };

  const imgClassName = `${className} ${blurIn && !isLoaded ? 'img-loading' : ''} ${blurIn && isLoaded ? 'img-loaded' : ''}`.trim();

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={imgClassName}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
