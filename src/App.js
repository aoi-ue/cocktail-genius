import React, { Component } from "react";
import Cocktails from "./Cocktails";
import SearchBar from "./SearchBar";

import { Layout } from "antd";
import { Icon } from "antd";

const { Content } = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getData("");
  }

  getData = async search => {
    const ingredientResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`
    );
    const cocktailResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    );
    try {
      const ingredientData = await ingredientResponse.json();
      const cocktailData = await cocktailResponse.json();
      this.setState({
        drinks: ingredientData.drinks
          .concat(cocktailData.drinks)
          .filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          }),
        loading: false
      });
    } catch (error) {
      this.setState({
        drinks: [],
        loading: false
      });
    }
   };

  render() {
    if (this.state.loading) {
      return (
        <div id="loading">
          <h1><Icon type="loading" style={{ fontSize: 50 }} spin /> </h1>
        </div>
      );
    }
    return (
      <div>
        <Layout>
          <br />
          <SearchBar handleSubmit={this.getData} />
          <br />
          <Content>
            <Cocktails drinks={this.state.drinks} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
