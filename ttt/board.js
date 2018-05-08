/*
 * Copyright (C) 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * This file represents a TicTacToe board object, with all needed drawing and
 * state update functions.
 */


/**
 * Creates an empty board object with no location
 * @param {CanvasRenderingContext2D} context the 2D context of the canvas that
 *     the board is drawn on.
 * @constructor
 */
function board(context) {
  this.mContext = context;

}

/**
 * Resets the board to a starting state.
 * @this {board}
 */
function boardReset() {
    this.mContext.beginPath();
    this.mContext.clearRect(0, 0, this.mContext.canvas.width,
                            this.mContext.canvas.height);

//  console.log('this.X ' + this.X + ' Y: ' + this.Y + ' width: ' + this.mContext.canvas.width + ' height: ' + this.mContext.canvas.height);
}

/**
 * Calculates and sets internally the board's width, height, x, and y.
 * @this {board}
 */
function boardCalcDimensions(level) {
    this.lineThickness = 2;
  if (this.mContext.canvas.width > this.mContext.canvas.height) {
    this.dimension = this.mContext.canvas.height - 2 * this.margin;
  } else {
    this.dimension = this.mContext.canvas.width - 2 * this.margin;
  }
  this.X = (this.mContext.canvas.width - this.dimension) / 2;
  this.Y = (this.mContext.canvas.height - this.dimension) / 2;
    this.cellWidth = (this.dimension - (level -1) * this.lineThickness) / level;
//    console.log('boardCalcDimensions level: ' + level + ' dimension: ' + this.dimension + ' cellWidth: ' + this.cellWidth + ' lineThickness: ' + this.lineThickness);
}

/**
 * Calculates board dimensions.
 * @this {board}
 */
function boardClear(level) {
  this.calcDimensions(level);
}

/**
 * Draws the hashmark-shaped grid for TicTacToe.
 * @this {board}
 */
function boardDrawGrid(level) {
//    console.log('boarddrawgrid b4 new version correction');
    this.level = level;
    // draw background
    this.mContext.fillStyle = '#BDBDBD';
    this.mContext.strokeStyle = '#000000';
    this.mContext.fillRect(this.X, this.Y, this.dimension, this.dimension);
//    console.log('boardDrawGrid before');
//    console.log('boardDrawGrid level: ' + level + ' dimension: ' + this.dimension + ' cellWidth: ' + this.cellWidth);
    // draw grid
    this.mContext.lineWidth = this.lineThickness;
    var oneHalfLineThickness = this.mContext.lineWidth / 2.0;
    
//    this.lineThickness = 10;

    //draw vertical lines
    for (var i=1; i<level; i++)
    {
        var xPos = this.X + this.cellWidth * i + this.mContext.lineWidth * (i - 1) + oneHalfLineThickness;
        var yPos = this.Y + this.cellWidth * level + this.mContext.lineWidth * (level - 1) + oneHalfLineThickness;
        this.mContext.moveTo(xPos, this.Y);
        this.mContext.lineTo(xPos, yPos);
        this.mContext.stroke();
//        console.log('boarddrawgrid vertical i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
    }
    
    //draw horizontal liens
    for (var i=1; i<level; i++)
    {
        var xPos = this.X + this.cellWidth * level + this.mContext.lineWidth * (level - 1) + oneHalfLineThickness;
        var yPos = this.Y + this.cellWidth * i + this.mContext.lineWidth * (i - 1) + oneHalfLineThickness;
        this.mContext.moveTo(this.X, yPos);
        this.mContext.lineTo(xPos, yPos);
        this.mContext.stroke();
//        console.log('boarddrawgrid horizontal i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
    }
    
}

/**
 * Draws an O symbol in the given row and column.
 * @param {number} row the row the piece should be placed in.
 * @param {number} col the column the piece should be placed in.
 * @this {board}
 * @return {boolean} true if the selected row and column is a valid square
 *     to put a piece in.
 */
function boardDrawNaught(row, col) {
//    console.log('boardDrawNaught row: ' + row);
//    console.log('boardDrawNaught col: ' + col);
  this.mContext.lineWidth = this.lineThickness;
  this.mContext.strokeStyle = '#FFFF00';
  this.mContext.beginPath();
    
    var xThickness = (col - 1) * this.mContext.lineWidth + 0.5 * this.mContext.lineWidth;
    var yThickness = (row - 1) * this.mContext.lineWidth + 0.5 * this.mContext.lineWidth;
    var oneHalfLineThickness = this.mContext.lineWidth / 2.0;
//    console.log('draw naught linewidth ' + this.mContext.lineWidth);
    
    var xCenter = this.X + this.cellWidth * (col + 0.5) + xThickness;
    var yCenter = this.Y + this.cellWidth * (row + 0.5) + yThickness;
    
    var r = (this.cellWidth - this.cellWidth / 6.0) / 2.0;
    
//    console.log('boardDrawNaught xCenter ' + xCenter + ' yCenter: ' + yCenter + ' cellWidth: ' + this.cellWidth + ' col: ' + col + ' row: ' + row + ' this.X:' + this.X + ' this.Y: ' + this.Y);
//    this.mContext.arc(xCenter + oneHalfLineThickness, yCenter + oneHalfLineThickness, this.cellWidth / 2 - this.pieceMargin, 0, 360);
    this.mContext.arc(xCenter + oneHalfLineThickness, yCenter + oneHalfLineThickness, r, 0, 360);
  this.mContext.stroke();
  return true;
}

/**
 * Draws an X symbol in the given row and column.
 * @param {number} row the row the piece should be placed in.
 * @param {number} col the column the piece should be placed in.
 * @this {board}
 * @return {boolean} true if the selected row and column is a valid square
 *     to put a piece in.
 */
function boardDrawCross(row, col) {
//    console.log('boardDrawCross row: ' + row);
//    console.log('boardDrawCross col: ' + col);
  this.mContext.strokeStyle = '#0000FF';
  this.mContext.lineWidth = this.lineThickness;
  this.mContext.beginPath();
    this.pieceMargin = this.cellWidth / 6.0;
    
    var xThickness = (col - 1) * this.mContext.lineWidth + 0.5 * this.mContext.lineWidth;
    var yThickness = (row - 1) * this.mContext.lineWidth + 0.5 * this.mContext.lineWidth;
    var oneHalfLineThickness = this.mContext.lineWidth;
    
  this.mContext.moveTo(this.X + this.cellWidth * col + this.pieceMargin + xThickness,    //top left corner
      this.Y + this.cellWidth * row + this.pieceMargin + yThickness);
  this.mContext.lineTo(this.X + this.cellWidth * (col + 1) - this.pieceMargin + xThickness + oneHalfLineThickness,
      this.Y + this.cellWidth * (row + 1) - this.pieceMargin + yThickness  + oneHalfLineThickness);
  this.mContext.stroke();
    
  this.mContext.moveTo(this.X + this.cellWidth * (col + 1) - this.pieceMargin + xThickness + oneHalfLineThickness,
      this.Y + this.cellWidth * row + this.pieceMargin + yThickness);
  this.mContext.lineTo(this.X + this.cellWidth * col + this.pieceMargin + xThickness,
      this.Y + this.cellWidth * (row + 1) - this.pieceMargin + yThickness + oneHalfLineThickness);
  this.mContext.stroke();
  return true;
}

function boardDrawWinningLocation(aWinningOjbect) {    
    var i = aWinningOjbect.CellICoordinate;
    var j = aWinningOjbect.CellJCoordinate;
    var gameRule = aWinningOjbect.GameRule;
    var level = aWinningOjbect.BoardSizeLevel;
    var drawDirection = aWinningOjbect.Direction;

    
//    console.log('boardDrawWinningLocation direction: '  + drawDirection);
    var kMaxDrawLevel = 8;
    var xStart = yStart = xEnd = yEnd = -1;
    var xThickness = yThickness = xCompensate = yCompensate = -1;
    var xAdjustHalf = yAdjustHalf = 0;
    var xRoundAdjustment = 0.5;
    var yRoundAdjustment = 0.5; //0.15;
//    this.mWinningLocation = loc;

    switch (drawDirection)
    {
        case 1:
        {
//            console.log('boardDrawWinningLocation horizontal : ' );
            xStart = xRoundAdjustment + i;
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;  //need to substract 0.05
            yStart = yEnd = 0.5 + j;
            yThickness = j;
            xThickness = i;
            xCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            yCompensate = 0;
            break;
        }
        case 2:
        {
//            this.displayText("draw winning col");
//            console.log('boardDrawWinningLocation vertical ');
            yStart = xRoundAdjustment + j;
            yEnd = yStart + gameRule - 2 * yRoundAdjustment;
            xStart = xEnd = (0.5 + i);
            yThickness = j;
            xThickness = i;    //self.level*2 is for enum value
            xCompensate = 0;
            yCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            break;
        }
        case 3:  //diagonal top left
        {
//            console.log('boardDrawWinningLocation diagonal top left ');
            xStart = xRoundAdjustment + i;   //add thickness later
            yStart = yRoundAdjustment + j;   //add thickness later
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;
            yEnd = yStart + gameRule - 2 * yRoundAdjustment;
            xThickness = i;
            yThickness = j;
            xCompensate = gameRule - 1;
            yCompensate = gameRule - 1;
            break;
        }
        case 4:   //anti-diagonal bottom left
        {
//            console.log('boardDrawWinningLocation antidiagonal: ');
            xStart = xRoundAdjustment + i;   //add thickness later
            yStart = -yRoundAdjustment + j + 1;   //add thickness later
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;
            yEnd = yStart + (level - gameRule) + 2 * yRoundAdjustment;
            xThickness = i;
            yThickness = j;
            xCompensate = gameRule - 0;
            yCompensate = level - gameRule;
            break;
        }
        default:
            break;
    }
    
    this.mContext.lineCap = "round";
    this.mContext.lineWidth = this.lineThickness * 5;
    this.mContext.strokeStyle = '#FF0000';
    this.mContext.beginPath();
    this.mContext.moveTo(this.X + this.cellWidth * xStart + this.lineThickness * xThickness - xAdjustHalf, this.Y + this.cellWidth * yStart + this.lineThickness * yThickness - yAdjustHalf);
    this.mContext.lineTo(this.X + this.cellWidth * xEnd + this.lineThickness * xThickness + this.lineThickness * xCompensate - xAdjustHalf, this.Y + this.cellWidth * yEnd + this.lineThickness *yThickness + this.lineThickness * yCompensate - yAdjustHalf);
    this.mContext.stroke();
    return true;
}

board.prototype.calcDimensions = boardCalcDimensions;
board.prototype.clear = boardClear;
board.prototype.drawCross = boardDrawCross;
board.prototype.drawGrid = boardDrawGrid;
board.prototype.drawNaught = boardDrawNaught;
board.prototype.drawWinningLocation = boardDrawWinningLocation;
board.prototype.margin = 50;
board.prototype.reset = boardReset;
