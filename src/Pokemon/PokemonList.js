import { Component } from 'react';
import 'PokemonList.css';
import React from 'react';
import PokemonItem from 'PokemonItem';
class PokemonList extends Component {

  render() {
    const pokemon = this.props.pokemon;

    return (
      
      <ul className="PokemonList">
        {pokemon.map(poke => (
          <PokemonItem key={poke.name} poke={poke}/>
        ))}

      </ul>
    );
  }

}
export default PokemonList;
