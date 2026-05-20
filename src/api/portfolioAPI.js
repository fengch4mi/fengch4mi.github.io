import { withBase } from '../utils/baseUrl';

// Mock API for portfolio data
export const portfolioAPI = {
  // Get experience data
  getExperience: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Graphic Designer",
            company: "Atlus Info Indonesia",
            duration: "2021 - Present",
            description: [
              "Designing graphic elements for promotional and marketing purposes, including posters, banners, and social media materials.",
              "Creating illustrations, logos, and icons that support the branding of the game community and its events."
            ]
          },
          {
            id: 2,
            title: "Content Writer",
            company: "Atlus Info Indonesia",
            duration: "2021 - Present",
            description: [
              "Developed compelling and engaging copy for the community's social media platforms, mainly focusing on Instagram.",
              "Crafted clear and impactful copy for posts, captions, and advertisements to effectively communicate community updates, events, and achievements."
            ]
          },
          {
            id: 3,
            title: "Editor",
            company: "LPM DIGITVS INFORMATICS UNESA",
            duration: "Jul 2024 - Present",
            description: [
              "As a graphic design editor, I was responsible for visually enhancing news stories, articles, and promotional materials. I created compelling graphics and layouts that helped to engage our audience and communicate important information effectively."
            ]
          },
          {
            id: 4,
            title: "React & Back-End with AI Cohort",
            company: "Asah Led by Dicoding",
            duration: "Aug 2025 - Jan 2026",
            description: [
              "Five Month React and Back-End development with AI boothcamp as part of the Kampus Merdeka program at Asah led by Dicoding."
            ]
          }
        ]);
      }, 100);
    });
  },

  // Get social media designs
  getSocialMediaDesigns: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          row1: [
            { id: 1, src: withBase('images/ACover.png'), alt: "Desain untuk media sosial" },
            { id: 2, src: withBase('images/Cover_AZ8.png'), alt: "Desain untuk media sosial" },
            { id: 3, src: withBase('images/Artboard 1_SPL_Issue.png'), alt: "Desain untuk media sosial" }
          ],
          marquee: [
            { id: 4, src: withBase('images/FI Raidou Remastered - 1.png'), alt: "Desain untuk media sosial" },
            { id: 5, src: withBase('images/After Report CFXX  -  1.png'), alt: "Desain untuk media sosial" },
            { id: 6, src: withBase('images/cover art.png'), alt: "Desain untuk media sosial" },
            { id: 7, src: withBase('images/Frame 1.png'), alt: "Desain untuk media sosial" }
          ],
          row3: [
            { id: 8, src: withBase('images/Artboard_2.png'), alt: "Desain untuk media sosial" },
            { id: 9, src: withBase('images/Artboard 1.png'), alt: "Desain untuk media sosial" },
            { id: 10, src: withBase('images/01_cover_isogai01.png'), alt: "Desain untuk media sosial" }
          ]
        });
      }, 100);
    });
  },

  // Get UI projects
  getUIProjects: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hero: {
            images: [
              { id: 1, src: withBase('images/UI Projects/Rectangle-1.png'), alt: "UI Project Screenshot 1" },
              { id: 2, src: withBase('images/UI Projects/Rectangle-2.png'), alt: "UI Project Screenshot 2" }
            ],
            title: "StuPlan! - Android Study Planner App"
          },
          carousel: [
            { id: 3, src: withBase('images/UI Projects/Rectangle-3.png'), alt: "UI Project 3" },
            { id: 4, src: withBase('images/UI Projects/Rectangle-4.png'), alt: "UI Project 4" },
            { id: 5, src: withBase('images/UI Projects/Rectangle-5.png'), alt: "UI Project 5" },
            { id: 6, src: withBase('images/UI Projects/Rectangle-6.png'), alt: "UI Project 6" }
          ]
        });
      }, 100);
    });
  },

  // Get personal works
  getPersonalWorks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          row1: [
            { id: 1, src: withBase('images/5th of march.png'), alt: "Desain pribadi" },
            { id: 2, src: withBase('images/memoris.png'), alt: "Desain pribadi" },
            { id: 3, src: withBase('images/MENJIWAISERA-02.png'), alt: "Desain pribadi" }
          ],
          row2: [
            { id: 4, src: withBase('images/distortionnn.jpg'), alt: "Desain poster pribadi", size: "large" },
            { id: 5, src: withBase('images/metafantasy.png'), alt: "Desain poster pribadi", size: "small" },
            { id: 6, src: withBase('images/meizonit.jpg'), alt: "Desain poster pribadi", size: "large" }
          ]
        });
      }, 100);
    });
  }
};
