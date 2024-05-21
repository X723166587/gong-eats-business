module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'fluent-emoji.ciffelia.com'
            },
            {
                protocol: 'https',
                hostname: 'oddfellows.tv'
            },
            {
                protocol: 'https',
                hostname: 'live.staticflickr.com'
            },
            {
                protocol: 'https',
                hostname: 'img.delicious.com.au'
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com'
            }
        ]
    },
    output: 'standalone',
    transpilePackages: ['@mui/x-charts']
}