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
      imageUrl:
        "https://images.pexels.com/photos/15254640/pexels-photo-15254640.jpeg___https://images.pexels.com/photos/30311345/pexels-photo-30311345.jpeg___https://images.pexels.com/photos/8112333/pexels-photo-8112333.jpeg___https://images.pexels.com/photos/31057554/pexels-photo-31057554.jpeg___https://images.pexels.com/photos/6238679/pexels-photo-6238679.jpeg",
    },
    {
      name: "King Size Bed Frame",
      categoryId: 11,
      price: 699.5,
      imageUrl:
        "https://images.pexels.com/photos/4906249/pexels-photo-4906249.jpeg___https://images.pexels.com/photos/6436768/pexels-photo-6436768.jpeg___https://images.pexels.com/photos/15254640/king-size-bed.jpeg___https://images.pexels.com/photos/6217680/king-bed.jpeg___https://images.pexels.com/photos/31057554/king-bedroom.jpeg",
    },
    {
      name: "Oak Dining Table Set",
      categoryId: 12,
      price: 499.0,
      imageUrl:
        "https://images.pexels.com/photos/6436768/dining-room.jpeg___https://images.pexels.com/photos/4906249/dining-table.jpeg___https://images.pexels.com/photos/15254640/wooden-dining.jpeg___https://images.pexels.com/photos/6217680/kitchen-dining.jpeg___https://images.pexels.com/photos/31057554/modern-dining.jpeg",
    },
    {
      name: "Ergonomic Office Chair",
      categoryId: 13,
      price: 199.99,
      imageUrl:
        "https://pixabay.com/photos/best-ergonomic-office-chair-7802060.jpeg___https://images.pexels.com/photos/31236089/pexels-photo-31236089.jpeg___https://images.pexels.com/photos/30311345/office-chair-30311345.jpeg___https://images.pexels.com/photos/4906249/office-chair-4906249.jpeg___https://images.pexels.com/photos/6238679/modern-office-6238679.jpeg",
    },
    {
      name: "Standing Desk",
      categoryId: 14,
      price: 349.0,
      imageUrl:
        "https://images.pexels.com/photos/6217680/standing-desk.jpeg___https://images.pexels.com/photos/30311345/standing-workstation.jpeg___https://images.pexels.com/photos/31057554/height-adjustable-desk.jpeg___https://images.pexels.com/photos/4906249/standing-office.jpeg___https://images.pexels.com/photos/6238679/desk-standing.jpeg",
    },
    {
      name: "Round Coffee Table",
      categoryId: 15,
      price: 149.99,
      imageUrl:
        "https://images.pexels.com/photos/776663/pexels-photo-776663.jpeg___https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg___https://images.unsplash.com/photos/BJXAxQpH6GA.jpeg___https://images.unsplash.com/photos/1K9T5YiZ2WU.jpeg___https://images.unsplash.com/photos/6-jTZysYY_U.jpeg",
    },
    {
      name: "TV Stand with Storage",
      categoryId: 16,
      price: 279.99,
      imageUrl:
        "https://images.pexels.com/photos/7173931/pexels-photo-7173931.jpeg___https://images.pexels.com/photos/597219/pexels-photo-597219.jpeg___https://images.unsplash.com/photos/vLF1I1UI4J4.jpeg___https://images.unsplash.com/photos/33MhE3xF1-4.jpeg___https://images.unsplash.com/photos/g4i2TAkAOOQ.jpeg",
    },
    {
      name: "Wooden Bookshelf",
      categoryId: 17,
      price: 159.99,
      imageUrl:
        "https://images.pexels.com/photos/13121647/pexels-photo-13121647.jpeg___https://images.pexels.com/photos/7607866/pexels-photo-7607866.jpeg___https://images.unsplash.com/photos/QTqulWu6Sok.jpeg___https://images.unsplash.com/photos/3TxP1j_OpGo.jpeg___https://images.unsplash.com/photos/PJaz7e-dacM.jpeg",
    },
    {
      name: "Sliding Door Wardrobe",
      categoryId: 18,
      price: 499.5,
      imageUrl:
        "https://images.pexels.com/photos/53155/wardrobe-doors.jpg___https://images.pexels.com/photos/1454805/pexels-photo-1454805.jpeg___https://images.unsplash.com/photos/jothztchhZY.jpeg___https://images.unsplash.com/photos/RN6ts8IZ4_0.jpeg___https://images.unsplash.com/photos/4_jhDO54BYg.jpeg",
    },
    {
      name: "Outdoor Patio Set",
      categoryId: 19,
      price: 799.99,
      imageUrl:
        "https://images.pexels.com/photos/10510737/pexels-photo-10510737.jpeg___https://images.pexels.com/photos/3985239/pexels-photo-3985239.jpeg___https://images.unsplash.com/photos/3ymH8V3n9Cg.jpeg___https://images.unsplash.com/photos/qTgScaIxGoU.jpeg___https://images.unsplash.com/photos/2zZLkw0n5r8.jpeg",
    },
    {
      name: "White Dresser Cabinet",
      categoryId: 20,
      price: 259.0,
      imageUrl:
        "https://images.pexels.com/photos/1866149/white-dresser.jpg___https://images.pexels.com/photos/2882434/pexels-photo-2882434.jpeg___https://images.unsplash.com/photos/pKeF6Tt3c08.jpeg___https://images.unsplash.com/photos/ZtC4_rPCRXA.jpeg___https://images.unsplash.com/photos/FqdfQ8hgABY.jpeg",
    },
    {
      name: "Modern Nightstand",
      categoryId: 21,
      price: 79.99,
      imageUrl:
        "https://images.pexels.com/photos/7142583/nightstand.jpg___https://images.pexels.com/photos/5632505/modern-bedroom.jpg___https://images.unsplash.com/photos/_-JR5TxKNSo.jpeg___https://images.unsplash.com/photos/5E5N49RWtbA.jpeg___https://images.unsplash.com/photos/6MBqJaflElg.jpeg",
    },
    {
      name: "Tall Storage Cabinet",
      categoryId: 22,
      price: 199.99,
      imageUrl:
        "https://images.pexels.com/photos/5648287/storage-cabinet.jpg___https://images.pexels.com/photos/5793655/shelf-cabinet.jpg___https://images.unsplash.com/photos/Bkci_8qcdvQ.jpeg___https://images.unsplash.com/photos/kF5tULu5S2s.jpeg___https://images.unsplash.com/photos/3-iFIe9ey2I.jpeg",
    },
    {
      name: "Executive Office Desk",
      categoryId: 23,
      price: 399.99,
      imageUrl:
        "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg___https://images.pexels.com/photos/6011/desk-office-business-computer.jpg___https://images.unsplash.com/photos/FMSo3Q6E3y4.jpeg___https://images.unsplash.com/photos/rFUFqjEKzfY.jpeg___https://images.unsplash.com/photos/j2IUgRVo8AQ.jpeg",
    },
    {
      name: "Kids Bunk Bed",
      categoryId: 24,
      price: 449.99,
      imageUrl:
        "https://images.unsplash.com/photos/N1GtLcYaZ8Q.jpeg___https://images.unsplash.com/photos/MIdNUvtM0Is.jpeg___https://images.unsplash.com/photos/KU5NrCY1cCc.jpeg___https://images.unsplash.com/photos/AXrHP0zjcBw.jpeg___https://images.unsplash.com/photos/WcTRRzemPNc.jpeg",
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
