import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { apps } from "./apps.schema";
import { users } from "./users.schema";
import { relations, sql } from "drizzle-orm";
import { NotificationPriority } from "../common/enums";

export const notifications = pgTable('notifications', {
    id: uuid('id').defaultRandom().primaryKey(),

    appId: varchar('appId', { length: 10 })
        .references(() => apps.id, {
            onDelete: 'set null',
            onUpdate: 'cascade'
        }),
    
    userId: varchar('userId', { length: 128 })
        .references(() => users.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
        .notNull(),
    
    title: varchar('title', { length: 255 })
        .notNull(),
 
    message: varchar('message', { length: 255 }),

    image: varchar('image', { length: 255 }),

    priority: varchar('priority')
        .$type<NotificationPriority>()
        .default(NotificationPriority.Standard),

    readAt: timestamp<string, 'string'>("readAt", { mode: "string", precision: 3 })
        .default(null),

    createdAt: timestamp<string, 'string'>("createdAt", { mode: "string", precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

    updatedAt: timestamp<string, 'string'>("updatedAt", { mode: "string", precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

});

export const notificationRelations = relations(notifications, ({ one }) => ({
    app: one(apps, {
        fields: [ notifications.appId ],
        references: [ apps.id ]
    }),
    user: one(users, {
        fields: [ notifications.userId ],
        references: [ users.id ]
    })
}));

// app id is required
// but in database its allowed to be null
export type NewNotification = Omit<typeof notifications.$inferInsert, 'appId'> & { appId: string };

export type Notification = typeof notifications.$inferSelect;