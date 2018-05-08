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

var animteTime = 100;
var frameCount = 60;
var currentX = 15;
var currentY = 15;
var offsetX;
var offsetY;
//var canvasOffset;
var ctx;
var mySoundFile;
var myAudio;

var cellCanvas;
//var cellContext;
var previousPoint;

var cellWidth;
var cellHeight;
var boardWidth;
var boardHeight;

var lineThickness;
var numberOfColumns;
var numberOfRows;

var mContext;
var dimension;
var thisX;
var thisY;

var startX;
var startY;
var endX;
var endY;

var dropColumn;
var dropRow;
var dropCellType;

var xCellColor;
var oCellColor;
var colors;
var colorsCode;

var currentEvent;

SoundFile = {
ONLINE: 'ONLINE',
CLICKERS: 'CLICKERS',
MUSIC: 'MUSIC',
};

Colors = {
    blackColor: 'Black',
    darkGrayColor: 'DarkGray',
    lightGrayColor: 'LightGray',
    whiteColor: 'White',
    grayColor: 'Gray',
    redColor: 'Red',
    blueColor: 'Blue',
    cyanColor: 'Cyan',
    yellowColor: 'Yellow',
    magentaColor: 'Magenta',
    orangeColor: 'Orange',
    purpleColor: 'Purple',
    brownColor: 'Brown',
};

ColorsCode = {
    blackColor: 1,
    darkGrayColor: 2,
    lightGrayColor: 3,
    whiteColor: 4,
    grayColor: 5,
    redColor: 6,
    blueColor: 7,
    cyanColor: 8,
    yellowColor: 9,
    magentaColor: 10,
    orangeColor: 11,
    purpleColor: 12,
    brownColor: 13,
};




//function board(context) {

function board(context, webaudioclass) {
    
    mContext = context;
    colors = Colors;
    colorsCode = ColorsCode;
    ctx = context;
//    console.log('create board function ctx ' + ctx);
    
    offsetX = 0;
    offsetY = 0;
    
    cellCanvas = document.createElement("canvas");
}

/**
 * Resets the board to a starting state.
 * @this {board}
 */
function boardReset() {
    if (cellCanvas.parentNode)
    {
        console.log('cellCanvas is active');
        document.body.removeChild(cellCanvas);
    }
    
    
    mContext.beginPath();
    mContext.clearRect(0, 0, mContext.canvas.width,
                            mContext.canvas.height);

//  console.log('boardReset thisX ' + thisX + ' Y: ' + thisY + ' width: ' + mContext.canvas.width + ' height: ' + mContext.canvas.height);
}

/**
 * Calculates and sets internally the board's width, height, x, and y.
 * @this {board}
 */
function boardCalcDimensions(level) {
    lineThickness = 2;
    numberOfColumns = 7;
    numberOfRows = 6;
    
//    _kCellWidth =  (kBoardWidth - (kNumberOfColumns - 1) * kLineThickness) / kNumberOfColumns;
//    _kCellHeight =  (kBoardHeight - (kNumberOfRows - 1) * kLineThickness) / kNumberOfRows;

  if (mContext.canvas.width > mContext.canvas.height) {
    dimension = mContext.canvas.height - 2 * this.margin;
  } else {
    dimension = mContext.canvas.width - 2 * this.margin;
  }
  thisX = (mContext.canvas.width - dimension) / 2;
  thisY = (mContext.canvas.height - dimension) / 2;
    
//    console.log('boardcalcdimensions thisX: ' + thisX + ' thisY: ' + thisY);
    
    cellWidth = (dimension - (numberOfColumns + 1) * lineThickness) / numberOfColumns;
    cellHeight = (dimension - (numberOfRows + 1) * lineThickness) / numberOfRows;
    
    boardWidth = (numberOfColumns + 1) * lineThickness + numberOfColumns * cellWidth;
    boardHeight = (numberOfRows + 1) * lineThickness + numberOfRows * cellHeight;
    
//    console.log('boardCalcDimensions boardWidth: ' + boardWidth + ' boardHeight: ' + boardHeight + ' cellWidth: ' + cellWidth + ' cellHeight: ' + cellHeight);
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
    mContext.fillStyle = '#BDBDBD';
    mContext.strokeStyle = '#000000';
    mContext.fillRect(thisX, thisY, dimension, dimension);
//    console.log('boardDrawGrid before');
    // draw grid
//    mContext.lineWidth = lineThickness;
    mContext.lineWidth = lineThickness;
//    console.log(' boardDrawGrid mContext.linewidth: ' + mContext.lineWidth)
    var oneHalfLineThickness = mContext.lineWidth / 2.0;
//    console.log('boardDrawGrid level: ' + level + ' dimension: ' + dimension + ' cellWidth: ' + cellWidth + ' cell.height: ' + cellHeight + ' linethickness: ' + lineThickness);
    
    //    lineThickness = 10;
    
    //draw vertical lines
    for (var i=0; i<(numberOfColumns + 1); i++)
    {
        var xPos = thisX + cellWidth * i + mContext.lineWidth * i + oneHalfLineThickness;
        var yPos = thisY + cellHeight * numberOfRows + mContext.lineWidth * (numberOfRows + 1);
        mContext.moveTo(xPos, thisY);
        mContext.lineTo(xPos, yPos);
        mContext.stroke();
        //        console.log('boarddrawgrid vertical i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
    }
    
    //draw horizontal liens
    for (var i=0; i<(numberOfRows + 1); i++)
    {
        var xPos = thisX + cellWidth * numberOfColumns + mContext.lineWidth * (numberOfColumns + 1);
        var yPos = thisY + cellHeight * i + mContext.lineWidth * i + oneHalfLineThickness;
        mContext.moveTo(thisX, yPos);
        mContext.lineTo(xPos, yPos);
        mContext.stroke();
        //        console.log('boarddrawgrid horizontal i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
    }
    
}

function boardDraw(x, y) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //    console.log('boardDraw after ctx clear ');
    //    console.log('boardDraw canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
    
    ctx.beginPath();
    //    console.log('boardDraw afte beginpath canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
    ctx.fillStyle = "skyblue";
    ctx.strokeStyle = "gray";
    //                  ctx.rect(x, y, 30, 20);
    var xCenter = x;
    var yCenter = y;
    r = 15;
    ctx.arc(xCenter, yCenter, r, 0, 360);
    ctx.fill();
    ctx.stroke();
    //    console.log('boardDraw x ' + xCenter + ' y ' + yCenter + ' r ' + r);
}

function boardDrawWinningLocation(aWinningOjbect)
{
    var gameRule = aWinningOjbect.GameRule;   //to make this compatible with iOS code
    var drawDirection = aWinningOjbect.Direction;  //to make this compatible with iOS code
    var i = aWinningOjbect.CellICoordinate;   //to make this compatible with iOS code
    var j = aWinningOjbect.CellJCoordinate;   //to make this compatible with iOS code
    
    var xStart = -1;
    var yStart = -1;
    var xEnd = -1;
    var yEnd = -1;
    var xThickness = -1;
    var yThickness = -1;
    var xCompensate = -1;
    var yCompensate = -1;
    var xAdjustHalf = 0;
    var yAdjustHalf = 0;
    var xRoundAdjustment = 0.5;
    var yRoundAdjustment = 0.5; //0.15;
    
    switch (drawDirection)
    {
        case 1:
        {
            xStart = xRoundAdjustment + i;
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;  //need to substract 0.05
            yStart = yEnd = 0.5 + j;
            yThickness = j;  //number of rows
            xThickness = i;  //number of columns
            xCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            yCompensate = 0;
            break;
        }
        case 2:
        {
            yStart = yRoundAdjustment + j;
            yEnd = yStart + gameRule - 2 * yRoundAdjustment;
            xStart = xEnd = (0.5 + i);
            yThickness = j;
            xThickness = i;    //self.level*2 is for enum value
            xCompensate = 0;
            yCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            break;
        }
        case 3:    //topleft
        {
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
        case 4:    //anti-diagonal  need to use bottomleft
        {
            //bottomleft
            xStart = i + xRoundAdjustment;   //add thickness later
            yStart = -yRoundAdjustment + j + 1;   //add thickness later
            xEnd = xStart + gameRule  - 2 * xRoundAdjustment;
            yEnd = yStart + (0 - gameRule) + 2 * yRoundAdjustment;
            xThickness = i;
            yThickness = j;
            xCompensate = gameRule - 0;
            yCompensate = 0 - gameRule;
            break;
        }
        default:
            break;
    }

    var x = lineThickness;
    var y = lineThickness;
    
    mContext.lineCap = "round";
    mContext.lineWidth = lineThickness * 5;
    mContext.strokeStyle = '#FFCCBB';
    mContext.beginPath();
    
    mContext.moveTo(thisX + x + cellWidth * xStart + lineThickness * xThickness - xAdjustHalf, thisY + y + cellHeight * yStart + lineThickness * yThickness - yAdjustHalf);
    mContext.lineTo(thisX + x + cellWidth * xEnd + lineThickness * xThickness + lineThickness * xCompensate - xAdjustHalf, thisY + y + cellHeight * yEnd + lineThickness * yThickness + lineThickness * yCompensate - yAdjustHalf);
    mContext.stroke();
    
}

function boardDrawAtPoints(x,y) {
//    console.log('boardDrawAtPoints x: ' + x + ' y: ' + y);
    mouseX = parseInt(x - offsetX);
    mouseY = parseInt(y - offsetY);
    $("#downlog").html("DownNew: " + mouseX + " / " + mouseY);
    
    // Put your mousedown stuff here
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
}

function boardInitDraw() {
    // start the rect at [10,10]
//    console.log('boardInitDraw');
    boardDraw(15,15);
}

function createCellCanvas(x, y) {
//    cellCanvas = document.createElement("canvas");
    document.body.appendChild(cellCanvas);
    cellCanvas.style.position = "absolute";
    cellCanvas.width = cellWidth;
    cellCanvas.height = cellHeight;
    
    cellCanvas.style.left = x + "px";   //x
    cellCanvas.style.top = y + "px";    //y
    
    //draw ball into cellCanvas
    var cellContext = cellCanvas.getContext('2d');
    cellContext.beginPath();
    
    if (dropCellType == 1)
    {
        cellContext.fillStyle = xCellColor;
        cellContext.strokeStyle = xCellColor;
    }
    else
    {
        cellContext.fillStyle = oCellColor;
        cellContext.strokeStyle = oCellColor;
    }
    
    var xCenter = cellWidth / 2.0;
    var yCenter = cellHeight / 2.0;
//    console.log('createCellCanvas xCenter: ' + xCenter + ' yCenter: ' + yCenter);
    var r = cellWidth * 0.40;
    cellContext.arc(xCenter, yCenter, r, 0, 360);
    cellContext.fill();
    cellContext.stroke();
    
}
function boardDropBall(event) {
    currentEvent = event;
    var text = event.data;
    var cellColumn = text.CellColumn;
    var cellRow = text.CellRow;
    var cellType = text.CellType;

    dropColumn = cellColumn;
    dropRow = cellRow;
    dropCellType = cellType;
    
//    console.log('boardDropBall cellcolumn: ' + cellColumn + ' cellRow: ' + cellRow + ' cellType: ' + cellType);
//    console.log('boardDropBall thisX: ' + thisX + ' thisY: ' + thisY);
    
    var initX = lineThickness;
    var initY = lineThickness;
    
    var j = 0;
    startX = thisX + initX + cellWidth * cellColumn + lineThickness * cellColumn;
    startY = thisY + initY + cellHeight * j + lineThickness * j;
//    console.log('boardDropBall startX: ' + startX + ' startY: ' + startY);
    
    createCellCanvas(startX, startY, cellType);
    
    endX = startX;
    endY = thisY + initY + cellHeight * cellRow + lineThickness * cellRow;
//    var destX = startX;
//    var destY = thisY + initY + cellHeight * cellRow + lineThickness * cellRow;
//    console.log('boardDropBall endX: ' + endX + ' endY: ' + endY);
    
    boardDrawAtPoints(endX, endY);
    
}

function boardDrawAtPoints(x,y) {
    mouseX = parseInt(x);
    mouseY = parseInt(y);
    currentX = parseInt(startX);
    currentY = parseInt(startY);
    
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
}

function boardDrawCircleForCellCanvas(x, y) {
//    console.log('boardDrawCircleForCellCanvas x: ' +  x + ' y: ' + y);
    
    ctx.beginPath();
    //    console.log('boardDraw afte beginpath canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
    
    if (dropCellType == 1)
    {
        ctx.fillStyle = xCellColor;
        ctx.strokeStyle = xCellColor;
    }
    else
    {
        ctx.fillStyle = oCellColor;
        ctx.strokeStyle = oCellColor;
    }

    var xCenter = endX + cellWidth / 2.0;
    var yCenter = endY + cellHeight / 2.0;
//    console.log('boarddrawcircle xCenter: ' + xCenter + ' yCenter: ' + yCenter);
    var r = cellWidth * 0.40;
    ctx.arc(xCenter, yCenter, r, 0, 360);
    ctx.fill();
    ctx.stroke();
    //    console.log('boardDraw x ' + xCenter + ' y ' + yCenter + ' r ' + r);
}

function animate() {
    var point = points[currentFrame++];
    //    boardDraw(point.x, point.y);
    boardDrawCanvas(point.x, point.y);
    
    // refire the timer until out-of-points
    if (currentFrame < points.length) {
        previousPoint = point;
//        console.log('animate previouspoint.x: ' + previousPoint.x + ' previousPoint.y: ' + previousPoint.y);
        timer = setTimeout(animate, animteTime / 60);
    }
    else
    {
//        console.log('finished animated');
        if (cellCanvas.parentNode)
        {
//            console.log('animate cellCanvas is active.  finished animated');
//            myAudio.playSound2();
            boardDrawCircleForCellCanvas(previousPoint.x, previousPoint.y);
            document.body.removeChild(cellCanvas);
            
            window.messageBus.send(currentEvent.senderId, 12345);
        }
    }
}

function linePoints(x1, y1, x2, y2, frames) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    var incrementX = dx / frames;
    var incrementY = dy / frames;
    var a = new Array();
    
    a.push({
           x: x1,
           y: y1
           });
    for (var frame = 0; frame < frames - 1; frame++) {
        a.push({
               x: x1 + (incrementX * frame),
               y: y1 + (incrementY * frame)
               });
    }
    a.push({
           x: x2,
           y: y2
           });
    return (a);
}
function boardDrawCanvas(x, y) {
    cellCanvas.style.left = x + "px";
    cellCanvas.style.top = y + "px";
//    console.log('boardDrawCanvas x: ' + x + ' y: ' + y);
    
}
function boardCellColorPairsObject(jsonText)
{
    xCellColor = getColorCode(jsonText.xCellColor);
    oCellColor = getColorCode(jsonText.oCellColor);
}
function getColorCode(colorStringCode)
{
//    console.log('getcolorCode colorstringcode: ' + colorStringCode);
    switch (colorStringCode)
    {
        case '1':
        {
            return colors.blackColor;
            break;
        }
        case '2':
        {
            return colors.darkGrayColor;
            break;
        }
        case '3':
        {
            return colors.lightGrayColor;
            break;
        }
        case '4':
        {
            return colors.whiteColor;
            break;
        }
        case '5':
        {
            return colors.grayColor;
            break;
        }
        case '6':
        {
            return colors.redColor;
            break;
        }
        case '7':
        {
            return colors.blueColor;
            break;
        }
        case '8':
        {
            return colors.cyanColor;
            break;
        }
        case '9':
        {
            return colors.yellowColor;
            break;
        }
        case '10':
        {
            return colors.magentaColor;
            break;
        }
        case '11':
        {
            return colors.orangeColor;
            break;
        }
        case '12':
        {
            return colors.purpleColor;
            break;
        }
        case '13':
        {
            return colors.brownColor;
            break;
        }
        default:
            return colors.blueColor;
            break;
    }

}
function boardCellColorPairsObject_old(colorCollectionTag)
{
//    console.log('boardcellcolorpairboject colorcollecitontag: ' + colorCollectionTag);
    switch (colorCollectionTag)
    {
        case '1':
        {
//            console.log('boardcellcolorpairboject case 1 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.redColor;
            oCellColor = colors.blueColor;
            break;
        }
        case '2':
        {
//            console.log('boardcellcolorpairboject case 2 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.purpleColor;
            oCellColor = colors.lightGrayColor;
            break;
        }
        case '3':
        {
//            console.log('boardcellcolorpairboject case 3 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.blackColor;
            oCellColor = colors.whiteColor;
            break;
        }
        case '4':
        {
//            console.log('boardcellcolorpairboject case 4 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.cyanColor;
            oCellColor = colors.yellowColor;
            break;
        }
        case '5':
        {
//            console.log('boardcellcolorpairboject case 5 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.magentaColor;
            oCellColor = colors.orangeColor;
            break;
        }
        case '6':
        {
//            console.log('boardcellcolorpairboject case 6 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.brownColor;
            oCellColor = colors.blueColor;
            break;
        }
        case '7':
        {
//            console.log('boardcellcolorpairboject case 7 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.redColor;
            xCellColor = colors.blueColor;
            break;
        }
        case '8':
        {
//            console.log('boardcellcolorpairboject case 8 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.purpleColor;
            xCellColor = colors.lightGrayColor;
            break;
        }
        case '9':
        {
//            console.log('boardcellcolorpairboject case 9 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.blackColor;
            xCellColor = colors.whiteColor;
            break;
        }
        case '10':
        {
//            console.log('boardcellcolorpairboject case 10 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.cyanColor;
            xCellColor = colors.yellowColor;
            break;
        }
        case '11':
        {
//            console.log('boardcellcolorpairboject case 11 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.magentaColor;
            xCellColor = colors.orangeColor;
            break;
        }
        case '12':
        {
//            console.log('boardcellcolorpairboject case 12 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.brownColor;
            xCellColor = colors.blueColor;
            break;
        }
        default:
            break;
    }
    
}

board.prototype.calcDimensions = boardCalcDimensions;
board.prototype.clear = boardClear;
board.prototype.drawGrid = boardDrawGrid;
board.prototype.drawWinningLocation = boardDrawWinningLocation;
board.prototype.margin = 50;
board.prototype.reset = boardReset;
board.prototype.draw = boardDraw;
board.prototype.initDraw = boardInitDraw;
board.prototype.drawAtPoints = boardDrawAtPoints;
board.prototype.dropBall = boardDropBall;
board.prototype.cellColorPairsObject = boardCellColorPairsObject;
