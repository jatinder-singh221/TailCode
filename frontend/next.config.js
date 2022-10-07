const removeImports = require('next-remove-imports')();
const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
  },
  // reactStrictMode: true,
}

module.exports = module.exports = removeImports(nextConfig);
