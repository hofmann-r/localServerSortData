import { loadDefaultSearchDataTerminal } from "../app/service/dataServiceTerminal.js";
import { searchRestaurants } from "../app/service/search.js";

const nameIndex = process.argv.indexOf("--name");
const distanceIndex = process.argv.indexOf("--distance");
const ratingIndex = process.argv.indexOf("--rating");
const priceIndex = process.argv.indexOf("--price");
const cuisineIndex = process.argv.indexOf("--cuisine");

var name = "";
var distance = "";
var rating = "";
var price = "";
var cuisine = "";

if (nameIndex > 0) {
  name = process.argv[nameIndex + 1];
}
if (distanceIndex > 0) {
  distance = process.argv[distanceIndex + 1];
}
if (ratingIndex > 0) {
  rating = process.argv[ratingIndex + 1];
}
if (priceIndex > 0) {
  price = process.argv[priceIndex + 1];
}
if (cuisineIndex > 0) {
  cuisine = process.argv[cuisineIndex + 1];
}

console.log("------------------------------------------------------");
console.log("Verifying parameters");
console.log("------------------------------------------------------");

if (!name && !distance && !rating && !price && !cuisine) {
  console.log(
    "inform one parameter to start the search. Available Parameters:\n",
    "--name: partial of full name of the restaurant (text)\n",
    "--distance: range distance of the restaurant (number)\n",
    "--rating: minimal rating of the restaurant (number) \n",
    "--price: max average price of the restaurant food (number)\n",
    "--cuisine: partial of full name of the cuisine type (text)\n"
  );
  throw new Error("");
}

loadDefaultSearchDataTerminal();
const result = searchRestaurants(name, distance, rating, price, cuisine);

console.log("\n------ THE 5 BEST RESTAURANTS AROUND YOU:\n");

for (let row of result) {
  const logString = `Restaurant: ${row.name}. Distance: ${row.distance} miles, Rating: ${
    row.customerRating
  }/5, Average price: $${row.price.toFixed(2)}, Cuisine type: ${row.cuisine.name}`;
  console.log(logString);
}
console.log('\n\n------');
