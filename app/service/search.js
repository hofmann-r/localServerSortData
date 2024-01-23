import { restaurantsData } from "../utils/common.js";

export function searchRestaurants(nameSearch, distanceSearch, ratingSearch, priceSearch, cuisineSearch) {
  if (!nameSearch && !ratingSearch && !distanceSearch && !priceSearch && !cuisineSearch) {
    throw new Error("Please provide one or more parameters for the search.");
  }

  var restaurants = restaurantsData.filter(
    (r) =>
      (!nameSearch || r.name.toLowerCase().includes(nameSearch.toLowerCase())) &&
      (!ratingSearch || Number(r.customerRating) >= Number(ratingSearch)) &&
      (!distanceSearch || r.distance <= Number(distanceSearch)) &&
      (!priceSearch || r.price <= Number(priceSearch)) &&
      (!cuisineSearch || r.cuisine.name.toLowerCase().includes(cuisineSearch.toLowerCase()))
  );
  return sortSearch(restaurants);
}

function sortSearch(sortValues) {
  let restaurants = sortValues.sort(
    (a, b) =>
      // sort by distance
      a.distance - b.distance ||
      // sort by customer rating after
      b.customerRating - a.customerRating ||
      // the sort by price
      b.price - a.price ||
      // and I choose to order by the last one with cuisine name ASC
      a.cuisine.name.toLowerCase().localeCompare(b.cuisine.name.toLowerCase())
  );

  // get only the first 5 results
  restaurants = restaurants.slice(0, 5);
  return restaurants;
}
