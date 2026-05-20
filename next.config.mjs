const isUserSite = true;
const basePath = isUserSite ? '' : '/fengch4mi.github.io';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  reactCompiler: true,
};

export default nextConfig;
