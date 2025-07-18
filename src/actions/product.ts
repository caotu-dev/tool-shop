import {
  db,
  Products,
  Categories,
  desc,
  asc,
  eq,
  and,
  isNull,
  like,
  gte,
  lte,
} from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { slugify } from "@/lib/utils";

interface FilterOptions {
  categorySlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

function buildProductFilters(filters: FilterOptions) {
  const conditions = [];

  if (filters?.categorySlug) {
    conditions.push(eq(Categories.slug, filters.categorySlug));
  }

  if (filters?.minPrice && filters?.maxPrice) {
    conditions.push(
      and(
        gte(Products.price, filters?.minPrice),
        lte(Products.price, filters?.maxPrice)
      )
    );
  }

  if (filters?.search) {
    conditions.push(like(Products.name, `%${filters.search}%`));
  }

  // Optional: Exclude deleted
  conditions.push(isNull(Products.deletedAt));

  return conditions.length ? and(...conditions) : undefined;
}

export function getListProducts() {
  return defineAction({
    input: z.object({
      categorySlug: z.string().optional(),
      search: z.string().optional(),
      sortBy: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
      sortField: z.string().optional(),
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }),
    handler: async (input) => {
      // Map string keys to actual column references
      const fieldMap = {
        id: Products.id,
        name: Products.name,
        price: Products.price,
        thumbnail: Products.imageUrl,
      };

      // Ensure safe fallback
      const column =
        fieldMap[input?.sortField as keyof typeof fieldMap] ?? Products.name;
      const ordering = input?.sortBy === "asc" ? asc(column) : desc(column);

      const whereClause = buildProductFilters(input);

      // Paginate
      const page = input.page ?? 1;
      const pageSize = input.pageSize ?? 12;
      const offset = (page - 1) * pageSize;

      const query = db
        .select({
          id: Products.id,
          slug: Products.slug,
          name: Products.name,
          price: Products.price,
          thumbnail: Products.imageUrl,
          categoryName: Categories.name,
          categorySlug: Categories.slug,
        })
        .from(Products)
        .innerJoin(Categories, eq(Products.categoryId, Categories.id))
        .where(whereClause)
        .orderBy(ordering);

      if (input.page && input.pageSize) {
        query.limit(pageSize).offset(offset);
      }

      return await query;
    },
  });
}

export function getNewestProducts() {
  return defineAction({
    handler: async () => {
      return await db
        .select({
          id: Products.id,
          slug: Products.slug,
          name: Products.name,
          price: Products.price,
          thumbnail: Products.imageUrl,
        })
        .from(Products)
        .limit(8)
        .orderBy(desc(Products.createdAt));
    },
  });
}

export function getTopSellingProducts() {
  return defineAction({
    handler: async () => {
      return await db
        .select({
          id: Products.id,
          name: Products.name,
          slug: Products.slug,
          price: Products.price,
          thumbnail: Products.imageUrl,
        })
        .from(Products)
        .limit(8)
        .orderBy(desc(Products.name));
    },
  });
}

export function getProducts() {
  return defineAction({
    handler: async () => {
      const products = await db
        .select()
        .from(Products)
        .innerJoin(Categories, eq(Products.categoryId, Categories.id));
      return products;
    },
  });
}

export function getProductBySlug() {
  return defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async (input) => {
      const slug = input.slug;
      return await db
        .select({
          id: Products.id,
          name: Products.name,
          slug: Products.slug,
          price: Products.price,
          stock: Products.stock,
          imageUrl: Products.imageUrl,
          description: Products.description,
          categorySlug: Categories.slug,
          categoryName: Categories.name,
        })
        .from(Products)
        .innerJoin(Categories, eq(Products.categoryId, Categories.id))
        .where(eq(Products.slug, slug))
        .then((res) => res[0]);
    },
  });
}

export function addProduct() {
  return defineAction({
    input: z.object({
      name: z.string(),
      imageUrl: z.string(),
      price: z.number(),
      description: z.string(),
      categoryId: z.number(),
    }),
    handler: async (input) => {
      const name = input.name;
      const slug = slugify(name);
      const data = { ...input, slug };
      const newProduct = await db.insert(Products).values(data).returning();
      return newProduct;
    },
  });
}

export function updateProduct() {
  return defineAction({
    input: z.object({
      id: z.number(),
      name: z.string(),
      imageUrl: z.string(),
      price: z.number(),
      description: z.string(),
      categoryId: z.number(),
    }),
    handler: async (input) => {
      const id = input.id;
      const name = input.name;
      const slug = slugify(name);
      const data = { ...input, slug };
      const updatedProduct = await db
        .update(Products)
        .set(data)
        .where(eq(Products.id, id))
        .returning();
      return updatedProduct;
    },
  });
}
export function deleteProduct() {
  return defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      const deleteCategories = await db
        .delete(Products)
        .where(eq(Products.id, input.id))
        .returning();
      return deleteCategories;
    },
  });
}
