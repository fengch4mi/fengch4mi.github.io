'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';

/**
 * TiltImage — 3D perspective tilt + holographic glare on image grid items.
 * Ported from the portfolio-concept.html prototype, adapted for React.
 *
 * Props:
 *  - src, alt          — image source + alt text (passed to OptimizedImage)
 *  - aspectRatio       — CSS aspect-ratio string (default '1 / 1')
 *  - tiltIntensity     — max tilt degrees (default 10)
 *  - glare             — show holographic glare layer (default true)
 *  - corners           — show corner bracket decoration (default false)
 *  - scanReveal        — show "OPEN PROJECT" scan overlay on hover (default false)
 *  - scanLabel         — text for the scan overlay (default 'VIEW ▸')
 *  - className         — extra class names on the outer wrapper
 *  - onClick           — click handler
 *  - loading           — 'lazy' or 'eager' (default 'lazy')
 *  - children          — optional overlay content
 */
export default function TiltImage({
  src,
  alt,
  aspectRatio = '1 / 1',
  tiltIntensity = 10,
  glare = true,
  corners = false,
  scanReveal = false,
  scanLabel = 'VIEW ▸',
  className = '',
  onClick,
  loading = 'lazy',
  children,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const applyTilt = useCallback(
    (clientX, clientY) => {
      if (reduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;

      const rx = (py * -tiltIntensity).toFixed(2);
      const ry = (px * tiltIntensity).toFixed(2);

      cardRef.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;

      if (glareRef.current) {
        // Move the glare highlight to follow cursor position
        const glareX = (px + 0.5) * 100;
        const glareY = (py + 0.5) * 100;
        glareRef.current.style.background = `radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255, 255, 255, 0.25) 0%,
          rgba(255, 255, 255, 0.08) 30%,
          transparent 60%
        )`;
        glareRef.current.style.opacity = '1';
      }
    },
    [tiltIntensity, reduceMotion]
  );

  const resetTilt = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyTilt(e.clientX, e.clientY);
      });
    },
    [applyTilt]
  );

  const onTouchMove = useCallback(
    (e) => {
      const t = e.touches[0];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyTilt(t.clientX, t.clientY);
      });
    },
    [applyTilt]
  );

  // Clean up rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`tilt-image-wrapper ${className}`}
      style={{ aspectRatio }}
    >
      <div
        ref={cardRef}
        className="tilt-image-inner"
        onMouseMove={onMouseMove}
        onMouseLeave={resetTilt}
        onTouchMove={onTouchMove}
        onTouchEnd={resetTilt}
        onClick={onClick}
        tabIndex={0}
        role={onClick ? 'button' : undefined}
      >
        {/* Corner brackets (optional) */}
        {corners && (
          <>
            <span className="tilt-corner tilt-corner-tl" />
            <span className="tilt-corner tilt-corner-tr" />
            <span className="tilt-corner tilt-corner-bl" />
            <span className="tilt-corner tilt-corner-br" />
          </>
        )}

        {/* The actual image */}
        <OptimizedImage
          src={src}
          alt={alt}
          blurIn={true}
          loading={loading}
          className="tilt-image-img"
        />

        {/* Holographic glare overlay */}
        {glare && !reduceMotion && (
          <div
            ref={glareRef}
            className="tilt-glare"
            aria-hidden="true"
          />
        )}

        {/* Scan-line reveal on hover (from concept prototype) */}
        {scanReveal && (
          <div className="tilt-scan" aria-hidden="true">
            <span>{scanLabel}</span>
          </div>
        )}

        {/* Optional children overlay */}
        {children}
      </div>
    </div>
  );
}
