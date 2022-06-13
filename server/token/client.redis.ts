import * as redis from 'redis'

export const redisClient = redis.createClient({
  url: 'redis://@redis:6379'
});

redisClient.connect();


redisClient.on('connect', () => {
  console.log('REDIS READY');
});

redisClient.on('error', err => {
  console.log('ERR', err);
});