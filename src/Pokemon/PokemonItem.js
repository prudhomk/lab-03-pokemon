import { Component } from 'react';
import 'PokemonItem.css';
import React from 'react';

class PokemonItem extends Component {

  render() {
    const poke = this.props.poke;

    return (
      <li className='PokemonItem'>
        <h2>{poke.name}</h2>
        <img src={poke.url} alt={poke.name}/>
        <p>Type: {poke.type}</p>
        
      </li>
     
    );
  }

}

export default PokemonItem;
