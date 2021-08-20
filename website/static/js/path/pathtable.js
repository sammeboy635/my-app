

class PathTable{
    constructor(width,height){
        this.table = document.getElementById("path_table");
        this.width = width;
        this.height = height;
        this.x;
        this.y;

        this.loadedTable = false;
        this.tables = new Array(height*width);
    }
    //----ARRAY HANDLER
    tables_set(index,blockItem){
        this.tables[index] = blockItem;
    }
    tables_get(index){
        return this.tables[index];
    }

    find_best_path(){
        let target = parseInt(document.getElementsByClassName("target").id);
        let flag = parseInt(document.getElementsByClassName("flag").id);
        
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

    //---GUI TABLE HANDLER
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
    //----MOUSE INPUT
    mouseDown_get(){
        return this.mouseDown;
    }
    mouseDown_set(mouseDown){
        this.mouseDown = mouseDown;
    }
    mouseInput_set(mouseInput){
        this.mouseInput = mouseInput;
    }
    mouseInput_get(){
        return this.mouseInput;
    }
}
 