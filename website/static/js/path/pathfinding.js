class PathFinding{
    constructor(width,height, sx, sy, ex,ey){
        this.openSet = [];
        this.newOpenSet = [];

        this.closedSet = [];
        this.newClosedSet = [];

        this.width = width;
        this.height = height;
        
        this.sx = sx;
        this.sy = sy;
        
        this.ex = ex;
        this.ey = ey;

        this.grid = new Array[height];
        for(let i = 0;i<height;i++){
            grid[i] = new Array[width]
        }
    }
    Find_Path(){
        let openLength = this.openSet.length;
        if(openLength > 0){
            var winner = 0;
            for(let i = 0; i < openLength;i++){
                if(this.openSet[i].f < this.openSet[winner].f){
                    winner = i;
                }
            }
            var current = this.openSet[winner];
            if(current == end){
                console.log("Done!");
            }
            this.openSet.remove(current);
            this.closedSet.push(current);
            
        }
    }
}
function spot(x,y){
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
}