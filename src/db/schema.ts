import { pgTable, uuid, varchar, date, boolean } from "drizzle-orm/pg-core";


export const eventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date"),
  title: varchar("title", { length: 255}).notNull() ,
  description: varchar("title", { length: 255}).notNull()
});

export const todoTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date"),
  title: varchar("title", { length: 255}).notNull() ,
  description: varchar("title", { length: 255}).notNull() ,
  finished: boolean("finished").default(false),
});
