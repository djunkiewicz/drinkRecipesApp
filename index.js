import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const drinksDbBaseURL = "www.thecocktaildb.com/api/json/v1/1";
const ingredientsPicturesBaseURL = "www.thecocktaildb.com/images/ingredients";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("content.ejs");
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});
