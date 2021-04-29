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
    types: [],
    numbers: []
  }

  async componentDidMount() {
    const response = await request
      .get(POKEMON_API);
    let types = response.body.results.map(poke => poke.type_1);
    types = types.filter((type, i, arr) => arr.indexOf(type) === i).sort();
    let numbers = response.body.results.map(poke => poke.species_id);
    numbers = numbers.filter((num, i, arr) => arr.indexOf(num) === i).sort((a, b) => a - b);
    this.setState({ pokemon: response.body.results, types: types, numbers: numbers });
  }
  
  async fetchPokemon() {
    const { search } = this.state;
    const { asc } = this.state;
    
    try {
      const response = await request
        .get(POKEMON_API)
        .query({ pokemon: search, direction: asc });
        
    
      this.setState({ pokemon: response.body.results });
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = ({ search, nameFilter, typeFilter, numberFilter }) => {
    const nameRegex = new RegExp(nameFilter, 'i');

    const pokemon = this.state.pokemon
      .filter(poke => {
        return !nameFilter || poke.pokemon.match(nameRegex);
      })
      .filter(poke => {
        return !typeFilter || poke.type_1 === typeFilter;
      })
      .filter(poke => {
        return !numberFilter || poke.species_id === numberFilter;
      });
    


    this.setState(
      { search: search, pokemon: pokemon },
      () => this.fetchPokemon()
    );
  }



  render() {
    const { pokemon, numbers, types } = this.state;
    console.log(this.state);
    return (
      <div className="App">

        <Header/>
        <section className="Options">
          <Search onSearch={this.handleSearch} numbers={numbers} types={types}/>
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
