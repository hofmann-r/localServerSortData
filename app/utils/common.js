export var restaurantsData = [];

export function setRestaurantsData(value) {
  restaurantsData = value;
}

export function findRestaurantCuisine(id, cuisines) {
  return cuisines.find((c) => Number(c.id) === Number(id));
}
