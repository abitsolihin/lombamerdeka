/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    middleware: [
        (req, res, next) => {
            const apiKey = req.headers['x-api-key'];
            if (!apiKey) {
                return res.status(401).json({ error: 'API key is missing' });
            }
            if (apiKey !== 'y-secret-api-key') {
                return res.status(403).json({ error: 'Invalid API key' });
            }
            next();
        },
    ],
}

module.exports = nextConfig
