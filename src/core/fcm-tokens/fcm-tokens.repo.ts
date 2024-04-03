import { Inject, Injectable } from "@nestjs/common";
import { DrizzleType } from "../drizzle/drizzle.type";
import { DB } from "../drizzle/constants";
import { and, eq, gte, lt } from "drizzle-orm";
import { FCMToken, NewFCMToken, fcmTokens } from "../schema";
import { subDays } from "date-fns";
import { TOKEN_VALIDITY_DAYS } from "./constants";

@Injectable()
export class FCMTokensRepo {

    constructor(
        @Inject(DB)
        private db : DrizzleType
    ) {}

    async findByToken(token: string) {
        return this.db.query.fcmTokens.findFirst({
            where: eq(fcmTokens.token, token)
        });
    }

    async findByUserId(userId: string) {
        return this.db.query.fcmTokens.findMany({
            where: and(
                eq(fcmTokens.userId, userId),
                gte(fcmTokens.updatedAt, subDays(new Date(), TOKEN_VALIDITY_DAYS)),
            )
        });
    }

    async create(record: NewFCMToken) {
        const [ newRecord ] = await this
            .db
            .insert(fcmTokens)
            .values(record)
            .returning({ token: fcmTokens.token });
        return newRecord.token;
    }

    async update(token: string, record: Partial<FCMToken>) {
        await this.db
            .update(fcmTokens)
            .set(record)
            .where(eq(fcmTokens.token, token));
    }
}