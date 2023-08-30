const validApiKeys = process.env.API_KEY;

export default function validateApiKey(apiKey) {
    
    return (validApiKeys.includes(apiKey));
}
