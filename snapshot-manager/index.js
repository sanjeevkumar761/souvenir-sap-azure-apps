import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const BasicTable = () => {
    return (
         <BootstrapTable
            keyField=""
            data={data}
            columns={columns}
         />   
    );
};

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
      dataField: "name",
      text: "Grocery"
    },
    {
      dataField: "price",
      text: "Price"
    }
   ];
   