import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from "../../database/mikro-orm.config";

export const initializeDatabaseConnection = async () => {
    await MikroORM.init(mikroOrmConfig);
}