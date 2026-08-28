import "../styles/theme.css";
import "../styles/micro-interactions.css";
import "../styles/optimized-image.css";
import "../styles/lazy-load.css";
import "../styles/guide.css";
import "../styles/exmple.css";
import "../views/tailwind.css";
import "../index.css";
import "../App.css";
import "../components/BackgroundCircles.css";
import "../components/Carousel.css";
import "../components/ErrorBoundary.css";
import "../components/Header.css";
import "../components/SkeletonLoader.css";
import "../components/ThemeToggle.css";
import "../components/TiltImage.css";
import "../views/Home.css";
import "../views/About.css";
import "../views/Portfolio.css";
import "../views/Prototype.css";
import Providers from "./providers";

export const metadata = {
  title: "Portfolio - Hafizh Alexander",
  description:
    "Portfolio of Hafizh Alexander, a graphic designer and front-end developer focused on UI/UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
