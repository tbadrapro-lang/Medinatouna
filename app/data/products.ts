export type Category =
  | "smash-burgers"
  | "sandwiches"
  | "baguettes"
  | "hotdog"
  | "sides"
  | "drinks"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  menuPrice?: number
  image: string
  category: Category
  isHalal?: boolean
  isBestSeller?: boolean
  supplements?: string[]
}

export const products: Product[] = [
  // SMASH BURGERS
  {
    id: 1,
    name: "Original Smash",
    description: "Steak maison 120g, crudités, pickles, cheddar, sauce maison",
    price: 8.50,
    menuPrice: 10.90,
    image: "/smash/Original_Smash_8.50euro.webp",
    category: "smash-burgers",
    isHalal: true,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Pastrame Smash",
    description: "Steak maison 120g, pastrami de viande, coleslaw, cheddar, sauce maison",
    price: 9.00,
    menuPrice: 10.90,
    image: "/smash/Pastrame_Smash_9.00euro.webp",
    category: "smash-burgers",
    isHalal: true,
  },
  {
    id: 3,
    name: "Bacon Smash",
    description: "Steak maison 120g, bacon, crudités, pickles, oignon caramélisé, cheddar, sauce BBQ creamy",
    price: 9.00,
    menuPrice: 10.90,
    image: "/smash/Bacon_Smash_9.00euro.webp",
    category: "smash-burgers",
  },
  {
    id: 4,
    name: "Goat Smash",
    description: "Steak maison 120g, fromage de chèvre, crudités, pickles, oignon, cheddar, sauce maison",
    price: 9.00,
    menuPrice: 10.90,
    image: "/smash/Goat_Smash_9.00euro.webp",
    category: "smash-burgers",
    isHalal: true,
  },
  {
    id: 5,
    name: "Chic'n Smash",
    description: "Filet de poulet pané, coleslaw, cheddar, sauce maison",
    price: 8.50,
    menuPrice: 9.00,
    image: "/smash/Chicn_Smash_8.50euro.webp",
    category: "smash-burgers",
    isHalal: true,
  },
  // SANDWICHES
  {
    id: 6,
    name: "Chicken Curry",
    description: "Émincé de poulet, sauce curry",
    price: 7.40,
    menuPrice: 8.00,
    image: "/sandwiches/Chicken_Curry_7.40euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  {
    id: 7,
    name: "Chicken Tandoori",
    description: "Émincé de poulet mariné tandoori",
    price: 7.40,
    menuPrice: 8.00,
    image: "/sandwiches/Chicken_Tandoori_7.40euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  {
    id: 8,
    name: "Triple Steak",
    description: "3 steaks de bœuf, sauce, crudités",
    price: 7.00,
    menuPrice: 8.00,
    image: "/sandwiches/Triple_Steak_7.00euro.png",
    category: "sandwiches",
    isHalal: true,
    isBestSeller: true,
  },
  {
    id: 9,
    name: "Savoureux",
    description: "Escalope de poulet, jambon, sauce, fromage",
    price: 7.40,
    menuPrice: 8.00,
    image: "/sandwiches/Savoureux_7.40euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  {
    id: 10,
    name: "Mix De Luxe",
    description: "Steak + escalope de poulet, jambon",
    price: 8.00,
    menuPrice: 8.90,
    image: "/sandwiches/Mix_De_Luxe_8.00euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  {
    id: 11,
    name: "Radical",
    description: "Steak + cordon bleu, sauce maison",
    price: 8.00,
    menuPrice: 8.90,
    image: "/sandwiches/Radical_8.00euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  {
    id: 12,
    name: "Boursin",
    description: "Escalope de poulet, boursin, lardon halal",
    price: 8.00,
    menuPrice: 8.90,
    image: "/sandwiches/Boursin_8.00euro.png",
    category: "sandwiches",
    isHalal: true,
  },
  // HOT DOG
  {
    id: 13,
    name: "Hot Dog",
    description: "Saucisse, ketchup, moutarde américaine",
    price: 4.00,
    image: "/hot-dog/Hot_Dog_4.00euro.webp",
    category: "hotdog",
  },
  // BAGUETTES
  {
    id: 14,
    name: "Merguez Baguette",
    description: "Merguez grillée, frites, sauce maison",
    price: 8.50,
    menuPrice: 9.50,
    image: "/baguettes/Merguez_Baguette_8.50euro.png",
    category: "baguettes",
    isHalal: true,
  },
  {
    id: 15,
    name: "Kefta Baguette",
    description: "Kefta maison, crudités, sauce maison",
    price: 8.50,
    menuPrice: 9.50,
    image: "/baguettes/Kefta_Baguette_8.50euro.png",
    category: "baguettes",
    isHalal: true,
    isBestSeller: true,
  },
  {
    id: 16,
    name: "Brochette Mix",
    description: "Poivron, boursin, raclette",
    price: 9.00,
    menuPrice: 9.50,
    image: "/baguettes/Brochette_Mix_9.00euro.png",
    category: "baguettes",
    supplements: ["Poivron", "Boursin", "Raclette"],
  },
  {
    id: 17,
    name: "Bread Baguette Kiri",
    description: "Viande hachée, oeuf, kiri, frites",
    price: 9.00,
    menuPrice: 9.50,
    image: "/baguettes/Bread_Baguette_Kiri_9.00euro.png",
    category: "baguettes",
    isHalal: true,
  },
  {
    id: 18,
    name: "Noix De Veau",
    description: "Émincé de veau, poivron mariné",
    price: 10.90,
    image: "/baguettes/Noix_De_Veau_10.90euro.png",
    category: "baguettes",
    isHalal: true,
    isBestSeller: true,
  },
  {
    id: 19,
    name: "Bavette",
    description: "Émincé de bœuf, poivron mariné",
    price: 10.90,
    image: "/baguettes/Bavette_10.90euro.png",
    category: "baguettes",
    isHalal: true,
  },
  {
    id: 20,
    name: "Parigo Baguette",
    description: "Steak, jambon, cheddar",
    price: 9.00,
    menuPrice: 9.50,
    image: "/baguettes/Parigo_Baguette_9.00euro.png",
    category: "baguettes",
    isHalal: true,
  },
  {
    id: 21,
    name: "Méditerranéen",
    description: "Omelette, frites, fromage",
    price: 8.50,
    image: "/baguettes/Mediterraneen_8.50euro.png",
    category: "baguettes",
  },
  // SIDES
  {
    id: 22,
    name: "Frites Maison",
    description: "Frites fraîches coupées maison",
    price: 3.00,
    image: "/accompagnements/Frites_Maison_3.5euros.webp",
    category: "sides",
  },
  {
    id: 23,
    name: "Frites Cheddar",
    description: "Frites maison + sauce cheddar",
    price: 4.00,
    image: "/accompagnements/Frites_Cheddar_4.00euro.webp",
    category: "sides",
  },
  {
    id: 24,
    name: "Frites Cheddar Bacon",
    description: "Frites maison + cheddar + bacon",
    price: 4.90,
    image: "/accompagnements/Frites_Cheddar_Bacon_4.90euro.webp",
    category: "sides",
  },
  // DRINKS
  {
    id: 25,
    name: "Coca-Cola / Sprite / Fanta",
    description: "Boisson gazeuse 33cl",
    price: 2.50,
    image: "/boissons/cold_drinks_sprite_cola_fanta.svg",
    category: "drinks",
  },
  {
    id: 26,
    name: "Red Bull",
    description: "Boisson énergisante 25cl",
    price: 2.50,
    image: "/boissons/redbull.svg",
    category: "drinks",
  },
]

export const SUPPLEMENTS = [
  { name: "Poivron", price: 1.00 },
  { name: "Boursin", price: 1.00 },
  { name: "Raclette", price: 1.00 },
  { name: "Olives", price: 1.00 },
  { name: "Sauce Maison", price: 0.50 },
  { name: "Cheddar", price: 1.00 },
  { name: "Chèvre", price: 1.00 },
  { name: "Kiri", price: 1.00 },
  { name: "Œuf", price: 1.00 },
  { name: "Bacon", price: 1.50 },
  { name: "Pastrami", price: 1.50 },
]

export const CATEGORY_LABELS: Record<Category, string> = {
  "smash-burgers": "🔥 Smash Burgers",
  "sandwiches": "🥖 Sandwiches",
  "baguettes": "🥖 Baguettes",
  "hotdog": "🌭 Hot Dog",
  "sides": "🍟 Accompagnements",
  "drinks": "🥤 Boissons",
}
