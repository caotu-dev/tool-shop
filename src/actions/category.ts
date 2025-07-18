import { db, Products, Categories, count, eq, desc } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { slugify } from "@/lib/utils";

export function getCategoryWithProductCount() {
  return defineAction({
    handler: async () => {
      const categories = await db
        .select({
          categoryId: Categories.id,
          categoryName: Categories.name,
          slug: Categories.slug,
          productCount: count(Products.id).as("productCount"),
        })
        .from(Categories)
        .innerJoin(Products, eq(Categories.id, Products.categoryId))
        .groupBy(Categories.id)
        .orderBy(desc(count(Products.id)));
      return categories;
    },
  });
}

export function getCategories() {
  return defineAction({
    handler: async () => {
      const allCategories = await db.select().from(Categories).all();
      return allCategories;
    },
  });
}

export function getCategoryBySlug() {
  return defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async (input) => {
      const slug = input.slug;
      return await db
        .select()
        .from(Categories)
        .where(eq(Categories.slug, slug))
        .then((res) => res[0]);
    },
  });
}

export function addCategory() {
  return defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      const name = input.name;
      const slug = slugify(name);
      const newCategory = await db
        .insert(Categories)
        .values({ name, slug })
        .returning();
      return newCategory;
    },
  });
}

export function updateCategory() {
  return defineAction({
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    handler: async (input) => {
      const id = input.id;
      const name = input.name;
      const slug = slugify(name);
      const updatedCategory = await db
        .update(Categories)
        .set({ name, slug })
        .where(eq(Categories.id, id))
        .returning();
      return updatedCategory;
    },
  });
}

export function deleteCategory() {
  return defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      const deleteCategories = await db
        .delete(Categories)
        .where(eq(Categories.id, input.id))
        .returning();
      return deleteCategories;
    },
  });
}
