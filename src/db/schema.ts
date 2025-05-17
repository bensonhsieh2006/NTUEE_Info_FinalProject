import { index, pgTable, uuid, varchar, date, boolean, integer } from "drizzle-orm/pg-core";


export const eventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventDate: varchar("eventDate", { length: 15 }).notNull(),
  title: varchar("title", { length: 50}).notNull(),
  description: varchar("description", { length: 50}).notNull(),
  colorValue: varchar("colorValue", {length: 15}).notNull(),
  startHour: integer("startHour"),
  startMin: integer("startMin"),
  endHour: integer("endHour"),
  endMin: integer("endMin"),
});

export const todoTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date"),
  title: varchar("title", { length: 255}).notNull().unique() ,
  description: varchar("description", { length: 255}) ,
  finished: boolean("finished").default(false),

});
