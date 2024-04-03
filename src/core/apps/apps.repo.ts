import { Inject, Injectable } from "@nestjs/common";
import { DB } from "../drizzle/constants";
import { DrizzleType } from "../drizzle/drizzle.type";
import { App, NewApp, apps } from "../schema";
import { desc, eq } from "drizzle-orm";

@Injectable()
export class AppsRepo {
    constructor(
        @Inject(DB)
        private readonly db : DrizzleType
    ) {}

    async findByUserId(userId: string) {
        return this.db.query.apps.findMany({
            where: eq(apps.userId, userId),
            orderBy: [ desc(apps.createdAt) ]
        });
    }  

    async insert(record: NewApp) {
        const [ newRecord ] = await this.db.insert(apps)
            .values(record)
            .returning({id: apps.id});
        return newRecord.id;
    }

    async update(id: string, record: Partial<App>) {
        await this.db.update(apps)
            .set(record)
            .where(eq(apps.id, id));
    }

    async findByApiKey(apiKey: string) {
        return this.db.query.apps
            .findFirst({
                where: eq(apps.apiKey, apiKey)
            });
    }

    async findById(id: string) {
        return this.db.query.apps
            .findFirst({
                where: eq(apps.id, id)
            });
    }
}