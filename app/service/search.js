import { restaurantsData } from "../utils/common.js";

/*
How the search works:
- A Restaurant Name match is defined as an exact or partial String match with what users provided. For example, “lici” would match “Marta Delicious Cupcakes”.
- A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
- A Distance match is defined as a Distance equal to or less than what users have asked for. For example, “2” would match any distance that is equal to or less than 2 miles from your company.
- A Price match is defined as a Price equal to or less than what users have asked for. For example, “15” would match any price that is equal to or less than $15 per person.
- A Cuisine match is defined as an exact or partial String match with what users provided. For example, “Chi” would match “Chinese”. 
- The five parameters are holding an “AND” relationship. For example, if users provide Name = “Mcdonald’s” and Distance = 2, it will find all “Mcdonald’s” within 2 miles.
- When multiple matches are found, they are sorted following these rules:
  - Sort the restaurants by Distance first;
  - If two matches are still equal with the process above, then the restaurant with a higher customer rating wins.
  - If two matches are still equal, then the restaurant with a lower price wins.
  - If two matches are still equal after the process above, then the restaurant is ordered by the cousine type.
*/

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
