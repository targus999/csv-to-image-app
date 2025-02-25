const redis = require("redis");
const { REDIS_URL } = require("../config/dotenv.config");

// Create Redis client
const client = redis.createClient({
    url: REDIS_URL ,
});

// Handle errors
client.on("error", (err) => console.error("Redis Client Error:", err));

// Ensure Redis is connected before using it
async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
    }
}

// Cache image in Redis (store as base64)
async function cacheImage(key, buffer) {
    await connectRedis(); // Ensure connection
    if(!client.isOpen){
        return null;
    }
    await client.setEx(key, 3600, buffer.toString("base64")); // Store for 1 hour
}
 
// Get cached image from Redis
async function getCachedImage(key) {
    await connectRedis(); // Ensure connection
    if(!client.isOpen){
        return null;
    }
    const data = await client.get(key);
    return data ? Buffer.from(data, "base64") : null;
}

module.exports = { getCachedImage, cacheImage };
