import Fastify from 'fastify';
import { UserService } from '@librairies/shared-interfaces/user-service';
import { Connection, EntityManager, IDatabaseDriver, PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';

// Extend FastifyRequest type
declare module 'fastify' {
    interface FastifyRequest {
        user?: UserService.Models.User.JWTPayload;
        em: SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>;
    }
}