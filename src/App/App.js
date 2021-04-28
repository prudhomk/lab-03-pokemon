import { Component } from 'react';
import 'App.css';
import React from 'react';
import Header from 'Header';
import Footer from 'Footer';
import Search from 'Search';
import PokemonList from '../Pokemon/PokemonList';
class App extends Component {

  render() {
    return (
      <div className="App">

        <Header/>
        <Search/>
        <main>
          <PokemonList/>
        </main>

        <Footer/>

      </div>
    );
  }

}

export default App;
