import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BackgroundCircles from '../components/BackgroundCircles';
import { createFadeInUp, createStagger } from '../utils/motion';
import './Home.css';

const fadeInUp = createFadeInUp(20, 0.5);
const staggerChildren = createStagger(0.1);

function Home() {
  const { t } = useTranslation();

  const featuredProject = {
    id: 'stuplan',
    title: 'StuPlan!',
    subtitle: t('home.featured.stuplan.subtitle'),
    description: t('home.featured.stuplan.description'),
    image: `${import.meta.env.BASE_URL}images/UI Projects/Rectangle-1.webp`,
    link: '/portfolio#ui-projects'
  };

  return (
    <>
      <BackgroundCircles />
      <div className="decorative-line"></div>
      <motion.main 
        className="hero-section"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div className="hero-content" variants={fadeInUp}>
          <motion.h1 className="hero-title" variants={fadeInUp}>
            {t('home.greeting')}<br />{t('home.name')}
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            {t('home.subtitle')}
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            {t('home.description')}
          </motion.p>
          <motion.div className="cta-buttons" variants={fadeInUp}>
            <Link to="/about" className="cta-button">{t('home.moreAboutMe')}</Link>
            <a 
              href="https://drive.google.com/file/d/1wXZAM1c8SWobq5XRCozAcdV1GwRgRyeJ/view?usp=sharing" 
              className="cta-button-cv"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('home.viewCV')}
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/IMG_4896_Cropped.JPG`}
            alt="Hafizh Alexander"
            className="profile-image"
          />
        </motion.div>
      </motion.main>

      {/* Featured Works Section */}
      <motion.section 
        className="featured-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="featured-header">
          <h2 className="featured-title">{t('home.featured.title')}</h2>
          <p className="featured-subtitle">{t('home.featured.subtitle')}</p>
        </div>

        <motion.div 
          className="featured-project"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={featuredProject.link} className="featured-project-link">
            <div className="featured-image-wrapper">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="featured-image"
              />
            </div>
            <div className="featured-content">
              <h3 className="featured-project-title">{featuredProject.title}</h3>
              <p className="featured-project-subtitle">{featuredProject.subtitle}</p>
              <p className="featured-project-description">{featuredProject.description}</p>
              <span className="featured-view-more">{t('home.featured.viewMore')} →</span>
            </div>
          </Link>
        </motion.div>

        <Link to="/portfolio" className="view-all-button">
          {t('home.featured.viewAllWorks')}
        </Link>
      </motion.section>
    </>
  );
}

export default Home;
