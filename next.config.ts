const withPWA = require('next-pwa')({
    dest: 'public',
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = withPWA(nextConfig);
