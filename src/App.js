import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const API_ID = "b43f704d";
  const API_KEY = "a3f1fd6ab618c1b575df6feb1c9949ed";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getRecipes();
    // setLoader(false);
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoader(false);
  };

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={formSubmitHandler}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={inputHandler}
        />
        <button
          className={search.length < 1 ? "button-disable" : "search-button"}
          type="submit"
          disabled={!search}
          onClick={() => setLoader(true)}
        >
          Search
        </button>
      </form>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <div className="recipe">
          {recipes &&
            recipes.map((item) => (
              <Recipe
                key={item.recipe.id}
                title={item.recipe.label}
                calories={item.recipe.calories}
                image={item.recipe.image}
                ingredients={item.recipe.ingredients}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
