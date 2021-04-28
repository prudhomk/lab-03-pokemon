import { Component } from 'react';
import './PokemonItem.css';
import React from 'react';

class PokemonItem extends Component {

  render() {
    const poke = this.props.poke;

    return (
      <li className='PokemonItem'>
        <h2>{poke.pokemon}</h2>
        <img src={poke.url_image} alt={poke.pokemon}/>
        <p>Type: {poke.type_1}/{poke.type_2}</p>
        <p>Dex #: {poke.species_id}</p>

      </li>
     
    );
  }

}

export default PokemonItem;
