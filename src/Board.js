// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {  

      //debugger;

      var boardLength = this.get('n');
      var hasPieceExistedOnThisRow = false;

        for (var column = 0; column < boardLength; column++) {
          var currentValueAtPosition = this.get(rowIndex)[column];

          if (currentValueAtPosition && hasPieceExistedOnThisRow) {
            return true;
          }else if (currentValueAtPosition && !hasPieceExistedOnThisRow) {
            hasPieceExistedOnThisRow = true;
          }
        }

      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //debugger;
      var hasPieceExistedOnThisRow = {};

      var boardLength = this.get('n');

      for (var i = 0; i < boardLength; i++) {
        if(this.hasRowConflictAt(i)){
            return true;
          }
        }

        return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var boardLength = this.get('n');
      var hasPieceExistedOnThisColumn = false;

        for (var row = 0; row < boardLength; row++) {
          var currentValueAtPosition = this.get(row)[colIndex];

          if (currentValueAtPosition && hasPieceExistedOnThisColumn) {
            return true;
          }else if (currentValueAtPosition && !hasPieceExistedOnThisColumn) {
            hasPieceExistedOnThisColumn = true;
          }
        }

      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      var hasPieceExistedOnThisColumn = {};

      var boardLength = this.get('n');
      
      for (var i = 0; i < boardLength; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var boardLength = this.get('n');
      var hasMajorDiagonalConflict = false;
      var rowIndex;
      var colIndex;

      //assess firstRowColumnIndex, jump row index to first valid
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        rowIndex = -majorDiagonalColumnIndexAtFirstRow;
        colIndex = 0;
      } else {
        rowIndex = 0;
        colIndex = majorDiagonalColumnIndexAtFirstRow;
      }

      for (;rowIndex < boardLength; rowIndex++) {
        var currentValueAtPosition = this.get(rowIndex)[colIndex];

        if(currentValueAtPosition && hasMajorDiagonalConflict){
          return true;
        } else if(currentValueAtPosition && !hasMajorDiagonalConflict) {
          hasMajorDiagonalConflict = true;
        }
        
        //test whether next position will be outside of table extents
        if (boardLength > colIndex){
          colIndex += 1;
        } else {
          break;
        }
      }

      return false; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var boardLength = this.get('n');

      for(var row = 0; row < boardLength; row++){
        for(var col = 0; col < boardLength; col++) {
          var firstRowColumnIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
          if(this.hasMajorDiagonalConflictAt(firstRowColumnIndex)){
            return true;
          }
        }
      }
      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var boardLength = this.get('n');
      var hasMinorDiagonalConflict = false;
      var rowIndex;
      var colIndex;

      //assess firstRowColumnIndex, jump row index to first valid
      if (minorDiagonalColumnIndexAtFirstRow > boardLength - 1) {
        rowIndex = minorDiagonalColumnIndexAtFirstRow - (boardLength - 1);
        colIndex = boardLength - 1;
      } else {
        rowIndex = 0;
        colIndex = minorDiagonalColumnIndexAtFirstRow;
      }

      for (;rowIndex < boardLength; rowIndex++) {
        var currentValueAtPosition = this.get(rowIndex)[colIndex];

        if (currentValueAtPosition && hasMinorDiagonalConflict) {
          return true;
        } else if (currentValueAtPosition && !hasMinorDiagonalConflict) {
          hasMinorDiagonalConflict = true;
        }
        
        //test whether next position will be outside of table extents
        if (0 < colIndex) {
          colIndex -= 1;
        } else {
          break;
        }
      }

      return false;
      ß
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardLength = this.get('n');

      for(var row = 0; row < boardLength; row++){
        for(var col = 0; col < boardLength; col++) {
          var firstRowColumnIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
          if(this.hasMinorDiagonalConflictAt(firstRowColumnIndex)){
            return true;
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
