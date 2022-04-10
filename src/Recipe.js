import React from "react";
import style from "./bio.module.css";

const Recipe = ({ title, calories, image, ingredients, direction }) => {
  return (
    <div className={style.bio}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories - {calories}</p>
      <img className={style.image} src={image} />
    </div>
  );
};

export default Recipe;
