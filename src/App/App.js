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
    asc: 'asc',
    typeFilter: undefined,
    numberFilter: undefined,
    sortField: undefined,
    page: 1
  }

  async componentDidMount() {
    this.fetchPokemon();
   
  }
  
  async fetchPokemon() {
    const { search, sortField, page, typeFilter, numberFilter } = this.state;
    
   
    const response = await request
      .get(POKEMON_API)
      .query({ pokemon: search })
      .query({ sort: 'pokemon' })
      .query({ direction: sortField })
      .query({ type: typeFilter })
      .query({ generation_id: numberFilter })
      .query({ page: page });

    this.setState({
      pokemon: response.body.results },
    );
  }

    handleSearch = ({ search, sortField, typeFilter, numberFilter }) => {
      
      this.setState(
        { 
          search: search,
          page: 1, 
          sortField: sortField || undefined,
          typeFilter: typeFilter || undefined,
          numberFilter: numberFilter || undefined
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
      const { pokemon, numberFilter, page, typeFilter } = this.state;
     
      return (
        <div className="App">

          <Header/>
          <section className="Options">
            <Search onSearch={this.handleSearch} pokemon={pokemon} numberFilter={numberFilter} typeFilter={typeFilter}/>
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
