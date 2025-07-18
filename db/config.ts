import { defineDb, defineTable, column, NOW } from "astro:db";

export const Categories = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    slug: column.text(),
    createdAt: column.date({ default: NOW }),
    deletedAt: column.date({ default: NOW }),
  },
});

const Products = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    slug: column.text(),
    description: column.text({ optional: true }),
    price: column.number(),
    imageUrl: column.text({ optional: true }),
    stock: column.number({ default: 0 }),
    categoryId: column.number({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Categories, Products },
});
