

class PathTable {
    constructor(width, height) {
        this.table = document.getElementById("path_table");
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.grid = new Array(width).fill(new Array(height));
        this.loadedTable = false;
    }
    chan
    //---Changing Block
    changeBlockClass(id) {
        const block = document.getElementById(id);

        //Parsing x and y values from id
        let split = id.split("_");
        let x = parseInt(split[0]);
        let y = parseInt(split[1]);

        if (this.mouseInput == 0) { //Wall
            this.grid[x][y] = WALL
            block.classList.remove("noWall");
            block.classList.add("wall");
        } else if (this.mouseInput == 2) {//No Wall
            this.grid[x][y] = NO_WALL
            block.classList.remove("wall");
            block.classList.add("noWall");
        }
    }

    //---GUI TABLE HANDLER
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
        this.table.appendChild(row);
    }

    createBox() {
        const block = document.createElement('td');
        block.classList.add("noWall");
        block.id = String(this.x + "_" + this.y); // ID for html looks like "X_Y"
        //block.onmousedown = (function () { handleOnClick(this.id) });
        block.onmouseenter = (function () { handleOnEnter(this.id) });
        return block;
    }
    clearTable() {
        const parentNode = this.table.parentElement;
        const newTbody = document.createElement("tbody");
        newTbody.id = "path_table"

        this.table.remove();
        parentNode.appendChild(newTbody);

        this.table = newTbody;
        this.loadedTable = false;
        this.createTable();
    }
}
