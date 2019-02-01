import React, { Component } from 'react';


class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        return(
          <span className="breadcrumb">{this.props.categories}</span>
        )

    
    
    }
}





export default Breadcrumb;