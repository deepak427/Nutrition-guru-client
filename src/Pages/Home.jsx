import React from "react";
import { useState } from "react";
import Field from "../components/SingleField/Field";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const servingOptions = ["100ml", "100g", "200ml", "200g", "300ml", "300g"];
  const nutritionOptions = [
    "Energy",
    "Protien",
    "Total Fat",
    "Carbohydrate",
    "Total Sugar",
    "Sodium",
  ];
  const nutritionValueOptions = ["50kcal", "12.5g", "22mg", "10.8g"];
  const typeOptions = ["Food", "Beverage"];
  const [result, setResult] = useState("");

  const apiUrl = "https://nutrition-guru.onrender.com/llama/nutritionist";

  var commanIngredients = [
    "Water",
    "Sugar",
    "Concentrated mango pulp",
    "Carbonated water",
    "Synthetic Food Color (110 - Sunset Yellow FCF)",
    "Preservative (211)",
    "Stabilizers (414, 445)",
  ];

  const [loading, setLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [nutritionFields, setNutritionFields] = useState([1]);

  const handleSubmit = () => {
    const nutritionalInformation = {};

    const servingDiv = document
      .querySelector(".nutrition-info")
      .querySelector(".header")
      .querySelector(".dropdown-input-container")
      .querySelector("input[type='text']");
    const servingSize = servingDiv.value;
    nutritionalInformation["Serving size"] = servingSize;

    const quantityDiv = document
      .querySelector(".nutrition-info")
      .querySelector(".header:nth-child(2)")
      .querySelector(".dropdown-input-container")
      .querySelector("input[type='text']");
    const quantitySize = quantityDiv.value;
    nutritionalInformation["Total quantity"] = quantitySize;

    const typeDiv = document
      .querySelector(".nutrition-info")
      .querySelector(".header:nth-child(3)")
      .querySelector(".dropdown-input-container")
      .querySelector("input[type='text']");
    const type = typeDiv.value;
    nutritionalInformation["Type"] = type;

    var i = 1;

    while (true) {
      const nutritionField = document.querySelector(`.nutrition-field-${i}`);
      if (!nutritionField) {
        break;
      }
      const nutritionName = nutritionField
        .querySelector(".dropdown-input-container")
        .querySelector("input[type='text']").value;

      const nutritionValue = nutritionField
        .querySelector(".dropdown-input-container:nth-child(2)")
        .querySelector("input[type='text']").value;

      nutritionalInformation[nutritionName] = nutritionValue;
      i++;
    }

    nutritionalInformation["Ingredients"] = [...selectedIngredients];

    setLoading(true);

    axios
      .post(apiUrl, {
        nutritionInformation: JSON.stringify(nutritionalInformation),
      })
      .then((response) => {
        setResult(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (value) => {
    const divToDelete = document.querySelector(`.nutrition-field-${value}`);

    if (divToDelete) {
      divToDelete.parentNode.removeChild(divToDelete);
    }
  };

  const handleClick = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      const newArray = selectedIngredients.filter(
        (ingre) => ingre !== ingredient
      );
      setSelectedIngredients([...newArray]);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleImageChange = (event) => {
    alert("So sorry this feature is not working, but our team is working hard.")
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="header-content">
          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold" }}>
            Welcome to Nutrition Guru
          </h1>
          <h2 style={{ marginBottom: "0.7rem", fontSize: "1.8rem" }}>
            Our goal is to provide insights to consumers about canned food
            consumption
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            According to labels, we help you understand how much you can eat or
            drink per day or week.
          </p>
          <h4 style={{ fontSize: "1rem" }}>
            That way, you can make better judgments about the product.
          </h4>
        </div>
        <div className="nutrition-info">
          <div className="header">
            <h2>Nutrition Information per</h2>
            <Field dropdownOptions={servingOptions} />
          </div>
          <div className="header">
            <h2>Quantity</h2>
            <Field dropdownOptions={servingOptions} />
          </div>
          <div className="header">
            <h2>Type</h2>
            <Field dropdownOptions={typeOptions} />
          </div>
          <div className="image-uploader">
            <p>Choose Image to auto fill</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          <div className="header-2">
            <h3>Nutrition</h3>
            <h3>Vaule</h3>
          </div>
          <div className="total-info">
            {nutritionFields.map((value, index) => (
              <div key={index} className={`nutrition-field-${value}`}>
                <Field dropdownOptions={nutritionOptions} />
                <Field dropdownOptions={nutritionValueOptions} />
                <button className="button" onClick={() => handleDelete(value)}>
                  delete
                </button>
              </div>
            ))}
            <div className="ingredients-info">
              {commanIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(ingredient)}
                  className={`ingredient-box ${
                    selectedIngredients.includes(ingredient)
                      ? "selected-ingredient"
                      : ""
                  }`}
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="nutrition-bottom">
          <button className="button" onClick={handleSubmit}>
            {loading ? "Nutritionist is analyzing..." : "Analyze"}
          </button>
          <button
            className="button"
            onClick={() => {
              setNutritionFields([
                ...nutritionFields,
                nutritionFields.length + 1,
              ]);
            }}
          >
            Add new nutrition
          </button>
        </div>
        <div className="result">
          <h1>Nutritionist AI:</h1>
          <h3>{result.output}</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
