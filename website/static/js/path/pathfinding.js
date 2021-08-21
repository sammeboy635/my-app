class spot{
    constructor(){
        this.x = x;
        this.y = y;
        this.visited = true;
    }
}
class PathFinding{
    constructor(width,height, sx, sy, ex,ey){
        this.openSet = [];
        this.visitedSet = new Array(height*width);

        this.width = width;
        this.height = height;
        
        this.sx = sx;
        this.sy = sy;
        
        this.ex = ex;
        this.ey = ey;

        this.grid = new Array[this.height];
        for(let i = 0;i<this.height;i++){
            this.grid[i] = new Array[this.width]
        }

        this.priotyX = [];
        this.priotyY = [];
    }
    
    Find_Path(x,y,side){
        handleDrawBlock((y * this.width)+x,PATH)
        switch(side){
            case"right":
            this.handleMovingRight(x,y);
            break;
            case"down":
            this.handleMovingDown(x,y);
            break;
            case"left":
            this.handleMovingLeft(x,y);
            break;
            case"up":
            this.handleMovingUp(x,y);
            break;

        }
        
    }
    handleMovingRight(x,y){
        if(x != this.width-1 &!this.visitedSet[((y) * this.width)+(x+1)]){
            if(grid[x+1,y] != WALL){
                this.visitedSet[(y * this.width)+x] += 1;
                this.Find_Path(x+1,y,"right");
            }else{
                this.Find_Path(x+1,y,"right");
            }
        }else{
            this.Find_Path(x,y,"down");
        }
    }
    handleMovingDown(x,y){
        if(y > 0 & !this.visitedSet[((y-1) * this.width)+x]){
            if(this.grid[x,y-1] != WALL){
                this.visitedSet[(y * this.width)+x] += 1;
                this.Find_Path(x+1,y,"right");
            }else{
                this.Find_Path(x,y-1,"right");
            }
        }else{
            this.Find_Path(x,y,"left");
        }
    }
    handleMovingLeft(x,y){
        if(x > 0 & !this.visitedSet[((y) * this.width)+(x-1)]){
            if(this.grid[x-1,y] != WALL){
                this.visitedSet[(y * this.width)+x] += 1;
                this.Find_Path(x-1,y,"right");
            }else{
                this.Find_Path(x-1,y,"right");
            }
        }else{
            this.Find_Path(x,y,"down");
        }
    }
    handleMovingUp(x,y){
        let side = "";
        if(y < this.height-1 & !this.visitedSet[((y+1) * this.width)+x]){
            if(this.grid[x,y-1] != WALL){
                this.visitedSet[(y * this.width)+x] += 1;
                this.Find_Path(x+1,y,"right");
            }else{
                this.Find_Path(x+1,y,"right");
            }

        }else{
            this.Find_Path(x,y,"right");
        }
    }
}

