import { Component } from 'react';
import './Search.css';
import React from 'react';

class Search extends Component {
  state = {
    search: '',
    nameFilter: ''
    
  }

  handleSearchChange = ({ target }) => {
    this.setState({ search: target.value });
  }

  handleNameChange = ({ target }) => {
    this.setState({ nameFilter: target.value });
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
    const { search, nameFilter } = this.state;
  

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
        />

        
        <button>Search the Dex!</button>
        
      </form>
    );
  }
}

export default Search;



