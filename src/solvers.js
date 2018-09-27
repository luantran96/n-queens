/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var solution = []; //fixme
  
  // Check this
  var board = new Board({'n':n});
  var startingRowIndex = 0;
  var startingColIndex = 0;

  var traverseTree = function(remainingRooks,rowIndex,colIndex) {
    
    if (remainingRooks === 0) {
      return board.rows();
    }
    
    //if no conflict at coordinates
    board.togglePiece(rowIndex, colIndex);
    if (!board.hasColConflictAt(colIndex) && !board.hasRowConflictAt(rowIndex)) {
      //place rook
      
      //jump rowIndex +  1, set colIndex to 0
      //other optimizations
 
      //loop through possible decisions recursively
      return traverseTree(remainingRooks - 1, rowIndex + 1, 0);

    } else {

      board.togglePiece(rowIndex, colIndex);

      if (colIndex === (n - 1)) {
        rowIndex = rowIndex + 1;
        colIndex = 0;
      } else {
        colIndex += 1;
      }
      return traverseTree(remainingRooks, rowIndex, colIndex);
    }
      
    
    
    //if exhust all branches and n rooks have not been placed, 
    
    //reset board
      //advance startingRowIndex and/or startingColIndex
      //restart recursive loop from new root
    
  }
  
  solution = traverseTree(n,startingRowIndex,startingColIndex);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
