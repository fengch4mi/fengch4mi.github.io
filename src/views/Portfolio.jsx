import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
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
  const description = t('portfolio.subtitle');
  const location = useLocation();

  usePrerenderReady(!loading);

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
    if (loading || !location.hash) return;
    const targetId = location.hash.replace('#', '');
    setHighlightId(targetId);

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const timer = window.setTimeout(() => {
      setHighlightId('');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [location.hash, loading]);

  if (loading) {
    return (
      <>
        <Seo title="Portfolio" description={description} path="/portfolio" />
        <SkeletonGrid />
      </>
    );
  }

  return (
    <>
      <Seo title="Portfolio" description={description} path="/portfolio" />
      {/* Header dengan Judul */}
      <motion.header 
        className="fullscreen-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-container">
          <motion.div 
            className="portfolio-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('portfolio.subtitle')}
          </motion.div>
          <motion.h1 
            className="header-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Alex's<br />Works
          </motion.h1>
        </div>
      </motion.header>

      {/* Wrapper untuk Semua Konten Portfolio */}
      <div className="portfolio-content-wrapper">
        <div className="main-container">

          {/* Bagian Social Media Designs */}
          <motion.section 
            className={`portfolio-section ${highlightId === 'social-media' ? 'anchor-highlight' : ''}`}
            id="social-media"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="section-title-container" variants={fadeInUp}>
              <SectionTitle
                title={t('portfolio.socialMedia.title')}
                subtitle={t('portfolio.socialMedia.subtitle')}
              />
            </motion.div>

            {/* Baris 1: Skala 1:1 */}
            {socialMedia && (
              <>
                <motion.div className="image-grid grid-cols-3" variants={fadeInUp}>
                  {socialMedia.row1.map((img, index) => (
                    <motion.div 
                      key={img.id} 
                      className="placeholder aspect-1-1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Baris 2: Marquee */}
                <div className="marquee-container">
                  <div className="marquee-content">
                    {/* Duplicate items for seamless loop */}
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

                {/* Baris 3: Skala 4:5 */}
                <motion.div className="image-grid grid-cols-3" variants={fadeInUp}>
                  {socialMedia.row3.map((img, index) => (
                    <motion.div 
                      key={img.id} 
                      className="placeholder aspect-4-5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.section>

          {/* Bagian UI Projects */}
          <motion.section 
            className={`portfolio-section ui-projects-section ${highlightId === 'ui-projects' ? 'anchor-highlight' : ''}`}
            id="ui-projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-title-container ui-projects-title">
              <SectionTitle title={t('portfolio.uiProjects.title')} />
            </div>

            {/* Hero UI Project */}
            {uiProjects && (
              <>
                <motion.div 
                  className="ui-hero-container"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="ui-images-overlap">
                    <motion.div 
                      className="ui-image-back"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <OptimizedImage
                        src={uiProjects.hero.images[0].src}
                        alt={uiProjects.hero.images[0].alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                    <motion.div 
                      className="ui-image-front"
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <OptimizedImage
                        src={uiProjects.hero.images[1].src}
                        alt={uiProjects.hero.images[1].alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="ui-project-info"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="ui-project-title">{t('portfolio.uiProjects.mainTitle')}</h3>
                    <p className="ui-project-description">
                      {t('portfolio.uiProjects.description')}
                    </p>
                    <ul className="ui-feature-list">
                      <li>{t('portfolio.uiProjects.feature1')}</li>
                      <li>{t('portfolio.uiProjects.feature2')}</li>
                      <li>{t('portfolio.uiProjects.feature3')}</li>
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Carousel untuk UI Projects Lainnya */}
                <motion.div 
                  className="ui-carousel-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="carousel-label">{t('portfolio.uiProjects.moreWorks')}</h3>
                  <Carousel items={uiProjects.carousel} />
                </motion.div>
              </>
            )}
          </motion.section>

          {/* Bagian Personal Works */}
          <motion.section 
            className={`portfolio-section personal-works-section ${highlightId === 'personal-works' ? 'anchor-highlight' : ''}`}
            id="personal-works"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-title-container personal-works-title">
              <SectionTitle title={t('portfolio.personalWorks.title')} />
            </div>

            {personalWorks && (
              <>
                {/* Baris 1: Skala 1:1 */}
                <motion.div 
                  className="image-grid grid-cols-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {personalWorks.row1.map((img, index) => (
                    <motion.div 
                      key={img.id} 
                      className="placeholder aspect-1-1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Baris 2: Skala Campuran */}
                <motion.div 
                  className="image-grid mixed-grid"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {personalWorks.row2.map((img, index) => (
                    <motion.div 
                      key={img.id} 
                      className={`placeholder ${img.size === 'large' ? 'aspect-a4' : 'aspect-4-5 small-center'}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    >
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        blurIn={true}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.section>

        </div>
      </div>
    </>
  );
}

export default Portfolio;
