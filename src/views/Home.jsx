'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { withBase } from '../utils/baseUrl';
import { portfolioAPI } from '../api/portfolioAPI';
import TiltImage from '../components/TiltImage';
import './Home.css';

const TECH_STACK = ['React', 'Node.js', 'Figma', 'Adobe Photoshop'];

const SERVICES = [
  { label: 'Social Media Design', num: '01' },
  { label: 'UI/UX Design', num: '02' },
  { label: 'Front-End Developer', num: '03' },
];

function Home() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [socialImages, setSocialImages] = useState([]);
  const [personalImages, setPersonalImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [proj, social, personal] = await Promise.all([
        portfolioAPI.getProjects(),
        portfolioAPI.getSocialMediaDesigns(),
        portfolioAPI.getPersonalWorks(),
      ]);
      setProjects(proj);
      setSocialImages([...social.marquee.slice(0, 2), ...social.marquee.slice(2, 4)]);
      setPersonalImages([...personal.row1.slice(0, 2), ...personal.row2.slice(0, 2)]);
    };
    load();
  }, []);

  return (
    <div className="home-page">
      {/* Decorative SVG backgrounds */}
      <svg className="bg-deco bg-deco-top" viewBox="0 0 2746 2395" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2664.14 1073.81C2495.47 1560.82 1852.75 1669.99 1987.87 1081.92C2122.98 493.848 1821.37 888.117 1751.13 996.651C1680.89 1105.19 1481.83 1509.01 1468.18 980.515C1451.11 319.901 1211.67 921.113 1211.67 921.113C1094.96 1285.29 885.323 1955.12 896.264 1551.6C908.56 1098.06 903.253 616.386 626.966 821.173C405.937 985.002 131.846 1475.81 255.607 1619.23" stroke="url(#deco-grad-1)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="deco-grad-1" x1="-208" y1="1537" x2="2125" y2="657" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <svg className="bg-deco bg-deco-bottom" viewBox="0 0 2845 2116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2499.02 1946.49C2000.04 2188.76 1427.83 1782.71 1978.19 1438.01C2528.55 1093.3 1998.97 1163.81 1862.92 1192.95C1726.87 1222.1 1268.07 1377.93 1659.87 965.344C2149.62 449.614 1509.87 724.929 1509.87 724.929C1143.9 913.251 474.612 1263.47 790.029 964.708C1144.54 628.915 1507.06 258.315 1140.95 203.902C848.07 160.372 265.964 325.301 251.008 528.625" stroke="url(#deco-grad-2)" strokeOpacity="0.25" strokeWidth="100"/>
        <defs>
          <linearGradient id="deco-grad-2" x1="-39" y1="113" x2="2405" y2="1220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0046FF" stopOpacity="0.08"/>
            <stop offset="0.48" stopColor="#6F3797" stopOpacity="0.92"/>
            <stop offset="1" stopColor="#E62727"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="home-content">

        {/* Hero Card */}
        <motion.section
          className="hero-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-text">
            <h1 className="hero-heading">
              <span className="hero-name">{t('home.name')}</span>
            </h1>
            <p className="hero-desc">{t('home.description')}</p>
          </div>
        </motion.section>

        {/* Skills Row */}
        <div className="skills-row">
          <motion.div
            className="tech-stack-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="card-tag">TECH STACK</span>
            <ul className="stack-list">
              {TECH_STACK.map((item, i) => (
                <li key={item} className={i < TECH_STACK.length - 1 ? 'stack-item with-divider' : 'stack-item'}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="services-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="card-tag">WHAT I DO?</span>
            <ul className="services-list">
              {SERVICES.map((s, i) => (
                <li key={s.label} className={i < SERVICES.length - 1 ? 'service-item with-divider' : 'service-item'}>
                  <span className="service-label">{s.label}</span>
                  <span className="service-num">{s.num}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Projects Section (Text-only cards) */}
        <motion.section
          className="portfolio-card portfolio-card-full projects-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="projects-header">
            <div className="projects-title-group">
              <h2 className="projects-title">Projects</h2>
              <span className="projects-count">({projects.length})</span>
            </div>
            <span className="card-tag">Selected Works</span>
          </div>

          <div className="projects-grid">
            {projects.map((project) => {
              const isExternal = project.isExternal;
              const CardTag = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                : { href: project.link };

              return (
                <CardTag
                  key={project.id}
                  className="project-card"
                  {...linkProps}
                >
                  <div className="project-card-top">
                    <h3 className="project-card-title">{project.title}</h3>
                    <svg
                      className="project-arrow-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardTag>
              );
            })}
          </div>
        </motion.section>

        {/* Social Media + Personal Works (Kept separate) */}
        <div className="portfolio-row">
          <motion.div
            className="portfolio-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="portfolio-card-header">
              <h2 className="portfolio-card-title">Social Media</h2>
              <Link href="/portfolio#social-media" className="card-view-link">
                View all ↗
              </Link>
            </div>
            <div className="image-grid">
              {socialImages.length > 0
                ? socialImages.map((img, i) => (
                    <TiltImage
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="175 / 219"
                      tiltIntensity={8}
                      glare={true}
                      loading="lazy"
                      corners={true}
                    />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="grid-img-wrap grid-placeholder" />
                  ))}
            </div>
          </motion.div>

          <motion.div
            className="portfolio-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="portfolio-card-header">
              <h2 className="portfolio-card-title">Personal Works</h2>
              <Link href="/portfolio#personal-works" className="card-view-link">
                View all ↗
              </Link>
            </div>
            <div className="image-grid">
              {personalImages.length > 0
                ? personalImages.map((img, i) => (
                    <TiltImage
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      aspectRatio="175 / 219"
                      tiltIntensity={8}
                      glare={true}
                      corners={true}
                      loading="lazy"
                    />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="grid-img-wrap grid-placeholder" />
                  ))}
            </div>
          </motion.div>
        </div>

        {/* Contact / Footer */}
        <motion.section
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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

export default Home;
