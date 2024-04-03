import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { fcmTokens } from "./fcm-tokens.schema";
import { notifications } from "./notifications.schema";
import { apps } from "./apps.schema";

export const users = pgTable('users', {

    // firebase uid
    id: varchar('id', { length: 128 }).primaryKey(), 

    notimail: varchar('notimail').default(null).unique(),

    displayName: varchar('displayName').default(null),

    email: varchar('email').default(null),

    createdAt: timestamp("createdAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

    updatedAt: timestamp("updatedAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

});

export const userRelations = relations(users, ({ many }) => ({
    fcmTokens: many(fcmTokens),
    notifications: many(notifications),
    apps: many(apps)
}));

export type NewUser = typeof users.$inferInsert;

export type User = typeof users.$inferSelect;