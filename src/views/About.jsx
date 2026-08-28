'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import InfoCard from '../components/InfoCard';
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
      className: 'info-card-item',
      title: t('about.softSkills'),
      body: <p>{t('about.softSkillsList')}</p>
    },
    {
      key: 'expertise',
      className: 'info-card-item',
      title: t('about.expertise'),
      body: <p>{t('about.expertiseList')}</p>
    },
    {
      key: 'software',
      className: 'info-card-item',
      title: t('about.software'),
      body: <p>{t('about.softwareList')}</p>
    },
    {
      key: 'education',
      className: 'info-card-item info-card-education',
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

  if (loading) {
    return <SkeletonAbout />;
  }

  return (
    <div className="home-page">
      {/* Decorative SVG backgrounds — same as Home */}
      <svg className="bg-deco bg-deco-top" viewBox="0 0 2746 2395" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2664.14 1073.81C2495.47 1560.82 1852.75 1669.99 1987.87 1081.92C2122.98 493.848 1821.37 888.117 1751.13 996.651C1680.89 1105.19 1481.83 1509.01 1468.18 980.515C1451.11 319.901 1211.67 921.113 1211.67 921.113C1094.96 1285.29 885.323 1955.12 896.264 1551.6C908.56 1098.06 903.253 616.386 626.966 821.173C405.937 985.002 131.846 1475.81 255.607 1619.23" stroke="url(#ab-deco-1)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="ab-deco-1" x1="-208" y1="1537" x2="2125" y2="657" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="bg-deco bg-deco-bottom" viewBox="0 0 2845 2116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2499.02 1946.49C2000.04 2188.76 1427.83 1782.71 1978.19 1438.01C2528.55 1093.3 1998.97 1163.81 1862.92 1192.95C1726.87 1222.1 1268.07 1377.93 1659.87 965.344C2149.62 449.614 1509.87 724.929 1509.87 724.929C1143.9 913.251 474.612 1263.47 790.029 964.708C1144.54 628.915 1507.06 258.315 1140.95 203.902C848.07 160.372 265.964 325.301 251.008 528.625" stroke="url(#ab-deco-2)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="ab-deco-2" x1="-39" y1="113" x2="2405" y2="1220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="home-content">

        {/* ============================================
            ABOUT — profile + bio card
            ============================================ */}
        <motion.section
          className="portfolio-card portfolio-card-full about-card"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="about-profile-row">
            <motion.div variants={fadeInUp}>
              <OptimizedImage
                src={withBase('images/IMG_4896_Cropped.JPG')}
                alt="Hafizh Alexander"
                className="about-profile-image"
                loading="eager"
                blurIn={true}
              />
            </motion.div>

            <motion.div className="about-bio" variants={fadeInUp}>
              <span className="card-tag">{t('about.aboutTitle')}</span>
              <h1 className="about-heading">{t('about.whoIs')}</h1>
              <div className="about-description">
                {Array.isArray(t('about.description', { returnObjects: true }))
                  ? t('about.description', { returnObjects: true }).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  : <p>{t('about.description')}</p>
                }
              </div>

              <div className="about-stats">
                <motion.div className="about-stat" variants={fadeInUp}>
                  <div className="about-stat-number">150+</div>
                  <div className="about-stat-label">{t('about.designsMade')}</div>
                </motion.div>
                <motion.div className="about-stat" variants={fadeInUp}>
                  <div className="about-stat-number">5+</div>
                  <div className="about-stat-label">{t('about.projectsDone')}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================
            SKILLS & EDUCATION — row of small cards
            ============================================ */}
        <div className="about-info-row">
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

        {/* ============================================
            EXPERIENCE — card with job items
            ============================================ */}
        <motion.section
          className="portfolio-card portfolio-card-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="portfolio-card-title">{t('about.experienceTitle')}</h2>

          <div className="about-experience-grid">
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                className="about-job-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="about-job-header">
                  <h3 className="about-job-title">{job.title}</h3>
                  <span className="about-job-duration">{job.duration}</span>
                </div>
                <p className="about-job-company">{job.company}</p>
                <div className="about-job-desc">
                  {Array.isArray(job.description) ? (
                    <ul>
                      {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{job.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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

export default About;
