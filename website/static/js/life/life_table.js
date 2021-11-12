class LifeTable {
    constructor(width, height) {
        //HTML table variable
        this.htmlTable = document.getElementById("life_table");

        //Variables used for Creating Tables
        this.x;
        this.y;

        //Length and Width of Grid
        this.width = width;
        this.height = height;

        //Information on each block within the html table
        this.grid = new Array(width);
        for (let x = 0;x < width;x++) {
            this.grid[x] = new Array(height);
        }

        //Mouse info
        this.mouseDown = false;

        //Tells if the table has been created in html
        this.loadedTable = false;
    }
    //---Draw Functions ---
    drawBlock(x, y, blockId) {
        const block = document.getElementById(String(x + "_" + y));
        switch (blockId) {
            case LIFE:
                block.classList.remove("noLife");
                block.classList.add("life");
                break;
            case NOLIFE:
                block.classList.remove("noLife");
                block.classList.add("Life");
                break;
        }
    }
    changeBlockClass(id) {
        const block = document.getElementById(id);

        //Parsing x and y values from id
        let split = id.split("_");
        let x = parseInt(split[0]);
        let y = parseInt(split[1]);

        if (this.mouseInput == 0) { //Wall
            this.grid[x][y] = WALL;
            block.classList.remove("noWall");
            block.classList.add("wall");
        }
        else if (this.mouseInput == 2) {//No Wall
            this.grid[x][y] = NO_WALL;
            block.classList.remove("wall");
            block.classList.add("noWall");
        }
    }
    //---HTML TABLE HANDLERS ----
    createTable() {
        if (this.loadedTable == false) {
            for (let i = 0;i < this.height;i++) {
                this.y = i;
                this.createRow();
            }
            this.loadedTable = true;
        }
    }
    createRow() {
        const row = document.createElement('tr');
        for (let i = 0;i < this.width;i++) {
            this.x = i;
            row.appendChild(this.createBox());
        }
        this.htmlTable.appendChild(row);
    }

    createBox() {
        const block = document.createElement('td');
        block.classList.add("noWall");
        block.id = String(this.x + "_" + this.y); // ID for html looks like "X_Y"
        block.onmousedown = (function () { handleOnClick(this.id) });
        block.onmouseenter = (function () { handleOnEnter(this.id) });
        return block;
    }
    clearTable() {
        const parentNode = this.htmlTable.parentElement;
        const newTbody = document.createElement("tbody");
        newTbody.id = "path_table"

        this.htmlTable.remove();
        parentNode.appendChild(newTbody);

        //Html Table
        this.htmlTable = newTbody;
        this.loadedTable = false;
        this.createTable();
        //Finding path vars being cleared
        this.stillSearch = false;
        this.openSet = [];
        this.closedSet = [];
        this.path = [];

        this.grid = new Array(this.width);
        for (let x = 0;x < this.width;x++) {
            this.grid[x] = new Array(this.height);
        }

    }
}

function heuristic(a, b) {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
}
function Spot(x, y, g,) {
    return { x: x, y: y, g: g, h: 0, cameForm: undefined };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}