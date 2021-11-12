//Static vars
const Tables = new LifeTable(25, 25);
//Buttons events
const button_clear = document.getElementById("clear_table");
const button_simulation = document.getElementById("simulation");

button_clear.addEventListener("mouseup", function () { Tables.clearTable() });
button_simulation.addEventListener("mouseup", function () { buttonRouter(1) });

//Mouse events
const website = document.getElementById("root");

website.addEventListener("mousedown", function (e) { Tables.mouseDown = true; Tables.mouseInput = e.button });
website.addEventListener("mouseup", function () { Tables.mouseDown = false });

function handleOnClick(id) {
    Tables.changeBlockClass(id);
}

function handleOnEnter(id) {
    if (Tables.mouseDown == true)
        Tables.changeBlockClass(id);
}

//Enums
let NOLIFE = 0;
let LIFE = 1;

//---- On Window Load
window.onload = function () {
    Tables.createTable(25, 25);
};

//Function
