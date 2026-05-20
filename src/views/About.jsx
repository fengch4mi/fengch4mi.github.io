import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import InfoCard from '../components/InfoCard';
import Seo from '../components/Seo';
import { portfolioAPI } from '../api/portfolioAPI';
import { SkeletonAbout } from '../components/SkeletonLoader';
import { withBase } from '../utils/baseUrl';
import { createFadeInUp, createStagger } from '../utils/motion';
import { usePrerenderReady } from '../utils/prerenderReady';

const fadeInUp = createFadeInUp(20, 0.5);
const staggerContainer = createStagger(0.1);

const infoCardMotion = (delay) => ({
  initial: fadeInUp.initial,
  whileInView: fadeInUp.animate,
  viewport: { once: true, amount: 0.2 },
  transition: { ...fadeInUp.transition, delay }
});

function About() {
  const { t } = useTranslation();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const descriptionContent = t('about.description', { returnObjects: true });
  const description = Array.isArray(descriptionContent)
    ? descriptionContent.join(' ')
    : descriptionContent;

  usePrerenderReady(!loading);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await portfolioAPI.getExperience();
        setExperience(data);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const infoSections = [
    {
      key: 'soft-skills',
      className: 'skills-section',
      title: t('about.softSkills'),
      body: <p>{t('about.softSkillsList')}</p>
    },
    {
      key: 'expertise',
      className: 'expertise-section',
      title: t('about.expertise'),
      body: <p>{t('about.expertiseList')}</p>
    },
    {
      key: 'software',
      className: 'software-section',
      title: t('about.software'),
      body: <p>{t('about.softwareList')}</p>
    },
    {
      key: 'education',
      className: 'education-section',
      title: t('about.education'),
      body: (
        <>
          <div className="education-degree">{t('about.degree')}</div>
          <div className="education-school">{t('about.school')}</div>
          <div className="education-duration">{t('about.duration')}</div>
        </>
      )
    }
  ];

  const renderExperienceLeft = () => {
    return experience.slice(0, 3).map((job, index) => (
      <motion.div 
        key={job.id} 
        className="job-item"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h3 className="job-title">{job.title}</h3>
        <p className="company-info">{job.company}</p>
        <p className="job-duration">{job.duration}</p>
        <div className="job-description">
          {Array.isArray(job.description) ? (
            <ul>
              {job.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>{job.description}</p>
          )}
        </div>
      </motion.div>
    ));
  };

  const renderExperienceRight = () => {
    return experience.slice(3).map((job, index) => (
      <motion.div 
        key={job.id} 
        className="job-item"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h3 className="job-title">{job.title}</h3>
        <p className="company-info">{job.company}</p>
        <p className="job-duration">{job.duration}</p>
        <div className="job-description">
          {Array.isArray(job.description) ? (
            <ul>
              {job.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>{job.description}</p>
          )}
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <>
        <Seo title="About" description={description} path="/about" />
        <SkeletonAbout />
      </>
    );
  }

  return (
    <>
      <Seo title="About" description={description} path="/about" />
      <motion.div 
        className="container"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.section className="about-section" variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <OptimizedImage
              src={withBase('images/IMG_4896_Cropped.JPG')}
              alt="Hafizh Alexander"
              className="profile-image"
              loading="eager"
              blurIn={true}
            />
          </motion.div>
          
          <motion.div className="about-content" variants={fadeInUp}>
            <p className="about-title">{t('about.aboutTitle')}</p>
            <h1 className="main-heading">{t('about.whoIs')}</h1>
            <div className="description">
              {Array.isArray(t('about.description', { returnObjects: true }))
                ? t('about.description', { returnObjects: true }).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                : <p>{t('about.description')}</p>
              }
            </div>
            
            <div className="stats">
              <motion.div className="stat-item" variants={fadeInUp}>
                <div className="stat-number">150+</div>
                <div className="stat-label">{t('about.designsMade')}</div>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInUp}>
                <div className="stat-number">5+</div>
                <div className="stat-label">{t('about.projectsDone')}</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="experience-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="experience-title">{t('about.experienceTitle')}</h2>
          
          <div className="experience-grid">
            <div className="experience-left">
              {renderExperienceLeft()}
            </div>

            <div className="experience-right">
              {renderExperienceRight()}
              {infoSections.map((section, index) => (
                <InfoCard
                  key={section.key}
                  className={section.className}
                  title={section.title}
                  {...infoCardMotion(0.1 + index * 0.1)}
                >
                  {section.body}
                </InfoCard>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
}

export default About;
