import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from './users.schema';
import { relations, sql } from "drizzle-orm";

export const fcmTokens = pgTable('fcmTokens', {

    token: varchar('token', { length: 256 }).primaryKey(),

    userId: varchar('userId', { length: 128 }).references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }).notNull(),

    createdAt: timestamp("createdAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

    updatedAt: timestamp("updatedAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

});

export const fcmTokensRelations = relations(fcmTokens, ({ one }) => ({
    user: one(users, {
        fields: [ fcmTokens.userId ],
        references: [ users.id ],
    }),
}));

export type NewFCMToken = typeof fcmTokens.$inferInsert;

export type FCMToken = typeof fcmTokens.$inferSelect;