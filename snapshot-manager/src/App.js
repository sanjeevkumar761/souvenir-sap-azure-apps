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
import Button from 'react-bootstrap/Button'
import * as env from './env.json';

console.log(env.API_HOST); // output 'testing'

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};


class App extends Component {
  handleGetSelectedDataForCreate = () => {
    console.log("In create mode: " + this.node.selectionContext.selected);
    var selectedVMs = {
      "vms": this.node.selectionContext.selected
    }
    axios.post('http://' + env.API_HOST + ":" + env.API_PORT + "/snapshots", { selectedVMs })
    .then(response => {
        console.log(response.data);
    });
  }

  state = {
    vms: [],
    columns: [
       {
        dataField: "vmid",
        text: "VM Id",
        hidden: true
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
    console.log(env.API_HOST);
    console.log(env.API_PORT);
    axios.get('http://' + env.API_HOST + ":" + env.API_PORT + "/vms")
      .then(response => {
        var vmsData = [];
        for(var i=0; i < response.data[0].length; i++){
          vmsData.push({
            "vmid": response.data[0][i].id,
            "vmname": response.data[0][i].name,
            "osdisk": response.data[0][i].storageProfile.osDisk.name,
            "snapshot": "",
            "snapshotcreatedon": ""
          });
        }
        this.setState({
          vms: vmsData
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
        <h2>&nbsp;</h2>
          <Button onClick={ this.handleGetSelectedDataForCreate } variant="success">Create Snapshot</Button>{' '}
          <Button onClick={() => { alert('something') }} variant="primary">Revert from Snapshot</Button>{' '}
          <Button onClick={() => { alert('something') }} variant="warning">Delete Snapshot</Button>{' '}
          <h2>&nbsp;</h2>
          <BootstrapTable
            ref={ n => this.node = n }
            keyField="vmid"
            data={this.state.vms}
            columns={this.state.columns}
            selectRow={ selectRow }
            striped
            hover
            condensed
            //pagination={paginationFactory({})}
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
