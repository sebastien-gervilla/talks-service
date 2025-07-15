import Fastify from 'fastify';
import { UserService } from '@librairies/shared-interfaces/user-service';

// Extend FastifyRequest type
declare module 'fastify' {
    interface FastifyRequest {
        user?: UserService.Models.User.JWTPayload;
    }
}