import { Component } from 'react';
import './Search.css';
import React from 'react';

class Search extends Component {
  state = {
    search: '',
  }

  handleSearchChange = ({ target }) => {
    this.setState({ search: target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state);
  }

  render() {
    const { search } = this.state;
    return (
      <form className="Search" onSubmit={this.handleSubmit}>

        <input
          name="search"
          value={search}
          onChange={this.handleSearchChange}
        />

        <button>Search the Dex!</button>

      </form>
    );
  }
}
export default Search;