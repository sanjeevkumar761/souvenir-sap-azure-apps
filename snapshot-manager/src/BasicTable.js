import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios';

/*const data = [
  {
    id: 0,
    vmname: "vmname",
    osdisk: "osdisk",
    snapshot: "snapshot",
    snapshotcreatedon: "July 26 2020"
  },
  {
    id: 1,
    name: "spinach",
    price: "4.49"
  },
  {
    id: 2,
    name: "icecream",
    price: "4.99"
  },
  {
    id: 3,
    name: "bagel",
    price: "1.19"
  },
  {
    id: 4,
    name: "fish",
    price: "10.00"
  }
];*/

var state = {
  vms: [],
  componentDidMount() {
    axios.get('http://localhost:4000/results')
      .then(response => {
        console.log("got response");
        this.setState({
          vms: response.data
        });
      });
  }
 
}

const columns = [
  {
    dataField: "id",
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
];

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

const BasicTable = () => {
  return (
    <BootstrapTable
      keyField="id"
      data={state.vms}
      columns={columns}
      selectRow={ selectRow }
      striped
      hover
      condensed
      pagination={paginationFactory({})}
    />
  );
};

export default BasicTable;

