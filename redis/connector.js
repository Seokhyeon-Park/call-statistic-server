const redis = require('redis');

// Redis client 생성
const client = redis.createClient();

/*********
 * Redis *
 *********/
client.on('error', (error) => { console.log('Redis error : ', error); });
client.on('connect', () => { console.log("Redis connected") });

// Redis 연결
client.connect();

module.exports = client;