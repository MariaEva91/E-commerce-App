import React, { Component } from 'react';
import logoBlanco from './Ada_Iso_Blanco.png';
import iconoSearch from './Icono_Search.png';
import { Link } from "react-router-dom";

class Nav extends Component {
 
  render() {
    return (
        <nav className="nav">
        <img
         className="logoAda" src={logoBlanco} alt= ""></img>
          <input type= "text"
           onChange={this.props.handleChangeInput} 
           placeholder="Nunca dejes de buscar"
           ></input>
           <Link to={'/items?search=' + this.props.search} ><button className="boton"><img src={iconoSearch} alt= ""></img></button></Link>
         
      </nav>
    );
  }
}


export default Nav;