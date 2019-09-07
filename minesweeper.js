document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}



function createBoard() {
  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++) {
      board.cells.push({ row: x, col: y, isMine: Boolean(Math.floor(Math.random() * 1.1)), isMarked: false, hidden: true })
    }
  }

}


function startGame() {

  createBoard(3)
  // Don't remove this function call: it makes the game work!
  for (i = 0; i < 36; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);



  lib.initBoard()
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return
    }
    else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return
    }
  }
  lib.displayMessage('You win!')

}



function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count++;
    };
  };
  return count;
}



function resetBoard() {
  document.querySelector(".board").innerHTML = ''
  board = {
    cells: []
  }

  startGame()
}

