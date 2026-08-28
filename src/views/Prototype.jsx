'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createFadeInUp, createScaleIn } from '../utils/motion';
import { portfolioAPI } from '../api/portfolioAPI';
import { withBase } from '../utils/baseUrl';
import './Prototype.css';

const fadeInUp = createFadeInUp(28, 0.6);
const scaleIn = createScaleIn(0.96, 0.5);

export default function Prototype() {
  const [uiImages, setUiImages] = useState([]);
  const [socialImages, setSocialImages] = useState([]);
  const [personalImages, setPersonalImages] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [ui, social, personal] = await Promise.all([
        portfolioAPI.getUIProjects(),
        portfolioAPI.getSocialMediaDesigns(),
        portfolioAPI.getPersonalWorks(),
      ]);
      setUiImages([...ui.hero.images, ...ui.carousel]);
      setSocialImages([...social.row1, ...social.marquee, ...social.row3]);
      setPersonalImages([...personal.row1, ...personal.row2]);
    };
    load();
  }, []);

  const prevSlide = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const nextSlide = () => setCarouselIndex((i) => Math.min(uiImages.length - 1, i + 1));

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="prototype-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative SVG backgrounds */}
      <svg
        className="bg-deco bg-deco-top"
        viewBox="0 0 2746 2395"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2664.14 1073.81C2495.47 1560.82 1852.75 1669.99 1987.87 1081.92C2122.98 493.848 1821.37 888.117 1751.13 996.651C1680.89 1105.19 1481.83 1509.01 1468.18 980.515C1451.11 319.901 1211.67 921.113 1211.67 921.113C1094.96 1285.29 885.323 1955.12 896.264 1551.6C908.56 1098.06 903.253 616.386 626.966 821.173C405.937 985.002 131.846 1475.81 255.607 1619.23"
          stroke="url(#prototype-deco-grad-1)"
          strokeOpacity="0.25"
          strokeWidth="100"
        />
        <defs>
          <linearGradient
            id="prototype-deco-grad-1"
            x1="-208"
            y1="1537"
            x2="2125"
            y2="657"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0046FF" stopOpacity="0.08" />
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92" />
            <stop offset="1" stopColor="#E62727" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="bg-deco bg-deco-bottom"
        viewBox="0 0 2845 2116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2499.02 1946.49C2000.04 2188.76 1427.83 1782.71 1978.19 1438.01C2528.55 1093.3 1998.97 1163.81 1862.92 1192.95C1726.87 1222.1 1268.07 1377.93 1659.87 965.344C2149.62 449.614 1509.87 724.929 1509.87 724.929C1143.9 913.251 474.612 1263.47 790.029 964.708C1144.54 628.915 1507.06 258.315 1140.95 203.902C848.07 160.372 265.964 325.301 251.008 528.625"
          stroke="url(#prototype-deco-grad-2)"
          strokeOpacity="0.25"
          strokeWidth="100"
        />
        <defs>
          <linearGradient
            id="prototype-deco-grad-2"
            x1="-39"
            y1="113"
            x2="2405"
            y2="1220"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0046FF" stopOpacity="0.08" />
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92" />
            <stop offset="1" stopColor="#E62727" />
          </linearGradient>
        </defs>
      </svg>

      <div className="prototype-content">

        {/* ===== HERO SECTION ===== */}
        <motion.section
          className="prototype-hero"
          aria-label="Hero"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="prototype-hero-left">
            <motion.div className="prototype-hero-copy" {...fadeInUp}>
              <h1 className="prototype-hero-title">
                Alex&apos;s Art
                <br />
                Tavern
              </h1>
              <p className="prototype-hero-desc">
                Discover my works, both personal and professionally, throughout my career.
              </p>
            </motion.div>
            <div className="prototype-hero-cards">
              <motion.div
                className="prototype-hero-card prototype-card-sky"
                {...scaleIn}
                whileHover={{ y: -6 }}
                onClick={() => scrollToSection('social-media')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('social-media')}
              >
                <div className="prototype-hero-card-title">
                  Social Media
                  <br />
                  Works
                </div>
                <div className="prototype-hero-card-desc">Collection of Social Media Works</div>
              </motion.div>
              <motion.div
                className="prototype-hero-card prototype-card-violet prototype-card-gap-lg"
                {...scaleIn}
                transition={{ ...scaleIn.transition, delay: 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => scrollToSection('uiux-projects')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('uiux-projects')}
              >
                <div className="prototype-hero-card-title">UI/UX Projects</div>
                <div className="prototype-hero-card-desc">Collection of my UI/UX Projects</div>
              </motion.div>
              <motion.div
                className="prototype-hero-card prototype-card-green"
                {...scaleIn}
                transition={{ ...scaleIn.transition, delay: 0.2 }}
                whileHover={{ y: -6 }}
                onClick={() => scrollToSection('personal-works')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('personal-works')}
              >
                <div className="prototype-hero-card-title">Personal Works</div>
                <div className="prototype-hero-card-desc">
                  Collection of Personal Works
                  <br />
                  throughout my design graphic career
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div className="prototype-hero-image" {...scaleIn}>
            {/* ============================================================
                HERO IMAGE PLACEHOLDER
                To replace with your own image:
                1. Place your image in /public/images/
                2. Replace this entire div with:
                   <img
                     src={withBase('images/YOUR_IMAGE_FILENAME.jpg')}
                     alt="Hero portrait"
                     className="prototype-hero-img"
                   />
                ============================================================ */}
            <div className="prototype-hero-placeholder">
              <span className="placeholder-icon">🖼️</span>
              <span className="placeholder-label">Hero Image</span>
              <span className="placeholder-hint">Replace in code with your image</span>
            </div>
          </motion.div>
        </motion.section>

        {/* ===== SOCIAL MEDIA SECTION ===== */}
        <motion.section
          id="social-media"
          className="prototype-social"
          aria-label="Social media gallery"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="prototype-section-header">
            <div className="prototype-section-title">Social Media</div>
            <a href="https://www.instagram.com/atlusinfo.id/" target="_blank" rel="noopener noreferrer" className="prototype-section-link">
              Atlus Info Indonesia
            </a>
          </div>
          <div className="prototype-social-grid">
            <div className="prototype-photo-column">
              {[0, 1].map((idx) => (
                <motion.div key={idx} className="prototype-photo prototype-photo-sm" whileHover={{ scale: 1.02 }}>
                  {socialImages[idx] ? (
                    <img src={socialImages[idx].src} alt={socialImages[idx].alt} className="prototype-photo-img" />
                  ) : (
                    <div className="prototype-photo-placeholder">placeholder foto</div>
                  )}
                </motion.div>
              ))}
            </div>
            {[2, 3].map((idx) => (
              <motion.div key={idx} className="prototype-photo prototype-photo-md" whileHover={{ scale: 1.02 }}>
                {socialImages[idx] ? (
                  <img src={socialImages[idx].src} alt={socialImages[idx].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
            ))}
            <div className="prototype-photo-column">
              {[4, 5].map((idx) => (
                <motion.div key={idx} className="prototype-photo prototype-photo-sm" whileHover={{ scale: 1.02 }}>
                  {socialImages[idx] ? (
                    <img src={socialImages[idx].src} alt={socialImages[idx].alt} className="prototype-photo-img" />
                  ) : (
                    <div className="prototype-photo-placeholder">placeholder foto</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="prototype-social-bottom">
            {[6, 7, 8, 9].map((idx) => (
              <motion.div key={idx} className="prototype-photo prototype-photo-bottom" whileHover={{ scale: 1.02 }}>
                {socialImages[idx] ? (
                  <img src={socialImages[idx].src} alt={socialImages[idx].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
            ))} 
          </div>
        </motion.section>

        {/* ===== UI/UX PROJECTS SECTION ===== */}
        <motion.section
          id="uiux-projects"
          className="prototype-uiux"
          aria-label="UI/UX projects"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="prototype-uiux-copy" {...fadeInUp}>
            <h2 className="prototype-uiux-title">UI/UX Projects</h2>
            <p className="prototype-uiux-desc">
              Designed StuPlan! as a part of final project for Platform-Based Programming. StuPlan! is an
              Android-based application focused on simplicity and productivity. Key design decisions included
            </p>
            <p className="prototype-uiux-desc">
              Intuitive Dashboard: A clean summary of daily schedules and upcoming deadlines to reduce cognitive load
              <br />
              Smart Reminders: Custom notification system for tasks and exams to ensure students never miss a due date.
              <br />
              Progress Visualization: A dedicated Statistics Page using charts to track study time and task completion,
              motivating users to stay consistent.
            </p>
          </motion.div>
          <motion.div className="prototype-uiux-carousel" {...scaleIn}>
            <div className="carousel-slide">
              <AnimatePresence mode="popLayout" initial={false}>
                {uiImages.length > 0 ? (
                  <motion.img
                    key={carouselIndex}
                    src={uiImages[carouselIndex]?.src}
                    alt={uiImages[carouselIndex]?.alt}
                    className="carousel-img"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                ) : (
                  <div className="carousel-placeholder">placeholder foto</div>
                )}
              </AnimatePresence>
            </div>
            <div className="carousel-controls">
              <button className="carousel-arrow" onClick={prevSlide} aria-label="Previous slide">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M34.0625 18.5156H11.2071L24.8868 6.64062C25.1055 6.44922 24.9727 6.09375 24.6836 6.09375H21.2266C21.0743 6.09375 20.9297 6.14844 20.8165 6.24609L6.05474 19.0547C5.91954 19.1719 5.81111 19.3168 5.7368 19.4795C5.66248 19.6423 5.62402 19.8191 5.62402 19.998C5.62402 20.177 5.66248 20.3538 5.7368 20.5166C5.81111 20.6793 5.91954 20.8242 6.05474 20.9414L20.9024 33.8281C20.961 33.8789 21.0313 33.9062 21.1055 33.9062H24.6797C24.9688 33.9062 25.1016 33.5469 24.8829 33.3594L11.2071 21.4844H34.0625C34.2344 21.4844 34.375 21.3438 34.375 21.1719V18.8281C34.375 18.6562 34.2344 18.5156 34.0625 18.5156Z" fill="white"/>
                </svg>
              </button>
              <button className="carousel-arrow" onClick={nextSlide} aria-label="Next slide">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M33.9453 19.0547L19.1875 6.24609C19.0742 6.14844 18.9297 6.09375 18.7773 6.09375H15.3203C15.0312 6.09375 14.8984 6.45312 15.1172 6.64062L28.7969 18.5156H5.9375C5.76562 18.5156 5.625 18.6562 5.625 18.8281V21.1719C5.625 21.3438 5.76562 21.4844 5.9375 21.4844H28.793L15.1133 33.3594C14.8945 33.5508 15.0273 33.9062 15.3164 33.9062H18.8906C18.9648 33.9062 19.0391 33.8789 19.0938 33.8281L33.9453 20.9453C34.0805 20.8277 34.189 20.6825 34.2633 20.5194C34.3376 20.3563 34.376 20.1792 34.376 20C34.376 19.8208 34.3376 19.6437 34.2633 19.4806C34.189 19.3175 34.0805 19.1723 33.9453 19.0547Z" fill="white"/>
                </svg>
              </button>
            </div>
            <div className="carousel-dots">
              {uiImages.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === carouselIndex ? ' active' : ''}`}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ===== PERSONAL WORKS SECTION ===== */}
        <motion.section
          id="personal-works"
          className="prototype-personal"
          aria-label="Personal works"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="prototype-section-header">
            <div className="prototype-section-title">Personal Works</div>
            <div className="prototype-section-link">more here</div>
          </div>
          <div className="prototype-personal-grid">
            <div className="prototype-personal-col">
              <motion.div className="prototype-photo prototype-photo-tall" whileHover={{ scale: 1.02 }}>
                {personalImages[0] ? (
                  <img src={personalImages[0].src} alt={personalImages[0].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
              <motion.div className="prototype-photo prototype-photo-short" whileHover={{ scale: 1.02 }}>
                {personalImages[1] ? (
                  <img src={personalImages[1].src} alt={personalImages[1].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
            </div>
            <div className="prototype-personal-col prototype-personal-col-gap">
              <motion.div className="prototype-photo prototype-photo-mid" whileHover={{ scale: 1.02 }}>
                {personalImages[2] ? (
                  <img src={personalImages[2].src} alt={personalImages[2].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
              <motion.div className="prototype-photo prototype-photo-tall" whileHover={{ scale: 1.02 }}>
                {personalImages[3] ? (
                  <img src={personalImages[3].src} alt={personalImages[3].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
            </div>
            <div className="prototype-personal-col">
              <motion.div className="prototype-photo prototype-photo-tall" whileHover={{ scale: 1.02 }}>
                {personalImages[4] ? (
                  <img src={personalImages[4].src} alt={personalImages[4].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
              <motion.div className="prototype-photo prototype-photo-short" whileHover={{ scale: 1.02 }}>
                {personalImages[5] ? (
                  <img src={personalImages[5].src} alt={personalImages[5].alt} className="prototype-photo-img" />
                ) : (
                  <div className="prototype-photo-placeholder">placeholder foto</div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== CONTACT / FOOTER ===== */}
        <motion.section
          className="contact-section"
          aria-label="Contact"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="contact-left">
            <h2 className="contact-heading">Let&apos;s get in touch!</h2>
            <p className="contact-subtext">Get in touch today and let&apos;s explore how we can work together!</p>
            <div className="contact-email-block">
              <span className="contact-email-label">Email Me @</span>
              <div className="contact-email-pill">alexanderhafizh14@gmail.com</div>
            </div>
            <p className="contact-copyright">© 2026 Hafizh Dakota Alexander</p>
          </div>

          <div className="contact-right">
            <h3 className="socials-heading">Socials</h3>
            <div className="socials-list">
              <a
                href="https://github.com/fengch4mi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-card social-github"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/889599c67ce780970196922835e9987c5392d7ae?width=116"
                  alt="Github"
                  className="social-icon"
                />
                <div className="social-info">
                  <span className="social-name">Github</span>
                  <span className="social-handle">@fengch4mi</span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/hfizalex/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-card social-linkedin"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/101fc74698bb45f44a7a9c714d30ff929719e142?width=116"
                  alt="Linkedin"
                  className="social-icon"
                />
                <div className="social-info">
                  <span className="social-name">Linkedin</span>
                  <span className="social-handle">Hafizh Dakota Alexander</span>
                </div>
              </a>
              <a
                href="https://instagram.com/alexnyaan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-card social-instagram"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2aeb1bf0de4b354af3a4803fefa3bfff0c4feaec?width=116"
                  alt="Instagram"
                  className="social-icon"
                />
                <div className="social-info">
                  <span className="social-name">Instagram</span>
                  <span className="social-handle">@alexnyaan</span>
                </div>
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}
