import * as fs from "fs";

function exportCSV(fileName) {
  // set the folder and file to get the data
  const filePath = `assets/csv/${fileName}.csv`;
  var data = fs.readFileSync(filePath, "utf-8");
  // get the file data and transform into an array
  var dataArray = data.replaceAll("\r", "").split("\n");
  /* get the first object in the array to use as headers in the final object 
  and split the values to transform into an array */
  const headers = dataArray[0].split(",");
  // loop the array
  const dataObj = [];
  for (let i = 1; i < dataArray.length; i++) {
    // get the row data (into an array to map with the headers array)
    const dataRow = dataArray[i].split(",");
    /* using the array of headers, as having the same number of values as the actual values of the data,
    it´s possible to map the values using an aux var (empty json) to create the final row with all 
    the 'key: value' in it */
    const rowJson = {};
    headers.forEach((value, index) => {
      rowJson[value] = dataRow[index];
    });
    // push the row with all the 'key: value' mapped into the final array
    dataObj.push(rowJson);
  }
  return dataObj;
}

function loadCuisines() {
  return exportCSV("cuisines");
}

function loadRestaurants() {
  return exportCSV("restaurants");
}

function findRestaurantCuisine(id, cuisines) {
  return cuisines.find((c) => Number(c.id) === Number(id));
}

export function getCuisines() {
  let cuisines = loadCuisines();
  cuisines = cuisines.map((c) => {
    return {
      id: Number(c.id),
      name: c.name,
    };
  });
  return cuisines;
}

export function getRestaurants(name, distance, rating, price, cuisine) {
  if (!name && !rating && !distance && !price && !cuisine) {
    throw new Error("Please provide one or more parameters for the search.");
  }

  const cuisines = loadCuisines();
  let restaurants = loadRestaurants();
  // map the cuisines into the restaurants
  restaurants = restaurants.map((r) => {
    const cuisine = findRestaurantCuisine(r.cuisine_id, cuisines);
    return {
      name: r.name,
      distance: Number(r.distance),
      customerRating: Number(r.customer_rating),
      price: Number(r.price),
      cuisine: {
        id: Number(cuisine.id),
        name: cuisine.name,
      },
    };
  });

  restaurants = restaurants
    .filter(
      (r) =>
        (!name || r.name.toLowerCase().includes(name.toLowerCase())) &&
        (!rating || Number(r.customerRating) >= Number(rating)) &&
        (!distance || r.distance <= Number(distance)) &&
        (!price || r.price <= Number(price)) &&
        (!cuisine || r.cuisine.name.toLowerCase().includes(cuisine.toLowerCase()))
    )
    .sort(
      (a, b) =>
        // sort by distance
        a.distance - b.distance ||
        // sort by customer rating after
        b.customerRating - a.customerRating ||
        // then sort by price
        b.price - a.price ||
        // order by the last criteria with cuisine name ASC
        a.cuisine.name.toLowerCase().localeCompare(b.cuisine.name.toLowerCase())
    );

  // get only the first 5 results
  restaurants = restaurants.slice(0, 5);
  return restaurants;
}

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
