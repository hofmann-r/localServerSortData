import express from "express";
import { getRestaurants, getCuisines } from "./restaurantService.js";

const app = express();
app.use(express.json());
const port = 4001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/restaurants", (req, res) => {
  try {
    console.log(req.query);
    const r = getRestaurants();
    res.status(200);
    res.send(r);
  } catch (error) {
    res.status(400);
    res.send({ error: "generic_error", message: "An error has ocurred while getting the data", stack_trace: String(error) });
  }
});

app.post("/restaurants", (req, res) => {
  try {
    // params
    const name = req.body.name;
    const distance = req.body.distance;
    const rating = req.body.rating;
    const price = req.body.price;
    const cuisine = req.body.cuisine;
    // get restaurants
    const r = getRestaurants(name, distance, rating, price, cuisine);
    // filter
    res.status(200);
    res.send(r);
  } catch (error) {
    res.status(400);
    res.send({ error: "generic_error", message: "An error has ocurred while getting the data", stack_trace: String(error) });
  }
});

app.get("/cuisines", (req, res) => {
  try {
    const r = getCuisines();
    res.status(200);
    res.send(r);
  } catch (error) {
    res.status(400);
    res.send({ error: "generic_error", message: "An error has ocurred while getting the data", stack_trace: String(error) });
  }
});
