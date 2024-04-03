import { Provider } from "@nestjs/common";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from '../schema';
import { DB } from "./constants";
import config from './drizzle.config';
import { DrizzleType } from "./drizzle.type";

export default {
    provide: DB,
    useFactory: () => {
        const connection = postgres(config.dbCredentials.connectionString);
        return drizzle(connection, {
            schema: schema
        }) as DrizzleType
    },
} satisfies Provider;