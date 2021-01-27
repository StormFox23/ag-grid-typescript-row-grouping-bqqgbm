/**
1. DONE User Defined Grouping
2. DONE Application Defined Grouping
3. DONE Full Width Group Rows
4. DONE Auto-Group Column
5. DONE Simple Aggregations
6. DONE Group footer
7. Hide Open Parents
8. Define Own Group Columns
 */

// Import stylesheets
import './style.css';

import "ag-grid-enterprise";

import {Grid, GridOptions} from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

// Write TypeScript code!
const gridDiv: HTMLElement = document.getElementById('myGrid');


let gridOptions: GridOptions = {
  columnDefs: [
    {field: 'athlete', enableRowGroup: true},
    {field: 'country', enableRowGroup: true, rowGroupIndex: 0},
    {field: "year", enableRowGroup: true, rowGroupIndex: 1},
    {field: "date"},
    {field: "sport"},
    {field: "gold", aggFunc: 'sum'},
    {field: "silver", aggFunc: 'sum'},
    {field: "bronze", aggFunc: 'sum'}
  ],
  autoGroupColumnDef: {
    headerName: 'bonkers',
    width: 200,
    resizable: true,
    pinned: 'left',
    cellRendererParams: {
      suppressCount: true
    }
  },
  animateRows: true,
  rowGroupPanelShow: 'always',
  groupHideOpenParents: true
};

new Grid(gridDiv, gridOptions);

var httpRequest = new XMLHttpRequest();
httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json');
httpRequest.send();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var httpResult = JSON.parse(httpRequest.responseText);
        gridOptions.api.setRowData(httpResult);
    }
};
