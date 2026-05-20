const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

export const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

export const routerBase = baseUrl === '/' ? '/' : baseUrl.slice(0, -1);

export const withBase = (path = '') => {
  const cleaned = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleaned}`;
};
