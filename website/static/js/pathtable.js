export class PathTable{
    constructor(width,height){
        this.table = document.getElementById("path_table");;
        this.width = width;
        this.height = height;
        this.x;
        this.y;

        this.loadedTable = false;
        this.tables = new Array(height);
        for(let i = 0; i < height;i++){
            this.tables[i] = new Array(width)
        }
    }
    
    
    bounds_x_within(x){
        if(x >= this.width | x <= 0){
            return false;
        }
        return true;
    }
    bounds_y_within(y){
        if(y >= this.height | y <= 0){
            return false;
        }
        return true;
    }

    createTable(){

        if(this.loadedTable == false){
            for(let i = 0; i < this.height;i++){
                this.y = i;
                this.createRow();
            }
            this.loadedTable = true;
        }
    }
    createRow(){
        const row = document.createElement('tr');
        for(let i = 0; i < this.width;i++){
            this.x = i;
            row.appendChild(this.createBox());
        }
        this.table.appendChild(row);
    }
    
    createBox(){
        const block = document.createElement('td');
        block.classList.add("unvisited");
        block.id = String((this.y * this.width)+this.x);
        block.onmousedown = (function() {handleOnClick(this.id)});
        block.onmouseenter = (function() {handleOnEnter(this.id)});
        return block;
    }
    clearTable(){
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

const website = document.getElementById("root");
let mousedown = false;
let mouseInput = 0;

website.addEventListener("mousedown", function(e) {mousedown = true;mouseInput = e.button});
website.addEventListener("mouseup", function() {mousedown = false});

export function handleOnClick(id){
    changeBlockClass(id);
}
export function handleOnEnter(id){
    if(mousedown == true){
        changeBlockClass(id);
    }
}
function changeBlockClass(id){
    const block = document.getElementById(id);
    if(mouseInput == 0){
        block.classList.remove("unvisited");
        block.classList.add("visited");
    }else if(mouseInput == 2){
        block.classList.remove("visited");
        block.classList.add("unvisited");
    }
}

export function clearTable(){
    console.log('here');
}