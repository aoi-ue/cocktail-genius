import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Input } from "antd";
const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <Search
            placeholder="Pick Your Poison!"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}

export default SearchBar;
