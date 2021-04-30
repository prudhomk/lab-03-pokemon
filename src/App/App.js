import { Component } from 'react';
import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import request from 'superagent';
import PokemonList from '../Pokemon/PokemonList';
import Paging from './Paging';

const POKEMON_API = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';



class App extends Component {
  state = {
    pokemon: [],
    search: '',
    asc: '',
    types: '',
    numbers: '',
    sortField: '',
    page: 1
  }

  async componentDidMount() {
    this.fetchPokemon();
   
  }
  
  async fetchPokemon() {
    const { search, sortField, types, numbers, page } = this.state;
    const response = await request
      .get(POKEMON_API)
      .query({ pokemon: search })
      .query({ sort: 'pokemon' })
      .query({ direction: sortField })
      .query({ types: types })
      .query({ numbers: numbers })
      .query({ page: page });

    this.setState({
      pokemon: response.body.results },
    );
  }

    handleSearch = ({ search, sortField, types, numbers }) => {
 
      this.setState(
        { 
          search: search,
          page: 1, 
          sortField: sortField,
          types: types,
          numbers: numbers
        },
        () => this.fetchPokemon()
      );
    }
    
    handlePrevPage = () => {
      this.setState(
        { page: Math.max(this.state.page - 1, 1) },
        () => this.fetchPokemon()
      );
    }

    handleNextPage = () => {
      this.setState(
        { page: this.state.page + 1 },
        () => this.fetchPokemon()
      );
    }

    render() {
      const { pokemon, numbers, page } = this.state;
      
      return (
        <div className="App">

          <Header/>
          <section className="Options">
            <Search onSearch={this.handleSearch} pokemon={pokemon} numbers={numbers}/>
            <Paging
              page={page}
              onPrev={this.handlePrevPage}
              onNext={this.handleNextPage}
            />
          </section>
       
          <main>
            {pokemon && (pokemon.length
              ? <PokemonList pokemon={pokemon}/>
              : <p>Search for a Pokemon!</p>)
            }
            
          </main>

          <Footer/>

        </div>
      );
    }

}

export default App;
