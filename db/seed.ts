import { slugify } from "@/lib/utils";
import { Categories, db, Products } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  const furnitureCategories = [
    "Sofas & Couches",
    "Beds",
    "Dining Tables",
    "Chairs",
    "Desks",
    "Coffee Tables",
    "TV Stands",
    "Bookshelves",
    "Wardrobes",
    "Outdoor Furniture",
    "Dressers",
    "Nightstands",
    "Storage Cabinets",
    "Office Furniture",
    "Kids Furniture",
  ];

  await db.insert(Categories).values(
    furnitureCategories.map(
      (name, i) =>
        ({
          id: i + 10,
          name,
          slug: slugify(name),
          createdAt: new Date(),
        } as any)
    )
  );

  const sampleProducts = [
    {
      name: "Modern Leather Sofa",
      categoryId: 10,
      price: 899.99,
      imageUrl: "/images/products/sofa-leather.jpg",
    },
    {
      name: "King Size Bed Frame",
      categoryId: 11,
      price: 699.5,
      imageUrl: "/images/products/bed-king.jpg",
    },
    {
      name: "Oak Dining Table Set",
      categoryId: 12,
      price: 499.0,
      imageUrl: "/images/products/dining-table.jpg",
    },
    {
      name: "Ergonomic Office Chair",
      categoryId: 13,
      price: 199.99,
      imageUrl: "/images/products/office-chair.jpg",
    },
    {
      name: "Standing Desk",
      categoryId: 14,
      price: 349.0,
      imageUrl: "/images/products/standing-desk.jpg",
    },
    {
      name: "Round Coffee Table",
      categoryId: 15,
      price: 149.99,
      imageUrl: "/images/products/coffee-table.jpg",
    },
    {
      name: "TV Stand with Storage",
      categoryId: 16,
      price: 279.99,
      imageUrl: "/images/products/tv-stand.jpg",
    },
    {
      name: "Wooden Bookshelf",
      categoryId: 17,
      price: 159.99,
      imageUrl: "/images/products/bookshelf.jpg",
    },
    {
      name: "Sliding Door Wardrobe",
      categoryId: 18,
      price: 499.5,
      imageUrl: "/images/products/wardrobe.jpg",
    },
    {
      name: "Outdoor Patio Set",
      categoryId: 19,
      price: 799.99,
      imageUrl: "/images/products/patio.jpg",
    },
    {
      name: "White Dresser Cabinet",
      categoryId: 20,
      price: 259.0,
      imageUrl: "/images/products/dresser.jpg",
    },
    {
      name: "Modern Nightstand",
      categoryId: 21,
      price: 79.99,
      imageUrl: "/images/products/nightstand.jpg",
    },
    {
      name: "Tall Storage Cabinet",
      categoryId: 22,
      price: 199.99,
      imageUrl: "/images/products/storage-cabinet.jpg",
    },
    {
      name: "Executive Office Desk",
      categoryId: 23,
      price: 399.99,
      imageUrl: "/images/products/office-desk.jpg",
    },
    {
      name: "Kids Bunk Bed",
      categoryId: 24,
      price: 449.99,
      imageUrl: "/images/products/bunk-bed.jpg",
    },
  ];

  await db.insert(Products).values(
    sampleProducts.map((p, i) => ({
      id: i + 10,
      name: p.name,
      slug: slugify(p.name),
      description: `Description for ${p.name}`,
      price: p.price,
      imageUrl: p.imageUrl,
      stock: Math.floor(Math.random() * 20) + 1,
      categoryId: p.categoryId,
      createdAt: new Date(),
    }))
  );
}
