import Fastify from 'fastify';
import { Models } from './interfaces';
import { Connection, EntityManager, IDatabaseDriver, PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';

// Extend FastifyRequest type
declare module 'fastify' {
    interface FastifyRequest {
        user?: Models.User.JWTPayload;
        em: SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>;
    }
}