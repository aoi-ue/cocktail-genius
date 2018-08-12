import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Collapse } from "antd";
const Panel = Collapse.Panel;

class Cocktails extends Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  getDrinkById = idDrink => {
    if (idDrink.length === 0) return;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then(response => {
        if (response.ok) {
          const json = response.json();
          return json;
        }
        throw new Error("Request failed!");
      })
      .then(json => {
        console.log(json);
        const drink = json.drinks[0];
        this.setState({
          value: [...this.state.value, drink]
        });
      });
  };

  render() {
    if (this.props.drinks.length > 0) {
      return (
        <div>
          <h1>
            Cocktail List <i class="em em-cocktail" />
          </h1>
          {this.props.drinks.map((drink, i) => {
            const foundDrinks = this.state.value.filter(
              str => drink.idDrink === str.idDrink
            );
            if (foundDrinks.length === 0) {
              return (
                <Collapse onChange={() => this.getDrinkById(drink.idDrink)}>
                  <Panel showArrow={false} header={drink.strDrink} key={i} />
                </Collapse>
              );
            } else {
              return (
                <Collapse onChange={() => this.getDrinkById(drink.idDrink)}>
                  <Panel showArrow={false} header={drink.strDrink} key={i}>
                  <img src = {foundDrinks[0].strDrinkThumb} alt ="" />  
                    <h4>
                      <li>{foundDrinks[0].strIngredient1}</li>
                      <li>{foundDrinks[0].strIngredient2}</li>
                      <li>{foundDrinks[0].strIngredient3}</li>
                      <li>{foundDrinks[0].strIngredient4}</li>
                      <li>{foundDrinks[0].strIngredient5}</li>
                      <li>{foundDrinks[0].strIngredient6}</li>
                      <li>{foundDrinks[0].strIngredient7}</li>
                      <li>{foundDrinks[0].strIngredient8}</li>
                      <li>{foundDrinks[0].strIngredient9}</li>
                      <li>{foundDrinks[0].strIngredient10}</li>
                    </h4>
                    <br />
                    <p> {foundDrinks[0].strInstructions}  </p>
                    
                  </Panel>
                </Collapse>
              );
            }
          })}
        </div>
      );
    }
    return (
      <h1>
        Drinks Unavailable 
        <br />
        <i class="em em-broken_heart" />
      </h1>
    );
  }
}

export default Cocktails;
