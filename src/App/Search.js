import { Component } from 'react';
import './Search.css';
import React from 'react';

class Search extends Component {
  state = {
    search: '',
    nameFilter: '',
    sortField: ''
  }

  handleSearchChange = ({ target }) => {
    this.setState({ search: target.value });
  }

  handleSortChange = ({ target }) => {
    this.setState({ sortField: target.value });
  }

  handleNumberChange = ({ target }) => {
    this.setState({ numberFilter: target.value });
  }

  handleNameChange = ({ target }) => {
    this.setState({ nameFilter: target.value });
  }

  handleTypeChange = ({ target }) => {
    this.setState({ typeFilter: target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) {
      this.props.onSearch(this.state);
    }
  }

  render() {
    const { search, nameFilter, typeFilter, numberFilter } = this.state;
    const { pokemon } = this.props;
    
 

    return (
      <form className="Search" onSubmit={this.handleSubmit}>

        <input
          name="search"
          value={search}
          onChange={this.handleSearchChange}
        />

        <select
          name="nameFilter"
          value={nameFilter}
          onChange={this.handleNameChange}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="number">Dex #</option>
        </select>

        <select
          name="typeFilter"
          value={typeFilter}
          onChange={this.handleTypeChange}
        >
          <option value="">All</option>
          {[...new Set(pokemon.map(poke => poke.type_1))].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          name="numberFilter"
          value={numberFilter}
          onChange={this.handleNumberChange}
        >
          <option value="">All</option>
          {[...new Set(pokemon.map(poke => poke.species_id))].map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        
        <button>Search the Dex!</button>
        
      </form>
    );
  }
}

export default Search;



