import { Component } from 'react';
import './PokemonList.css';
import React from 'react';
import PokemonItem from './PokemonItem';
class PokemonList extends Component {

  render() {
    const pokemon = this.props.pokemon;
    console.log(pokemon);
    return (
      
      <ul className="PokemonList">
        {pokemon.map(poke => (
          <PokemonItem key={poke._id} poke={poke}/>
        ))}

      </ul>
    );
  }

}
export default PokemonList;
