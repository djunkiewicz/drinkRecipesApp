import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import session from "express-session";

const port = 3000;
const app = express();
const nameRegex = new RegExp(".*\\S.*");
let drinkList = [];
const drinksDbBaseURL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "UkBW8mHvqqdzsndF9u",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 5, //5 minutes session time
    },
  })
);

app.get("/", (req, res) => {
  if (!req.session.drinkList) {
    req.session.drinkList = [];
  }
  if (req.query.keep !== "true") {
    req.session.drinkList = [];
  }
  res.render("content.ejs", { data: req.session.drinkList });
});

app.get("/find", async (req, res) => {
  try {
    if (nameRegex.test(req.query.name) === true) {
      req.session.drinkList = await prepareDrinkList(req.query);
      res.render("content.ejs", { data: req.session.drinkList });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/drink/:id", async (req, res) => {
  try {
    let drink = await findDrinkById(req.params.id);
    res.render("drink_details.ejs", { drink: drink });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Your app is running on port: ${port}`);
});

/////////////////// application logic

async function prepareDrinkList(reqQuery) {
  let response = await axios(
    `${drinksDbBaseURL}/search.php?s=${reqQuery.name}`
  );
  if (response.data.drinks !== null) {
    return mapToDrinkList(response.data.drinks);
  } else return [];
}

async function findDrinkById(id) {
  let response = await axios(`${drinksDbBaseURL}/lookup.php?i=${id}`);
  if (response.data.drinks !== null) {
    return mapToDrinkList(response.data.drinks)[0];
  } else return null;
}

function mapToDrinkList(elements) {
  return elements.map((element) => ({
    id: element.idDrink,
    name: element.strDrink,
    category: element.strCategory,
    instruction: element.strInstructions,
    imageURL: element.strDrinkThumb,
    ingredients: [
      {
        name: element.strIngredient1,
        measure: element.strMeasure1,
      },
      {
        name: element.strIngredient2,
        measure: element.strMeasure2,
      },
      {
        name: element.strIngredient3,
        measure: element.strMeasure3,
      },
      {
        name: element.strIngredient4,
        measure: element.strMeasure4,
      },
      {
        name: element.strIngredient5,
        measure: element.strMeasure5,
      },
      {
        name: element.strIngredient6,
        measure: element.strMeasure6,
      },
      {
        name: element.strIngredient7,
        measure: element.strMeasure7,
      },
      {
        name: element.strIngredient8,
        measure: element.strMeasure8,
      },
      {
        name: element.strIngredient9,
        measure: element.strMeasure9,
      },
      {
        name: element.strIngredient10,
        measure: element.strMeasure10,
      },
      {
        name: element.strIngredient11,
        measure: element.strMeasure11,
      },
      {
        name: element.strIngredient12,
        measure: element.strMeasure12,
      },
      {
        name: element.strIngredient13,
        measure: element.strMeasure13,
      },
      {
        name: element.strIngredient14,
        measure: element.strMeasure14,
      },
      {
        name: element.strIngredient15,
        measure: element.strMeasure15,
      },
    ].filter((ingredient) => ingredient.name != null && ingredient.name != ""),
  }));
}
