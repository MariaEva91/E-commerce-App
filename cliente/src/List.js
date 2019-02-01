import React, { Component } from 'react';
import Product from './Product';
import { Link } from "react-router-dom";
import Breadcrumb from './Breadcrumb';


class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      category: []
    }
  }

  getProducts() {
    const urlParams = new URLSearchParams(
      window.location.search);
    const s = urlParams.get("search");

    if (this.lastSearch === s) return;
    this.lastSearch = s
    
    fetch('http://localhost:3001/api/items?search=' + s)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          productos: data.items,
          category: data.category
        })
      })
  }

  //hooks
  componentDidUpdate() {
    this.getProducts();
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    let productos = this.state.productos.map((p) => (
      <Link to={'/items/' + p.id} className="link"><Product producto={p}></Product></Link>
    )
    )
    let category = this.state.category.map((c, i) => (
      <span key={i}>{c}{i < this.state.category.length - 1 ? ' > ' : ' '}</span>
    )
    )

    return (
      <div>
        <Breadcrumb categories={category}></Breadcrumb>
        <div className="list-container">
          {productos}
        </div>
      </div>

    );
  }
}


export default List;