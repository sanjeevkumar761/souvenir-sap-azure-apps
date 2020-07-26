import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const data = [
  {
    id: 0,
    name: "banana",
    price: "0.25"
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
];

const columns = [
  {
    dataField: "id",
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
];

const BasicTable = () => {
  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      striped
      hover
      condensed
      pagination={paginationFactory({})}
    />
  );
};

export default BasicTable;

