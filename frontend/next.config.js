const removeImports = require('next-remove-imports')();
const nextConfig = {
  images: {
    domains: ['127.0.0.1', '65.20.76.26'],
  },
  reactStrictMode: false,
}

module.exports = module.exports = removeImports(nextConfig);
