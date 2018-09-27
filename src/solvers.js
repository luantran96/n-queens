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
    
  }
  
  solution = traverseTree(n,startingRowIndex,startingColIndex);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0; //fixme
  
  // Check this
  var board = new Board({'n':n});

  var traverseTree = function(remainingRooks,rowIndex) {

    if(remainingRooks === 0 || rowIndex > n){
      solutionCount += 1;
      return;
    }

    for (var i = 0; i < n ; i++) {
      board.togglePiece(rowIndex,i);
      if (!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(i)) {
        traverseTree(remainingRooks - 1, rowIndex + 1);
      }

      board.togglePiece(rowIndex,i);
    }
  }
  
  traverseTree(n,0);
  
  console.log('Solution count for ' + n + ' rooks:', JSON.stringify(solutionCount));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution; //fixme
  var firstRowColumnIndex1;
  var firstRowColumnIndex2;
  // Check this
  var board = new Board({'n':n});
  var traverseTree = function(remainingRooks,rowIndex) {

    if(remainingRooks === 0 || rowIndex > n){
      
      return board.rows();
    }

    for (var i = 0; i < n ; i++) {
      board.togglePiece(rowIndex,i);
      firstRowColumnIndex1 = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i);
      firstRowColumnIndex2 = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i);

      if (!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(i) && !board.hasMajorDiagonalConflictAt(firstRowColumnIndex1) && !board.hasMinorDiagonalConflictAt(firstRowColumnIndex2)) {
        return traverseTree(remainingRooks - 1, rowIndex + 1);
      }

      board.togglePiece(rowIndex,i);
    }
  }
  
  solution = traverseTree(n,0);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0; //fixme
  var firstRowColumnIndex1;
  var firstRowColumnIndex2;
  // Check this
  var board = new Board({'n':n});
  var traverseTree = function(remainingRooks,rowIndex) {

    if(remainingRooks === 0 || rowIndex > n){
      solutionCount += 1;
      return;
    }

    for (var i = 0; i < n ; i++) {
      board.togglePiece(rowIndex,i);
      firstRowColumnIndex1 = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i);
      firstRowColumnIndex2 = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i);

      if (!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(i) && !board.hasMajorDiagonalConflictAt(firstRowColumnIndex1) && !board.hasMinorDiagonalConflictAt(firstRowColumnIndex2)) {
        traverseTree(remainingRooks - 1, rowIndex + 1);
      }

      board.togglePiece(rowIndex,i);
    }
  }
  
  traverseTree(n,0);
  
  console.log('Solution count for ' + n + ' rooks:', JSON.stringify(solutionCount));
  return solutionCount;
};
