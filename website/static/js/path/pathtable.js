class PathTable {
    constructor(width, height) {
        //HTML table variable
        this.htmlTable = document.getElementById("path_table");

        //Variables used for Creating Tables
        this.x;
        this.y;
        
        //Length and Width of Grid
        this.width = width;
        this.height = height;

        //Information on each block within the html table
        this.grid = new Array(width);
        for (let x = 0; x < width; x++) {
            this.grid[x] = new Array(height);
        }
        //PathFinding Variables
        this.start = Spot(width-2,height-2,0);
        this.end = Spot(1,1,0);
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.stillSearch = false;

        //PathFinding Drawing Vars


        //Tells if the table has been created in html
        this.loadedTable = false;
    }
    //---PathFinding Functions ---
    async initFinding(sx,sy){
        this.openSet.push(this.start);
        let i = 0;
        this.stillSearch = true;
        while(this.stillSearch == true){
            this.findBestPath();
            await sleep(10);
            if(i > 10000){
                break;
            }
            i++;
        }

    }
    findBestPath(){
        if(this.openSet.length > 0){

        let current = this.findBestOpenSetIndex();
        if(current.x == this.end.x & current.y == this.end.y){ //Found the end
            let temp = current;
            this.path.push(temp);
            while(temp.cameForm){
                this.path.push(temp.cameForm);
                temp = temp.cameForm;
            }
            this.stillSearch = false;
            this.drawBlockPath();;
        }

        //Removes from openSet
        this.removeOpenSet(current);
        //Adds to closed set
        this.grid[current.x][current.y] = -1
        //this.closedSet.push(current); debuging!
        //Add to draw for ClosedSet
        this.drawBlock(current.x,current.y,CLOSED);

        let neighbors = this.findCurrentNeighbors(current);

        neighbors.forEach(neighbor => {
            if(this.grid[neighbor.x][neighbor.y] != -1){ //Make sure not evaluated yet
                var tempg = current.g + 1;
                if(this.compareOpenset(neighbor)){//If its in Openset
                    if(tempg < neighbor.g){ //See if this path has a better Score
                        //Set Prev Location
                        neighbor.cameForm = current;
                        //Set G Value
                        neighbor.g = tempg;
                    }
                }else{// Not in Openset So set the G and add it to openset
                    //Set the Draw
                    //this.drawBlock(neighbor.x,neighbor.y,OPEN);

                    //Set Prev Location
                    neighbor.cameForm = current;
                    
                    //Set G Value
                    neighbor.g = tempg;
                    //Add to openset
                    this.openSet.push(neighbor);
                    neighbor.h = heuristic(neighbor,this.end) //Calc the distance to end
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
        });
        }else{
            this.stillSearch = false;
            alert("No Path Was Found!");
        }
    }
    removeOpenSet(spot){
        let i = 0;
        this.openSet.forEach(item => {
            if(item.x == spot.x & item.y == spot.y){
                this.openSet.splice(i,1);
                return;
            }
            i++;
        });
    }
    compareOpenset(spot){
        this.openSet.forEach(item => {
            if(item.x == spot.x & item.y == spot.y){
                return true;
            }
        });
        return false;
    }
    findBestOpenSetIndex(){
        let length = this.openSet.length;
        let lowestIndex = 0;
        for(let i = 0; i < length;i++){
            if(this.openSet[i].f < this.openSet[lowestIndex].f){
                lowestIndex = i;
            }
        }
        return this.openSet[lowestIndex];
    }
    findCurrentNeighbors(current){
        let neighbors = [];
        if(current.x > 0)
            if(this.grid[current.x-1][current.y] != WALL)
                neighbors.push(Spot(current.x-1,current.y,0))
        if(current.x < this.width-1)
            if(this.grid[current.x+1][current.y] != WALL)
                neighbors.push(Spot(current.x+1,current.y,0))
        if(current.y > 0)
            if(this.grid[current.x][current.y-1] != WALL)
                neighbors.push(Spot(current.x,current.y-1,0))
        if(current.y < this.height-1)
            if(this.grid[current.x][current.y+1] != WALL)
                neighbors.push(Spot(current.x,current.y+1,0))
        return neighbors;
    }


    
    //---Changing Block

    drawBlockPath(){
        this.path.forEach(spot => {
            this.drawBlock(spot.x,spot.y,PATH);
        });
    }
    drawBlock(x,y,blockId){
        const block = document.getElementById(String(x + "_" + y));
        switch(blockId){
            case OPEN:
                block.classList.remove("noWall");
                block.classList.add("open");
                break;
            case CLOSED:
                block.classList.remove("open");
                block.classList.add("closed");
                break;
            case PATH:
                block.classList.remove("closed");
                block.classList.add("path");
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
        for (let x = 0; x < this.width; x++) {
            this.grid[x] = new Array(this.height);
        }

    }
}

function heuristic(a,b){
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
}
function Spot(x,y,g,){
        return {x:x, y:y, g:g, h:0, cameForm:undefined};
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }