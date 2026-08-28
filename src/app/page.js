import Home from '../views/Home';

export const metadata = {
  title: 'Home | Hafizh Alexander',
  description:
    'Personal portfolio of Hafizh Alexander featuring UI/UX, social media, and personal graphic design.',
  openGraph: {
    title: 'Home | Hafizh Alexander',
    description:
      'Personal portfolio of Hafizh Alexander featuring UI/UX, social media, and personal graphic design.',
    url: 'https://fengch4mi.github.io/',
    type: 'website',
  },
};

export default function HomePage() {
  return <Home />;
}
