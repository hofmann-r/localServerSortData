import express from "express";
import { getRestaurants, getCuisines } from "./restaurantService.js";

const app = express();
app.use(express.json());
const port = 4001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/restaurants", (req, res) => {
  try {
    // params
    const name = req.query.name;
    const distance = req.query.distance;
    const rating = req.query.rating;
    const price = req.query.price;
    const cuisine = req.query.cuisine;
    // get restaurants
    const r = getRestaurants(name, distance, rating, price, cuisine);
    res.status(200);
    res.send(r);
  } catch (error) {
    res.status(400);
    res.send({ error: "error_code", message: "An error has ocurred while getting the data", stack_trace: String(error) });
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
    res.send({ error: "error_code", message: "An error has ocurred while getting the data", stack_trace: String(error) });
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
