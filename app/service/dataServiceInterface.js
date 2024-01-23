import { findRestaurantCuisine, setRestaurantsData } from "../utils/common.js";

export const loadCSV = async (fileName) => {
  const filePath = `assets/csv/${fileName}.csv`;
  const response = await fetch(filePath);
  if (response.ok) {
    // read the file content
    var data = await response.text();
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
};

async function getCuisines() {
  const cuisines = await loadCSV("cuisines");
  return cuisines;
}

async function getRestaurants() {
  const restaurants = await loadCSV("restaurants");
  return restaurants;
}

export async function loadDefaultSearchDataInterface() {
  const cuisines = await getCuisines();
  // update the restaurants to the global variable
  let restaurants = await getRestaurants();
  // map the cuisines into the restaurants
  restaurants = restaurants.map((r) => {
    const cuisine = findRestaurantCuisine(r.cuisine_id, cuisines);
    return {
      name: r.name,
      customerRating: Number(r.customer_rating),
      distance: Number(r.distance),
      price: Number(r.price),
      cuisine: {
        id: Number(cuisine.id),
        name: cuisine.name,
      },
    };
  });
  setRestaurantsData(restaurants);
}
