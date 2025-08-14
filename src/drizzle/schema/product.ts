import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const productStatuses = ["public", "private"] as const;
export type ProductStatuses = (typeof productStatuses)[number];
export const ProductStatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: ProductStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const productRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
