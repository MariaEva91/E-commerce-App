import React, { Component } from 'react';
import './App.css';
import './Style.css';
import Nav from './Nav';
import List from './List';
import Detail from './Detail';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Breadcrumb from './Breadcrumb';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',

    }
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
  }

  //function to change the input value

  handleOnChangeInput(event) {
    this.setState({
      word: event.target.value
    })
  }

  render() {
   
    return (
      <div className="body">
        <BrowserRouter>
          <div>
            <Nav
              handleChangeInput={this.handleOnChangeInput}
              search={this.state.word}
            >
            </Nav>
            <div className="main-container">
              <Breadcrumb></Breadcrumb>
              <Route exact path="/items" component={List}></Route>
              <Route path="/items/:id" component={Detail}></Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
