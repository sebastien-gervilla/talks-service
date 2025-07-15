// Configuration
import './configuration/aliases';
import { environment } from './configuration/environment';
import { initializeDatabaseConnection } from './configuration/database';

// Librairies
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

// Controllers
import { controllers } from './controllers';

const fastify = Fastify({
    logger: true,
});

const initializeServer = async () => {

    const { port, allowedOrigin } = environment;

    // Database Connection
    const orm = await initializeDatabaseConnection();

    // Make MikroORM available app-wide
    fastify.decorate('orm', orm);

    // Create a fresh EM for each request
    fastify.addHook('onRequest', async (request, _reply) => {
        request.em = orm.em.fork();
    });

    // Shut down the connection when closing the app
    fastify.addHook('onClose', async () => {
        await orm.close();
    });

    // Fastify configuration
    fastify.register(fastifyCors, {
        origin: allowedOrigin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    });

    fastify.register(fastifyCookie);

    // Controllers
    fastify.register(controllers.user);
    fastify.register(controllers.speaker);

    // Server listening
    await fastify.listen({ port, host: '0.0.0.0' });

    console.log(`\x1b[33m⚡️ Talks service is running at http://localhost:${port}\x1b[0m`);
};

initializeServer();