//Globals
const button_clear = document.getElementById("clear_table");
const button_place_target = document.getElementById("place_target");
const button_place_flag = document.getElementById("place_flag");
const button_find_path = document.getElementById("find_path");


//----Event Listens-----
button_clear.addEventListener("mouseup", function () { Tables.clearTable() });
button_place_target.addEventListener("mouseup", function () { buttonRouter(1) });
button_place_flag.addEventListener("mouseup", function () { buttonRouter(2) });
button_find_path.addEventListener("mouseup", function () { buttonRouter(3) });


//----Mouse Events and Mouse Functions
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

//----Handle Active Button
let active = "";
function buttonRouter(index) {
        switch (index) {
            case 1: //Enable Target
                reverseButton(button_place_target);
                placeTarget();
                break;
            case 2: //Enable Place Flag
                reverseButton(button_place_flag);
                placeFlag()
                break;
            case 3: //Find Path
                reverseButton(button_find_path);
                Tables.initFinding();
                break;
        }
}
function reverseButton(button) {
    if (button.classList.contains("btn-success")) {
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-secondary");
    }
    else {
        button.classList.remove("btn-outline-secondary");
        button.classList.add("btn-success");
    }
}
function placeTarget() {
    const block = document.getElementById("1_1");
    block.classList.remove("unvisted", "visted");
    block.classList.add("target");
    Tables.grid[1][1] = TARGET;
}
function placeFlag() {
    const block = document.getElementById("23_23");
    block.classList.remove("unvisted", "visted");
    block.classList.add("flag");
    Tables.grid[23][23] = FLAG;
}