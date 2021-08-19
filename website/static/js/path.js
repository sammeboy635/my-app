import {PathTable,handleOnClick,handleOnEnter,clearTable} from "./pathtable.js"

const button = document.getElementById("clear_table");
button.addEventListener("mouseup",function(){Tableclear()})
const Tables = new PathTable(25, 25);

window.onload = function() {
    //createTable();
    Tables.createTable();
  };


function Tableclear(){
    Tables.clearTable();
}

