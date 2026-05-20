import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://fengch4mi.github.io';
const DEFAULT_TITLE = 'Portfolio - Hafizh Alexander';
const DEFAULT_DESCRIPTION = 'Portfolio of Hafizh Alexander, a graphic designer and front-end developer focused on UI/UX.';
const DEFAULT_IMAGE = `${SITE_URL}/images/IMG_4896_Cropped.JPG`;

const buildUrl = (path) => {
  const safePath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  return new URL(safePath, SITE_URL).toString();
};

const buildImageUrl = (image) => {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  return new URL(image.startsWith('/') ? image : `/${image}`, SITE_URL).toString();
};

function Seo({ title, description, path, image }) {
  const resolvedTitle = title ? `${title} | Hafizh Alexander` : DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const resolvedUrl = buildUrl(path);
  const resolvedImage = buildImageUrl(image);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={resolvedUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:image" content={resolvedImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
}

export default Seo;
