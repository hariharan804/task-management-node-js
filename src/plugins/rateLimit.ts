import fastifyRateLimit from '@fastify/rate-limit';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(fastifyRateLimit, {
    max: 200, // Max requests allowed
    timeWindow: '1 minute', // Time window for the rate limit
    cache: 10000, // Cache size
    allowList: ['127.0.0.1'], // Allow specific IPs
    skipOnError: true, // Skip rate-limiting on error
    hook: 'onRequest', // Apply the rate limit on incoming requests
    keyGenerator: (request) => request.ip, // Rate limit based on the IP address
  });
});
