import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  health: integer("health").notNull(),
});

export type CharacterDTO = typeof characters.$inferSelect;
export type NewCharacterDTO = typeof characters.$inferInsert;
