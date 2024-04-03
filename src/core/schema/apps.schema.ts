import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const apps = pgTable('apps', {
    id: varchar('id', { length: 10 }).primaryKey(),

    displayName: varchar('displayName').notNull(),

    apiKey: varchar('apiKey', { length: 20 }).unique().notNull(),

    userId: varchar('userId', { length: 128 })
        .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
        .notNull(),

    createdAt: timestamp("createdAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),

    updatedAt: timestamp("updatedAt", { precision: 3 }).default(
        sql`current_timestamp(3)`,
    ).notNull(),
});

export const appsRelations = relations(apps, ({ one }) => ({
    user: one(users, {
        fields: [ apps.userId ],
        references: [ users.id ],
    })
}));

export type NewApp = typeof apps.$inferInsert;

export type App = typeof apps.$inferSelect;