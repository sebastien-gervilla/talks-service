import { config } from 'dotenv';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { entities } from '../src/entities';

config({
    path: __dirname + '/../.env'
});

export default defineConfig({
    host: process.env.POSTGRES_HOST,
    port: Number.parseInt(process.env.POSTGRES_PORT!, 10),
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    entities: [entities.user],
    extensions: [Migrator],
    migrations: {
        path: __dirname + '/migrations'
    }
});