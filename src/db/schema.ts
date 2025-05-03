import { pgTable, uuid, varchar, date } from "drizzle-orm/pg-core";


export const eventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date"),
  title: varchar("title", { length: 255}).notNull() ,
  description: varchar("title", { length: 255}).notNull()
});
