import React, { Component } from 'react';
import iconoEnvio from './Icono_Envio.png'

class Product extends Component {

    render() {

        return (
            <div>
                <div className="product">
                    <div className="dates-product">
                        <div className="image">
                            <img src={this.props.producto.picture} alt=''></img>
                        </div>
                        <div className="dates">
                            <span className="price-product">${parseInt(this.props.producto.price.amount).toLocaleString(('es-AR'))}</span>
                            <span className="price-decimals-product">{this.props.producto.price.decimals.padEnd(2,'0')}</span> 
                            {this.props.producto.free_shipping === true && <img src={iconoEnvio} alt=""></img>}   
                            <p className="title-product">{this.props.producto.title}</p>
                        </div>
                    </div>
                        <div className="location">
                            <p>{this.props.producto.address}</p>
                         </div>
                </div>
            </div>
        );
    }
}


export default Product;