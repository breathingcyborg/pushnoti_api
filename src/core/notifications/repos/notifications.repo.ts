import { Inject, Injectable } from "@nestjs/common";
import { NewNotification, Notification, notifications } from "../../schema/notifications.schema";
import { DB } from "../../drizzle/constants";
import { DrizzleType } from "../../drizzle/drizzle.type";
import { SQL, and, asc, desc, eq, gt, lt, or } from "drizzle-orm";
import { fcmTokens } from "src/core/schema";

@Injectable()
export class NotificationsRepo {

    constructor(
        @Inject(DB)
        private db : DrizzleType
    ) {}

    async insert(record: NewNotification) {
        const [ newRecord ] = await this
            .db
            .insert(notifications)
            .values(record)
            .returning({ id: notifications.id });
        return newRecord.id;
    }

    async update(id: string, record: Partial<Notification>) {
        await this.db
            .update(notifications)
            .set(record)
            .where(eq(notifications.id, id));
    }

    async findById(id: string) {
        return this.db.query.notifications.findFirst({
            where: eq(notifications.id, id),
            with: {
                app: {
                    columns: {
                        id: true,
                        displayName: true,
                    }
                }
            }
        });
    }

    /**
     * Cursor paginate user notifications
     * from newest to oldest.
     * 
     */
    async cursorPaginateUserNotifications({  
        userId,
        lastId,
        lastTimestamp,
        limit,
    } : {
        userId: string, 
        limit: number,
        lastId?: string, 
        lastTimestamp?: string
    }) {
        const filters : SQL[] = [];
        filters.push(eq(notifications.userId, userId));
        
        if (lastId && lastTimestamp) {
            filters.push(
                or(
                    lt(notifications.createdAt, lastTimestamp),
                    and(
                        eq(notifications.createdAt, lastTimestamp),
                        lt(notifications.id, lastId),
                    )
                )
            );
        }

        // console.log(filters);

        return this.db.query.notifications.findMany({
            where: filters.length > 1 
                ? and(...filters)
                : filters[0],
            limit: limit,
            orderBy: [ desc(notifications.createdAt), desc(notifications.id) ],
            with: {
                app: {
                    columns: {
                        id: true,
                        displayName: true,
                    }
                }
            }
        });
    }

    /**
     * 
     * Cursor paginate user notifications
     * from oldest to latest
     * 
     */
    async cursorPaginateUserLatestNotifications({  
        userId,
        lastId,
        lastTimestamp,
        limit,
    } : {
        userId: string, 
        limit: number,
        lastId?: string, 
        lastTimestamp?: string
    }) {
        const filters : SQL[] = [];
        filters.push(eq(notifications.userId, userId));
        
        if (lastId && lastTimestamp) {
            filters.push(
                or(
                    gt(notifications.createdAt, lastTimestamp),
                    and(
                        eq(notifications.createdAt, lastTimestamp),
                        gt(notifications.id, lastId),
                    )
                )
            );
        }


        return this.db.query.notifications.findMany({
            where: filters.length > 1 
                ? and(...filters)
                : filters[0],
            limit: limit,
            orderBy: [ asc(notifications.createdAt), asc(notifications.id) ],
            with: {
                app: {
                    columns: {
                        id: true,
                        displayName: true,
                    }
                }
            }
        });
    }
}