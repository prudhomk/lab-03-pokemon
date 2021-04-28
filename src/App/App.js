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
    search: ''
  }

  async componentDidMount() {
    const response = await request
      .get(POKEMON_API);
    this.setState({ pokemon: response.body });
  }

  async fetchPokemon() {
    const { search } = this.state;

    try {
      const response = await request
        .get(POKEMON_API)
        .query({ name: search });
      
      this.setState({ pokemon: response.body.results });
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = ({ search }) => {
    this.setState(
      { search: search },
      () => this.fetchPokemon()
    );
  }



  render() {
    const { pokemon } = this.state;

    return (
      <div className="App">

        <Header/>
        <section className="Options">
          <Search onSearch={this.handleSearch}/>
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
