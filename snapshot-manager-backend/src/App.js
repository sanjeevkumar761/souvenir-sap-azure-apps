/*import React from 'react';
import ReactDOM from "react-dom";
import BasicTable from "./BasicTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";*/

import React, { Component } from 'react';
import ReactDOM from "react-dom";
//import BasicTable from "./BasicTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from 'axios';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};


class App extends Component {
  state = {
    vms: [],
    columns: [
      {
        dataField: "id",
        text: "id",
        hidden: false
      },
      {
        dataField: "vmname",
        text: "VM Name",
        sort: true
      },
      {
        dataField: "osdisk",
        text: "OS Disk",
        sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (order === "asc") {
            return numB - numA;
          }
          return numA - numB; // desc
        }
      },
      {
        dataField: "snapshot",
        text: "Snapshot",
        sort: true
      },
      {
        dataField: "snapshotcreatedon",
        text: "Last snapshot created on",
        sort: true
      }
    ]
  }

  componentDidMount() {
    axios.get('http://94.245.110.170:4000/results')
      .then(response => {
        this.setState({
          vms: response.data
        });
      });
      /*const apiUrl = 'http://94.245.110.170:4000/results';
      fetch(apiUrl)
        .then((response) => response.json
        .then((data) => console.log('This is your data', data));*/
  }


  
  render() {
    /*return (
      <div className="App">
        <h2>Snapshot Manager</h2>
        <BasicTable />
      </div>
    );*/
    return (
      <div className="App">
        <h2>Snapshot Manager</h2>
          <BootstrapTable
            keyField="id"
            data={this.state.vms}
            columns={this.state.columns}
            selectRow={ selectRow }
            striped
            hover
            condensed
            pagination={paginationFactory({})}
          />
      </div>
    );
    /*return (
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ this.state.products } 
        columns={ this.state.columns } />
      </div>
    );*/
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