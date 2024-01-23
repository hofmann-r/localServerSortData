import * as fs from "fs";
import { findRestaurantCuisine, setRestaurantsData } from "../utils/common.js";

function exportCSV(fileName) {
  // set the folder and file to get the data
  const filePath = `assets/csv/${fileName}.csv`;
  // read the file content
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

function getCuisines() {
  return exportCSV("cuisines");
}

function getRestaurants() {
  return exportCSV("restaurants");
}

export function loadDefaultSearchDataTerminal() {
  const cuisines = getCuisines();
  // update the restaurants to the global variable
  let restaurants = getRestaurants();
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
