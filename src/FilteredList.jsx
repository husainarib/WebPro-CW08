import React, { Component } from "react";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import List from "./List";

class FilteredList extends Component {
  constructor(props) {
    super(props);

    //The state is just a list of key/value pairs (like a hashmap)
    this.state = {
      search: "",
      type: "All",
    };
  }

  //Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  };

  onFilter = (type) => {
    this.setState({ type });
  };
  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType =
      this.state.type === "All" || item.type === this.state.type;

    return matchesSearch && matchesType;
  };

  render() {
    return (
      <div className="filter-list">
        {/* Dropdown menu */}
        <DropdownButton
          id="typeDropdown"
          title={`Filter: ${this.state.type}`}
          onSelect={this.onFilter}
        >
          <DropdownItem eventKey="All">All</DropdownItem>
          <DropdownItem eventKey="Fruit">Fruit</DropdownItem>
          <DropdownItem eventKey="Vegetable">Vegetables</DropdownItem>
        </DropdownButton>

        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
