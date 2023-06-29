/** @type {import('next').NextConfig} */
const nextConfig = {
      experimental: {
        serverActions: true,
      },
      images: {
        domains: ["images.unsplash.com", "res.cloudinary.com"],
      },
      webpack: (config, { isServer }) => {
        // Sadece sunucu tarafında çalışacaksa (isServer=true), kritik bağımlılık hatasını önle
        if (isServer) {
          config.externals.push('mongodb', 'mongoose');
        }
    
        return config;
      },
}

module.exports = nextConfig
