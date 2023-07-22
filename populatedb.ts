import mongoose from "mongoose";

import Item from "./src/models/item";
import { IItem } from "./src/models/item";
import Category from "./src/models/category";
import { ICategory } from "./src/models/category";

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const items: any = [];
const categories: any = [];

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}
main().catch((err) => console.log(err));

async function itemCreate(index: number, itemData: IItem) {
    const item = new Item(itemData);
    await item.save();

    items[index] = item;

    console.log(`Added item: ${itemData.name}`);
}

async function categoryCreate(index, categoryData: ICategory) {
    const category = new Category(categoryData);
    await category.save();

    categories[index] = category;

    console.log(`Added category: ${categoryData.name}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate(0, { name: "Vegetables", description: "Lorem" }),
        categoryCreate(1, { name: "Fruits", description: "Ipsum" }),
        categoryCreate(2, { name: "Clothing", description: "Sir" }),
        categoryCreate(3, { name: "Drinks", description: "Amet" }),
        categoryCreate(4, { name: "Cleaning Supplies", description: "Dolor" }),
        categoryCreate(5, { name: "Stationary", description: "Met" }),
    ]);
}

async function createItems() {
    console.log("Adding items");
    await Promise.all([
        itemCreate(0, { name: "Carrot", description: "Yeah that", price: 1, category: categories[0], inStock: 3 }),
        itemCreate(1, { name: "Tomato", description: "Red", price: 0.5, category: categories[1], inStock: 124 }),
        itemCreate(2, { name: "Apple", description: "Also red, sometimes green", price: 2, category: categories[1], inStock: 25 }),
        itemCreate(3, { name: "Pencil", description: "Writes stuff", price: 3.25, category: categories[5], inStock: 14 }),
        itemCreate(4, { name: "Scarf", description: "Wooly", price: 15, category: categories[2], inStock: 4 }),
        itemCreate(5, { name: "Cool T-Shirt", description: "Pretty rad", price: 25, category: categories[2], inStock: 29 }),
    ]);
}
