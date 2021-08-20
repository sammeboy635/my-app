
//Variables
const Tables = new PathTable(25, 25);

let NO_WALL = 0;
let WALL = 1;
let TARGET = 2;
let FLAG = 3;

//---- On Window Load
window.onload = function () {
    Tables.createTable(25, 25);
};

function changeBlockClass(id) {
    const block = document.getElementById(id);

    //Parsing x and y values from id
    let split = id.split("_");
    let x = parseInt(split[0]);
    let y = parseInt(split[1]);

    if (Tables.mouseInput_get() == 0) { //Wall
        Tables.tables_set(x, y, WALL);
        block.classList.remove("noWall");
        block.classList.add("wall");
    } else if (Tables.mouseInput_get() == 2) {//No Wall
        Tables.tables_set(x, y, NO_WALL);
        block.classList.remove("wall");
        block.classList.add("noWall");
    }
}





