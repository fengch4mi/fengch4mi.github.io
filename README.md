# Hafizh Alexander — Portfolio

A personalized, interactive portfolio website built with **Next.js (App Router)**, **React**, **Framer Motion**, and clean CSS design tokens.

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [How to Add or Change Projects](#1-how-to-add-or-change-projects)
4. [How to Change Images & Galleries](#2-how-to-change-images--galleries)
5. [How to Configure Homepage 2x2 Image Grids](#3-how-to-configure-homepage-2x2-image-grids)
6. [How to Update Experience & Bio](#4-how-to-update-experience--bio)
7. [How to Update Tech Stack & Services on Homepage](#5-how-to-update-tech-stack--services-on-homepage)
8. [Color Palette & Dark Mode](#6-color-palette--dark-mode)

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── public/
│   └── images/               # All raw images, posters, and UI screenshots
├── src/
│   ├── api/
│   │   └── portfolioAPI.js   # Central mock data source (Projects, Experience, Galleries)
│   ├── app/                  # Next.js App Router routes (/, /about, /portfolio)
│   ├── components/
│   │   ├── Header.jsx        # Sticky pill navigation header
│   │   ├── TiltImage.jsx     # 3D interactive tilt & holographic glare component
│   │   ├── OptimizedImage.jsx# Image wrapper with blur-in animation
│   │   └── ...
│   ├── locales/              # i18n translations (en.json, id.json)
│   ├── styles/
│   │   └── theme.css         # Design tokens & dark/light color variables
│   └── views/
│       ├── Home.jsx & .css   # Landing page
│       ├── About.jsx & .css  # Profile, skills & experience page
│       └── Portfolio.jsx & .css # Full gallery showcase
```

---

## 1. How to Add or Change Projects

The general Projects list on the Homepage is managed centrally in **`src/api/portfolioAPI.js`** inside the `getProjects()` function:

### File Location:
👉 **[`src/api/portfolioAPI.js`](src/api/portfolioAPI.js)**

### Project Data Schema:
```javascript
{
  id: 'unique-project-id',    // Unique identifier string
  title: 'Project Name',      // Project title displayed on the card
  description: '...',         // 1-2 sentence description of the project
  tags: ['React', 'Figma'],   // Array of tech stack or category tags
  link: '/portfolio#ui-projects', // Target URL (Internal route or external link)
  isExternal: false           // true = opens in new tab (e.g. GitHub/Demo)
                              // false = internal Next.js link (e.g. /portfolio)
}
```

### Example: Adding a New Project:
Open `src/api/portfolioAPI.js` and add your new item to the array inside `getProjects()`:

```javascript
getProjects: () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'stuplan',
          title: 'StuPlan!',
          description: 'Android-based study planner application focused on simplicity and productivity.',
          tags: ['Android', 'UI/UX', 'Figma', 'Kotlin'],
          link: '/portfolio#ui-projects',
          isExternal: false
        },
        // 👉 ADD YOUR NEW PROJECT HERE:
        {
          id: 'my-web-app',
          title: 'My Awesome Web App',
          description: 'Full-stack dashboard built with Next.js, Tailwind, and PostgreSQL.',
          tags: ['Next.js', 'React', 'TypeScript'],
          link: 'https://github.com/fengch4mi/my-web-app',
          isExternal: true
        }
      ]);
    }, 100);
  });
},
```

The count badge `Projects (N)` and 2-column card grid on the Homepage will update automatically!

---

## 2. How to Change Images & Galleries

### Step 1: Add your image files
Place your image files into:
* **`public/images/`** (for social media designs and personal artworks)
* **`public/images/UI Projects/`** (for UI/UX project screenshots)

### Step 2: Register images in `src/api/portfolioAPI.js`
Open **[`src/api/portfolioAPI.js`](src/api/portfolioAPI.js)**:

* **Social Media (`getSocialMediaDesigns`)**:
  * `row1`: 3 images for the top 1:1 grid on `/portfolio`.
  * `marquee`: Scrolling carousel items on `/portfolio`.
  * `row3`: 3 images for the 4:5 ratio grid on `/portfolio`.
* **Personal Works (`getPersonalWorks`)**:
  * `row1`: 3 images for the 1:1 grid.
  * `row2`: 3 images for the mixed aspect-ratio grid (`size: 'large'` or `size: 'small'`).
* **UI Projects (`getUIProjects`)**:
  * `hero.images`: 2 featured screenshots for StuPlan.
  * `carousel`: Additional screenshot gallery items.

---

## 3. How to Configure Homepage 2x2 Image Grids

On the Homepage, the **Social Media** and **Personal Works** cards each display a 2×2 grid (4 photos total) with 3D tilt effects.

### File Location:
👉 **[`src/views/Home.jsx`](src/views/Home.jsx)** (around lines 30–40):

```javascript
useEffect(() => {
  const load = async () => {
    const [proj, social, personal] = await Promise.all([
      portfolioAPI.getProjects(),
      portfolioAPI.getSocialMediaDesigns(),
      portfolioAPI.getPersonalWorks(),
    ]);
    setProjects(proj);

    // 👉 Choose which 4 photos appear in Social Media 2x2:
    setSocialImages([...social.marquee.slice(0, 2), ...social.marquee.slice(2, 4)]);

    // 👉 Choose which 4 photos appear in Personal Works 2x2:
    setPersonalImages([...personal.row1.slice(0, 2), ...personal.row2.slice(0, 2)]);
  };
  load();
}, []);
```

You can customize which items from `social` or `personal` are sliced into the 4 slots.

---

## 4. How to Update Experience & Bio

### 1. Work Experience:
Open **[`src/api/portfolioAPI.js`](src/api/portfolioAPI.js)** inside `getExperience()`:
```javascript
{
  id: 1,
  title: "Graphic Designer",
  company: "Company Name",
  duration: "2024 - Present",
  description: [
    "Key responsibility or achievement 1.",
    "Key responsibility or achievement 2."
  ]
}
```

### 2. Bio & Translations:
Open **[`src/locales/en.json`](src/locales/en.json)** and **[`src/locales/id.json`](src/locales/id.json)**:
* `about.whoIs`: Main about headline.
* `about.description`: Array of paragraphs describing your background.
* `about.softSkillsList`: Comma-separated list of soft skills.
* `about.expertiseList`: Comma-separated list of core expertise.
* `about.softwareList`: Software tools you use.
* `about.degree`, `about.school`, `about.duration`: Education details.

---

## 5. How to Update Tech Stack & Services on Homepage

Open **[`src/views/Home.jsx`](src/views/Home.jsx)** (lines 13–19):

```javascript
// Tech stack pill tags:
const TECH_STACK = ['React', 'Node.js', 'Figma', 'Adobe Photoshop'];

// Services list:
const SERVICES = [
  { label: 'Social Media Design', num: '01' },
  { label: 'UI/UX Design', num: '02' },
  { label: 'Front-End Developer', num: '03' },
];
```

---

## 6. Color Palette & Dark Mode

All colors are controlled by CSS Custom Properties in **[`src/styles/theme.css`](src/styles/theme.css)**:

* `--bg-primary`, `--bg-card`, `--bg-secondary`
* `--text-primary`, `--text-secondary`
* `--border-color`
* `--accent-color` (primary brand color)
* `--accent-warm` (secondary warm accent)

Both light and dark modes switch automatically using `[data-theme='dark']` tokens.
