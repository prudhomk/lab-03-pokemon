import { Component } from 'react';
import './App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import request from 'superagent';
import PokemonList from '../Pokemon/PokemonList';

const POKEMON_API = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';



class App extends Component {
  state = {
    pokemon: [],
    search: '',
    asc: '',
    types: '',
    numbers: '',
    sortField: ''
  }

  async componentDidMount() {
    await this.fetchPokemon();
    console.log(this.state.pokemon);
  }
  
  async fetchPokemon() {
    const { search, sortField, types, numbers } = this.state;
    const response = await request
      .get(POKEMON_API)
      .query({ pokemon: search })
      .query({ sort: 'pokemon' })
      .query({ direction: sortField })
      .query({ types: types })
      .query({ numbers: numbers });

    this.setState({
      pokemon: response.body.results },
    );
  }

    handleSearch = ({ search, sortField, types, numbers }) => {
 
      this.setState(
        { 
          search: search, 
          sortField: sortField,
          types: types,
          numbers: numbers
        },
        () => this.fetchPokemon()
      );
    }
  


    render() {
      const { pokemon, numbers } = this.state;
      
      return (
        <div className="App">

          <Header/>
          <section className="Options">
            <Search onSearch={this.handleSearch} pokemon={pokemon} numbers={numbers}/>
          </section>
       
          <main>
            <PokemonList pokemon={pokemon}/>
          </main>

          <Footer/>

        </div>
      );
    }

}

export default App;
