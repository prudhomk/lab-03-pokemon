import { Component } from 'react';
import './Search.css';
import React from 'react';
import request from 'superagent';

class Search extends Component {
  state = {
    search: '',
    sortField: '',
    typeFilter: '',
    numberFilter: '',
    weightFilter: '',
    typesArray: []
  }

  async fetchTypes() {
    const response = await request.get('https://pokedex-alchemy.herokuapp.com/api/pokedex/types');

    this.setState({ 
      typesArray: response.body.map(poke => poke.type)
    });
  }

  componentDidMount() {
    this.fetchTypes();  

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

  handleWeightChange = ({ target }) => {
    this.setState({ weightFilter: target.value });
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
    const { search, sortField, typeFilter, numberFilter, weightFilter, typesArray } = this.state;
   
    
 

    return (
      <form className="Search" onSubmit={this.handleSubmit}>

        <input
          name="search"
          placeholder="Search for a Pokemon"
          value={search}
          onChange={this.handleSearchChange}
        />

        <select
          name="sortField"
          value={sortField}
          onChange={this.handleSortChange}
        > 
          <option value="asc">Ascending</option>
          <option value="des">Descending</option>
        </select>

        <select classname="typez"
          name="typeFilter"
          value={typeFilter}
          onChange={this.handleTypeChange}
        >
          <option value="">All</option>
          {typesArray.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input className="gen"
          name="numberFilter"
          placeholder="Gen"
          type="number"
          min="1"
          max="9"
          value={numberFilter}
          onChange={this.handleNumberChange}
        >
  
        </input>

        <input
          name="weightFilter"
          placeholder = "Mass"
          type="number"
          value={weightFilter}
          min = '0'
          max = '9500'
          onChange={this.handleWeightChange}
        >
    
        </input>
        
        <button>Search the Dex!</button>
        
      </form>
    );
  }
}

export default Search;



