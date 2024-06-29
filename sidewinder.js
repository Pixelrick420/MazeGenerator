var grid = [];
var run = [];
var current;

const urlParams = new URLSearchParams(window.location.search);
const framerate = parseInt(urlParams.get('framerate'));
const cols = parseInt(urlParams.get('width'));
const rows = parseInt(urlParams.get('height'));
var size = Math.min(Math.floor(700 / rows), Math.floor(1400 / cols));

function setup() {
    smooth();
    frameRate(framerate);
    createCanvas(cols*size, rows*size);

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            let cell = new Cell(r, c);
            if(r == 0){
                cell.walls[1] = 0;
                cell.walls[3] = 0;
                cell.visited = 1;
            }
            row.push(cell);
        }
        grid.push(row);
    }

    current = grid[1][0]; 
    current.visited = 1; 
    current.iscurrent = 1;
}

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    run.push(current);
    if (current.j < grid[0].length - 1){
        if(Math.floor(Math.random() * 2)){
            var carve = run[Math.floor(Math.random() * run.length)];
            carve.walls[0] = 0;
            grid[carve.i - 1][carve.j].walls[2] = 0;
            run = [];
            
        }
        else{
            current.walls[1] = 0;
            grid[current.i][current.j + 1].walls[3] = 0;
        }
        var next = grid[current.i][current.j + 1];
    }

    else{
        var carve = run[Math.floor(Math.random() * run.length)];
        carve.walls[0] = 0;
        grid[carve.i - 1][carve.j].walls[2] = 0;
        run = [];
        var next = grid[carve.i + 1][0];
    }
    current.iscurrent = 0;
    next.iscurrent = 1;
    next.visited = 1;
    current = next; 
}

function remwalls(cell1, cell2){
    if ((cell1.j == cell2.j) && (cell1.i > cell2.i)){
        cell1.walls[0] = 0;
        cell2.walls[2] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j < cell2.j)){
        cell1.walls[1] = 0;
        cell2.walls[3] = 0;
    }

    if ((cell1.j == cell2.j) && (cell1.i < cell2.i)){
        cell1.walls[2] = 0;
        cell2.walls[0] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j > cell2.j)){
        cell1.walls[3] = 0;
        cell2.walls[1] = 0;
    }
}

function Cell(i, j){
    this.i = i;
    this.j = j;
    this.walls = [1, 1, 1, 1]; // top, right, bottom, left
    this.visited = 0;
    this.iscurrent = 0;

    this.show = function(){
        noFill();
        var x = this.j * size;
        var y = this.i * size;
        stroke(255);
        strokeWeight(2); 
        strokeCap(ROUND); 

        if (this.walls[0]) {
            line(x, y, x + size, y);
        }
        if (this.walls[1]) {
            line(x + size, y, x + size, y + size);
        }
        if (this.walls[2]) {
            line(x + size, y + size, x, y + size);
        }
        if (this.walls[3]) {
            line(x, y + size, x, y);
        }
        if (this.visited) {
            noStroke();
            fill(107,161,221);
            rect(x, y, size, size);
        }
        if (this.iscurrent){
            noStroke();
            fill(245,121,58);
            rect(x, y, size, size);
        }
    }
}
