import { pgTable, uuid, varchar, date } from "drizzle-orm/pg-core";


export const eventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventDate: varchar("eventDate", { length: 15 }).notNull(),
  title: varchar("title", { length: 50}).notNull(),
  description: varchar("description", { length: 50}).notNull()
});
