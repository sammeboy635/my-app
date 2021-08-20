
//Variables
const Tables = new PathTable(25,25);


let noWall = 0;
let wall = 1;

window.onload = function() {
    //createTable();
    Tables.createTable();
  };



const website = document.getElementById("root");

let NO_WALL = 0;
let WALL = 1;
let TARGET = 2;
let FLAG = 3;



function handleOnClick(id){
    changeBlockClass(id);
}
function handleOnEnter(id){
    if(Tables.mouseDown_get() == true){
        changeBlockClass(id);
    }
}
function changeBlockClass(id){
    const block = document.getElementById(id);
    let index = parseInt(id);
    if(Tables.mouseInput_get() == 0){ //Wall
        Tables.tables_set(index,WALL);
        block.classList.remove("unvisited");
        block.classList.add("visited");
    }else if(Tables.mouseInput_get() == 2){//No Wall
      Tables.tables_set(index,NO_WALL);
        block.classList.remove("visited");
        block.classList.add("unvisited");
    }
}





