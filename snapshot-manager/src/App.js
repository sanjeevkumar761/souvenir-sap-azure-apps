/*import React from 'react';
import ReactDOM from "react-dom";
import BasicTable from "./BasicTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";*/

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import BasicTable from "./BasicTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

class App extends Component {
  state = {
    products: [],
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    },
    {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true
    }]
  }

  componentDidMount() {
    axios.get('http://localhost:4000/results')
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  
  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ this.state.products } 
        columns={ this.state.columns } />
      </div>
    );
  }
}

export default App;

/*const App = () => {
  return (
    <div className="App">
      <h2>Snapshot Manager</h2>
      <BasicTable />
    </div>
  );
  
}; 

export default App;*/
