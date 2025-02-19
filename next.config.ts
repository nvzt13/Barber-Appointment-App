/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'plus.unsplash.com',
      'images.unsplash.com',
      'media.istockphoto.com',
      'images.pexels.com',
      'encrypted-tbn0.gstatic.com',
      'neweralive.na',
      'lh3.googleusercontent.com', // Google profil resimleri için ekledik
    ], 
  },
};

module.exports = nextConfig;
