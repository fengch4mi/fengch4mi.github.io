'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import TiltImage from '../components/TiltImage';
import { portfolioAPI } from '../api/portfolioAPI';
import { SkeletonGrid } from '../components/SkeletonLoader';
import Carousel from '../components/Carousel';
import { createFadeInUp, createStagger } from '../utils/motion';
import { usePrerenderReady } from '../utils/prerenderReady';

const fadeInUp = createFadeInUp(30, 0.6);
const staggerContainer = createStagger(0.1);

function Portfolio() {
  const { t } = useTranslation();
  const [socialMedia, setSocialMedia] = useState(null);
  const [uiProjects, setUIProjects] = useState(null);
  const [personalWorks, setPersonalWorks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState('');
  const [hash, setHash] = useState('');

  usePrerenderReady(!loading);

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialData, uiData, personalData] = await Promise.all([
          portfolioAPI.getSocialMediaDesigns(),
          portfolioAPI.getUIProjects(),
          portfolioAPI.getPersonalWorks()
        ]);
        setSocialMedia(socialData);
        setUIProjects(uiData);
        setPersonalWorks(personalData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading || !hash) return;
    const targetId = hash.replace('#', '');
    setHighlightId(targetId);

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const timer = window.setTimeout(() => {
      setHighlightId('');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [hash, loading]);

  if (loading) {
    return <SkeletonGrid />;
  }

  return (
    <div className="home-page">
      {/* Decorative SVG backgrounds — same as Home */}
      <svg className="bg-deco bg-deco-top" viewBox="0 0 2746 2395" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2664.14 1073.81C2495.47 1560.82 1852.75 1669.99 1987.87 1081.92C2122.98 493.848 1821.37 888.117 1751.13 996.651C1680.89 1105.19 1481.83 1509.01 1468.18 980.515C1451.11 319.901 1211.67 921.113 1211.67 921.113C1094.96 1285.29 885.323 1955.12 896.264 1551.6C908.56 1098.06 903.253 616.386 626.966 821.173C405.937 985.002 131.846 1475.81 255.607 1619.23" stroke="url(#pg-deco-1)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="pg-deco-1" x1="-208" y1="1537" x2="2125" y2="657" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="bg-deco bg-deco-bottom" viewBox="0 0 2845 2116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2499.02 1946.49C2000.04 2188.76 1427.83 1782.71 1978.19 1438.01C2528.55 1093.3 1998.97 1163.81 1862.92 1192.95C1726.87 1222.1 1268.07 1377.93 1659.87 965.344C2149.62 449.614 1509.87 724.929 1509.87 724.929C1143.9 913.251 474.612 1263.47 790.029 964.708C1144.54 628.915 1507.06 258.315 1140.95 203.902C848.07 160.372 265.964 325.301 251.008 528.625" stroke="url(#pg-deco-2)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="pg-deco-2" x1="-39" y1="113" x2="2405" y2="1220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="home-content">

        {/* ============================================
            PAGE HEADER — simple title card
            ============================================ */}
        <motion.section
          className="portfolio-hero-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="portfolio-hero-text">
            <span className="card-tag">{t('portfolio.subtitle')}</span>
            <h1 className="portfolio-hero-heading">Alex's Works</h1>
            <p className="portfolio-hero-desc">
              A collection of UI/UX projects, social media designs, and personal graphic works.
            </p>
          </div>
        </motion.section>

        {/* ============================================
            SOCIAL MEDIA — card style
            ============================================ */}
        <motion.section
          className={`portfolio-card portfolio-card-full ${highlightId === 'social-media' ? 'anchor-highlight' : ''}`}
          id="social-media"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2 className="portfolio-card-title" variants={fadeInUp}>
            {t('portfolio.socialMedia.title')}
          </motion.h2>
          <motion.p className="portfolio-card-subtitle" variants={fadeInUp}>
            {t('portfolio.socialMedia.subtitle')}
          </motion.p>

          {socialMedia && (
            <>
              {/* Row 1: 1:1 grid with tilt */}
              <motion.div className="p-image-grid p-grid-3" variants={fadeInUp}>
                {socialMedia.row1.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="1 / 1"
                      tiltIntensity={8}
                      glare={true}
                      loading="lazy"
                      corners={true}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 2: Marquee carousel — kept as requested */}
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...socialMedia.marquee, ...socialMedia.marquee].map((img, index) => (
                    <div key={`${img.id}-${index}`} className="placeholder aspect-4-5">
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        blurIn={false}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: 4:5 grid with tilt */}
              <motion.div className="p-image-grid p-grid-3" variants={fadeInUp}>
                {socialMedia.row3.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="4 / 5"
                      tiltIntensity={8}
                      glare={true}
                      loading="lazy"
                      corners={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.section>

        {/* ============================================
            UI PROJECTS — simplified card with featured
            project + screenshot carousel
            ============================================ */}
        <motion.section
          className={`portfolio-card portfolio-card-full ${highlightId === 'ui-projects' ? 'anchor-highlight' : ''}`}
          id="ui-projects"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="portfolio-card-title">
            {t('portfolio.uiProjects.title')}
          </h2>

          {uiProjects && (
            <>
              {/* Featured project — side-by-side: info + hero image */}
              <div className="ui-featured">
                <motion.div
                  className="ui-featured-info"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="card-tag">FEATURED</span>
                  <h3 className="ui-featured-title">{t('portfolio.uiProjects.mainTitle')}</h3>
                  <p className="ui-featured-desc">
                    {t('portfolio.uiProjects.description')}
                  </p>
                  <ul className="ui-featured-features">
                    <li>{t('portfolio.uiProjects.feature1')}</li>
                    <li>{t('portfolio.uiProjects.feature2')}</li>
                    <li>{t('portfolio.uiProjects.feature3')}</li>
                  </ul>
                </motion.div>

                <motion.div
                  className="ui-featured-image"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TiltImage
                    src={uiProjects.hero.images[0].src}
                    alt={uiProjects.hero.images[0].alt}
                    aspectRatio="4 / 3"
                    tiltIntensity={6}
                    glare={true}
                    corners={true}
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* More screenshots — grid */}
              <motion.div
                className="p-image-grid p-grid-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[uiProjects.hero.images[1], ...uiProjects.carousel.slice(0, 2)].map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="4 / 3"
                      tiltIntensity={6}
                      glare={true}
                      corners={true}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Remaining carousel screenshots */}
              {uiProjects.carousel.length > 2 && (
                <motion.div
                  className="p-image-grid p-grid-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {uiProjects.carousel.slice(2).map((img, index) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TiltImage
                        src={img.src}
                        alt={img.alt}
                        aspectRatio="4 / 3"
                        tiltIntensity={6}
                        glare={true}
                        corners={true}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </motion.section>

        {/* ============================================
            PERSONAL WORKS — card style
            ============================================ */}
        <motion.section
          className={`portfolio-card portfolio-card-full ${highlightId === 'personal-works' ? 'anchor-highlight' : ''}`}
          id="personal-works"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="portfolio-card-title">
            {t('portfolio.personalWorks.title')}
          </h2>

          {personalWorks && (
            <>
              {/* Row 1: 1:1 */}
              <motion.div
                className="p-image-grid p-grid-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {personalWorks.row1.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="1 / 1"
                      tiltIntensity={8}
                      glare={true}
                      corners={true}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Row 2: Mixed sizes */}
              <motion.div
                className="p-image-grid p-grid-mixed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {personalWorks.row2.map((img, index) => (
                  <motion.div
                    key={img.id}
                    className={img.size === 'small' ? 'p-grid-small-center' : ''}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <TiltImage
                      src={img.src}
                      alt={img.alt}
                      aspectRatio={img.size === 'large' ? '1 / 1.414' : '4 / 5'}
                      tiltIntensity={6}
                      glare={true}
                      corners={true}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.section>

        {/* ============================================
            CONTACT FOOTER — same as Home
            ============================================ */}
        <motion.section
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-left">
            <h2 className="contact-heading">Let's get in touch!</h2>
            <p className="contact-subtext">Get in touch today and let's explore how we can work together!</p>
            <div className="contact-email-block">
              <span className="contact-email-label">Email Me @</span>
              <div className="contact-email-pill">alexanderhafizh14@gmail.com</div>
            </div>
            <p className="contact-copyright">© 2026 Hafizh Dakota Alexander</p>
          </div>

          <div className="contact-right">
            <h3 className="socials-heading">Socials</h3>
            <div className="socials-list">
              <a href="https://github.com/fengch4mi" target="_blank" rel="noopener noreferrer" className="social-card social-github">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/889599c67ce780970196922835e9987c5392d7ae?width=116" alt="Github" className="social-icon" />
                <div className="social-info">
                  <span className="social-name">Github</span>
                  <span className="social-handle">@fengch4mi</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/hfizalex/" target="_blank" rel="noopener noreferrer" className="social-card social-linkedin">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/101fc74698bb45f44a7a9c714d30ff929719e142?width=116" alt="Linkedin" className="social-icon" />
                <div className="social-info">
                  <span className="social-name">Linkedin</span>
                  <span className="social-handle">Hafizh Dakota Alexander</span>
                </div>
              </a>
              <a href="https://instagram.com/alexnyaan" target="_blank" rel="noopener noreferrer" className="social-card social-instagram">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/2aeb1bf0de4b354af3a4803fefa3bfff0c4feaec?width=116" alt="Instagram" className="social-icon" />
                <div className="social-info">
                  <span className="social-name">Instagram</span>
                  <span className="social-handle">@alexnyaan</span>
                </div>
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}

export default Portfolio;
