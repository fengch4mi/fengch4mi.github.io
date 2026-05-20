import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Seo from '../components/Seo';
import { withBase } from '../utils/baseUrl';
import { usePrerenderReady } from '../utils/prerenderReady';

const githubIcon = withBase('assets/Github.svg');
const instagramIcon = withBase('assets/Instagram.svg');
const linkedinIcon = withBase('assets/Linkedin.svg');
const hafizhAlexanderSvg = withBase('assets/Hafizh-Alexander.svg');
const portfolioSvg = withBase('assets/Portfolio.svg');

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const stuplanRef = useRef(null);
  const stuplanViewportRef = useRef(null);
  const [stuplanIndex, setStuplanIndex] = useState(0);
  const uiProjectsBase = withBase('images/UI%20Projects/');
  const description =
    'Personal portfolio of Hafizh Alexander featuring UI/UX, social media, and personal graphic design.';
  const stuplanSlides = [
    'Rectangle-1.webp',
    'Rectangle-2.webp',
    'Rectangle-3.webp',
    'Rectangle-4.webp',
    'Rectangle-5.webp',
    'Rectangle-6.webp'
  ];

  const scrollStuplanTo = (nextIndex) => {
    const viewport = stuplanViewportRef.current;
    if (!viewport) return;
    const maxIndex = stuplanSlides.length - 1;
    const clamped = Math.max(0, Math.min(nextIndex, maxIndex));
    viewport.scrollTo({ left: clamped * viewport.clientWidth, behavior: 'smooth' });
    setStuplanIndex(clamped);
  };

  const handleStuplanScroll = () => {
    const viewport = stuplanViewportRef.current;
    if (!viewport) return;
    const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);
    if (nextIndex !== stuplanIndex) {
      setStuplanIndex(nextIndex);
    }
  };

  useEffect(() => {
    const target = stuplanRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPortfolio(entry.isIntersecting);
      },
      {
        threshold: 0.4,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  usePrerenderReady(true);

  return (
    <>
      <Seo title="Home" description={description} path="/" />
      <main className="slide prototype-slide">
        <div className={`slide-bg ${showPortfolio ? 'show-portfolio' : ''}`} aria-hidden="true">
          <div className="bg-glow bg-glow-portfolio" />
          <div className="bg-glow bg-glow-name" />
          <img className="portfolio" alt="" src={portfolioSvg} />
          <img className="hafizh-alexander" alt="" src={hafizhAlexanderSvg} />
        </div>

        <button
          type="button"
          className={`nav-button ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <div className="rectangle" />
          <div className="rectangle" />
        </button>

        <nav className={`prototype-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)}>
            Portfolio
          </NavLink>
        </nav>

        <section className="intro-card hover-lift">
          <h1 className="intro-title">ALEX'S ART TAVERN</h1>
          <p className="intro-text">
            A cozy corner for my UI experiments and graphic stories.
            <br />
            I'm Hafizh Alexander - a graphic designer crafting interfaces, social media visuals, and personal graphic works.
          </p>
        </section>

        <section className="what-i-do hover-lift">
          <div className="card-tag">WHAT I DO?</div>
          <div className="what-divider" aria-hidden="true"></div>
          <ul className="what-list">
            <li>
              <Link to="/portfolio#social-media" className="what-link">
                <span>Social Media Design</span>
                <span className="what-index">01</span>
              </Link>
            </li>
            <li>
              <Link to="/portfolio#ui-projects" className="what-link">
                <span>UI/UX Design</span>
                <span className="what-index">02</span>
              </Link>
            </li>
            <li>
              <Link to="/portfolio#personal-works" className="what-link">
                <span>Personal Graphic Design</span>
                <span className="what-index">03</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="tech-stack hover-lift">
          <div className="frame-13">
            <div className="text-wrapper-22">TECH STACK</div>
          </div>
          <div className="tech-divider" aria-hidden="true"></div>
          <div className="text-wrapper-23">React</div>
          <div className="tech-divider" aria-hidden="true"></div>
          <div className="text-wrapper-23">Node.js</div>
          <div className="tech-divider" aria-hidden="true"></div>
          <div className="text-wrapper-23">Figma</div>
          <div className="tech-divider" aria-hidden="true"></div>
          <div className="text-wrapper-23">Adobe Photoshop</div>
        </section>

        <Link
          to="/about"
          className={`more-about-me-4 hover-lift ${showPortfolio ? 'show-portfolio' : ''}`}
          aria-label="Go to about page"
        >
          <div className="more-about-me-5">
            More
            <br />
            about me
          </div>
          <FiArrowRight className="arrow-right" aria-hidden="true" />
        </Link>

        <section className="stuplan-card hover-lift" ref={stuplanRef}>
          <div className="card-tag">UI/UX WORKS</div>
          <div className="card-heading">Stuplan! Android Study Planner App</div>
          <Link to="/portfolio#ui-projects" className="card-link">
            [ MORE HERE ]
          </Link>
          <div className="stuplan-carousel" aria-label="Stuplan UI carousel">
            <button
              type="button"
              className="stuplan-btn prev"
              onClick={() => scrollStuplanTo(stuplanIndex - 1)}
              disabled={stuplanIndex === 0}
              aria-label="Previous Stuplan slide"
            >
              <FiArrowLeft />
            </button>
            <div
              className="stuplan-viewport"
              ref={stuplanViewportRef}
              onScroll={handleStuplanScroll}
            >
              <div className="stuplan-track">
                {stuplanSlides.map((fileName) => (
                  <div className="stuplan-slide" key={fileName}>
                    <img
                      src={`${uiProjectsBase}${fileName}`}
                      alt="Stuplan UI preview"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="stuplan-btn next"
              onClick={() => scrollStuplanTo(stuplanIndex + 1)}
              disabled={stuplanIndex === stuplanSlides.length - 1}
              aria-label="Next Stuplan slide"
            >
              <FiArrowRight />
            </button>
          </div>
        </section>

        <section className="social-media-card hover-lift">
          <div className="card-tag">SOCIAL MEDIA WORKS</div>
          <div className="card-heading">ATLUS INFO INDONESIA</div>
          <div className="media-grid">
            <div className="media-box">
              <img
                src={withBase('images/Cover_AZ8.webp')}
                alt="Social media design cover"
              />
            </div>
            <div className="media-box">
              <img
                src={withBase('images/ACover.webp')}
                alt="Social media design cover"
              />
            </div>
          </div>
          <Link to="/portfolio#social-media" className="card-link">
            [ MORE HERE ]
          </Link>
        </section>

        <section className="design-graphic-card hover-lift">
          <div className="card-tag">DESIGN GRAPHIC WORKS</div>
          <div className="card-heading">Personal Works</div>
          <div className="media-grid">
            <div className="media-box">
              <img
                src={withBase('images/5th of march.webp')}
                alt="Design graphic work"
              />
            </div>
            <div className="media-box">
              <img
                src={withBase('images/memoris.webp')}
                alt="Design graphic work"
              />
            </div>
          </div>
          <Link to="/portfolio#personal-works" className="card-link">
            [ MORE HERE ]
          </Link>
        </section>

        <div className="more-portfolio hover-lift" nav>
          <Link to="/portfolio" className="more-portfolio-link">
            <FiArrowLeft className="arrow-left" aria-hidden="true" />
            <div className="text-wrapper-21">More of my works</div>
          </Link>
        </div>

        <footer className="footer-shell">
          <div className="frame">
            <div className="frame-content">
              <div className="frame-left">
                <h2>Let's build something bold.</h2>
                <p>
                  If you have a story to tell, I can translate it into
                  <br />
                  clean interfaces and vivid visuals.
                </p>
                <p>Say hi at</p>
                <div className="frame-email">
                  <strong>alexanderhafizh@gmail.com</strong>
                </div>
              </div>
              <div className="frame-right">
                <div className="frame-socials-title">Socials</div>
                <div className="frame-social-card github">
                  <div className="social-icon">
                    <img src={githubIcon} alt="Github" />
                  </div>
                  <div className="frame-social-label">Github</div>
                  <div className="frame-social-handle">@fengch4mi</div>
                </div>
                <div className="frame-social-card linkedin">
                  <div className="social-icon">
                    <img src={linkedinIcon} alt="Linkedin" />
                  </div>
                  <div className="frame-social-label">Linkedin</div>
                  <div className="frame-social-handle">Hafizh Dakota Alexander</div>
                </div>
                <div className="frame-social-card instagram">
                  <div className="social-icon">
                    <img src={instagramIcon} alt="Instagram" />
                  </div>
                  <div className="frame-social-label">Instagram</div>
                  <div className="frame-social-handle">@alexnyaan</div>
                </div>
              </div>
            </div>
            <div className="frame-footer">© 2026 Hafizh Dakota Alexander</div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;
