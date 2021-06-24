let can, con, size;
const NUM_CELLS = 80;
const maze = [];
const drawPos = {x : 0, y : 0};
window.onload = init; 
function init() {
  can = document.getElementById('can');
  con = can.getContext('2d');
  makeMaze();
  window.onresize = resize;
  resize();
  can.addEventListener('click', handleClick);
  window.addEventListener("keydown", handleKD);
}
function resize() {
  const bcr = document.body.getBoundingClientRect();
  const min = Math.min(bcr.width, bcr.height);
  can.width = can.height = min;
  can.style.left = (bcr.width - min) / 2 + 'px';
  can.style.top = (bcr.height - min) / 2 + 'px';
  size = min / NUM_CELLS;
  draw();
}
function handleClick(event) {
  event.preventDefault();
  const row = Math.floor(event.layerY / size);
  const col = Math.floor(event.layerX / size);
  maze[row][col] = !maze[row][col];
  drawPos.x = col;
  drawPos.y = row;
  draw();
}
function handleKD(event) {
  event.preventDefault();
  switch (event.key){
    case "ArrowUp": 
      if (drawPos.y === 0 ) {
        return;
      } 
      drawPos.y--;
      break;
    case "ArrowDown": 
      if (drawPos.y === NUM_CELLS - 1) {
        return;
      } 
      drawPos.y++;
      break;
    case "ArrowLeft": 
      if (drawPos.x === 0 ) {
        return;
      } 
      drawPos.x--;
      break;
    case "ArrowRight": 
      if (drawPos.x === NUM_CELLS - 1 ) {
        return;
      } 
      drawPos.x++;
      break;
    case "s" : case "S" :
      download();
      break;
  }
  maze[drawPos.y][drawPos.x] = !maze[drawPos.y][drawPos.x]
  draw();
}
function draw() {
  con.clearRect(0, 0, can.width, can.height);
  con.fillStyle = "red";
  for (let rowIndex = 0; rowIndex < NUM_CELLS; rowIndex++) {
    for (let colIndex = 0; colIndex < NUM_CELLS; colIndex++) {
      if (maze[rowIndex][colIndex]) {
        con.fillRect(colIndex * size, rowIndex * size, size, size)
      }
    }
  }
  con.beginPath();
  con.strokeStyle = "cornflowerblue";
  con.lineWidth = 0.5;
  for (let i = 0; i < NUM_CELLS; i++) {
    con.moveTo(0, i * size);
    con.lineTo(can.width, i * size);
    con.moveTo(i * size, 0);
    con.lineTo(i * size, can.height);
  }
  con.stroke()
}
function makeMaze() {
  for (let rowIndex = 0; rowIndex < NUM_CELLS; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < NUM_CELLS; colIndex++) {
      row.push(false);
    }
    maze.push(row);
  }
}

function download() { // to do
  const filename = prompt("Choose a filename.");
  let text = maze.toString();
  const blob = new Blob([text], {type : "text/plain"});
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.dataset.downloadurl =
    ["text/plain", anchor.download, anchor.href].join(":");
  console.log(anchor.dataset.downloadurl);
  anchor.click();
  window.URL.revokeObjectURL(anchor.href);
}
//make it so mazerizer program can creat a file that can be used to make a maze (maze2.csv, main3.rb)