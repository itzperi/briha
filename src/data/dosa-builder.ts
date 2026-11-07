/**
 * "Build your own dosa", taken from the restaurant's printed menu (7 Nov 2026).
 * Prices in rupees, excluding 5% GST. Update from the printed menu when it changes.
 */
export interface BuilderOption { name: string; note?: string; price: number }
export interface BuilderStep { step: number; title: string; options: BuilderOption[] }
export interface ChefSuggestion { name: string; price: number; build: string }

export const builderSteps: BuilderStep[] = [
  { step: 1, title: 'Batter', options: [
    { name: 'Golden Hour', note: 'Classic rice batter', price: 120 },
    { name: 'Midnight Sky', note: 'Activated charcoal', price: 140 },
    { name: 'Pink Sea', note: 'Beetroot and navadhaniyam', price: 145 },
    { name: 'Monsoon Forest', note: 'Spinach and pesarattu', price: 140 },
    { name: 'Terracotta Canyon', note: 'Ragi', price: 135 },
  ] },
  { step: 2, title: 'Topping', options: [
    { name: 'Garlic podi', price: 25 },
    { name: 'Curry leaves podi', price: 25 },
    { name: 'Peanut podi', price: 25 },
    { name: 'Thenga poondu podi', price: 40 },
    { name: 'Small onion', price: 15 },
    { name: 'Cheese', price: 30 },
  ] },
  { step: 3, title: 'Stuffing', options: [
    { name: 'Potato masala', price: 30 },
    { name: 'Paneer Chettinadu', price: 60 },
    { name: 'Mushroom truffle', price: 65 },
    { name: 'Tomato thokku', price: 35 },
  ] },
  { step: 4, title: 'Garnish', options: [
    { name: 'Gingelly oil', price: 15 },
    { name: 'Butter', price: 25 },
    { name: 'Ghee', price: 30 },
    { name: 'Refined oil', price: 5 },
    { name: 'Chilli oil', price: 20 },
  ] },
];

export const chefSuggestions: ChefSuggestion[] = [
  { name: 'The Godfather', price: 255, build: 'Monsoon Forest, cheese, mushroom truffle and chilli oil' },
  { name: 'Coimbatore Mappillai', price: 215, build: 'Golden Hour, thenga poondu podi, tomato thokku and ghee' },
  { name: 'Mylapore Maama', price: 180, build: 'Golden Hour, potato masala and ghee' },
  { name: 'Gym Bro', price: 230, build: 'Monsoon Forest, peanut podi, paneer Chettinadu and refined oil' },
  { name: 'Poison Ivy', price: 250, build: 'Monsoon Forest, curry leaves podi, mushroom truffle and chilli oil' },
  { name: 'Burma Vyapari', price: 240, build: 'Terracotta Canyon, small onion, paneer Chettinadu and ghee' },
  { name: 'The Dark Knight', price: 230, build: 'Midnight Sky, mushroom truffle and butter' },
  { name: 'Zamindar', price: 260, build: 'Pink Sea, garlic podi, paneer Chettinadu and ghee' },
  { name: 'Sleeper Cell', price: 200, build: 'Golden Hour, garlic podi, tomato thokku and chilli oil' },
  { name: 'Shaolin Monk', price: 215, build: 'Terracotta Canyon, peanut podi, tomato thokku and chilli oil' },
];
