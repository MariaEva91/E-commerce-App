import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productDetail: [],
            loading: true
        }
    }

    getProduct() {
        const id = this.props.match.params.id;
       // console.log(id)

        fetch('http://localhost:3001/api/items/' + id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
               // console.log(data)
                this.setState({
                    productDetail: data,
                    loading: false
                })
            })
    }

    componentDidMount() {
        this.getProduct();
    }


    render() {
        if (this.state.loading === true) {
            return <p>Cargando...</p>
        }

        let category = this.state.productDetail.categories.map((c, i) => (
            <span key={i}>{c}{i < this.state.productDetail.categories.length -1 ? ' > ' : ' '} </span>
            ))
      
        

        return (
            <div>
            <Breadcrumb categories={category}></Breadcrumb>
            <div className="detail-container">
                <div className="description">
                    <img className="img-detail" src={this.state.productDetail.item.picture} alt="" />
                    <p className="description-title">Descripción del producto</p>
                    <p className="text-description">{this.state.productDetail.item.description}</p>
                </div>
                <div className="detail-dates">
                    <p>{this.state.productDetail.item.condition}</p> <br />
                    <p className="title">{this.state.productDetail.item.title}</p> <br />
                    <span className="price">${parseInt(this.state.productDetail.item.price.amount).toLocaleString(('es-AR'))}</span>
                    <span className="price decimals">{this.state.productDetail.item.price.decimals.padEnd(2,'0')}</span> <br />
                    <button className="button">Comprar</button>

                </div>

            </div>
            </div>



        )

            ;
    }
}


export default Detail;