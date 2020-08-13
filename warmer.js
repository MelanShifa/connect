// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, colorMode, HSB, width, height, sqrt,tint,RGB, textFont, textAlign, CENTER
          random, background, fill, color, random, round, collideLineCircle, collideRectCircle
          rect, ellipse, stroke, image, loadImage, keyIsDown, loadSound, textSize, loadFont, 
          collideCircleCircle, text, mouseX, mouseY, strokeWeight, line, mouseIsPressed
          mouseButton, RIGHT, noStroke, keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, floor, createButton, setVolume*/

const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6)
  .fill()
  .map(() => Array(7).fill(0));
let player = 1;
let playerPos;
const stack = [];
let win = 0;

let backgroundColor,
  spherePosition,
  rectPosition,
  lofi,
  img,
  yellowPiece,
  orangePiece,
  border,
  chipDrop;

function preload() {
  // Load in the background image
  img = loadImage(
    "https://cdn.glitch.com/a684682e-7448-4bb6-b368-0c1b6874a8ce%2F240-2405214_play-dough-connect-4-empty-board.png?v=1595861573236"
  );

  border = loadImage(
    "https://cdn.glitch.com/a6648215-9eea-4481-bc36-60fcd86dcd56%2Fyellow-brush-stroke-isolated-on-260nw-1490393081.jpg?v=1596202364310"
  );
  lofi = loadSound(
    "https://cdn.glitch.com/a6648215-9eea-4481-bc36-60fcd86dcd56%2FKahoot%20Type%20Beat%20Kahoot%20Trap%20Remix.mp3?v=1596178495042"
  );

  chipDrop = loadSound(
    "https://cdn.glitch.com/a6648215-9eea-4481-bc36-60fcd86dcd56%2FFREE%20SOUND%20FX%20Board%20Card%20Games%20Connect%204%20Playing%20Discs%20Drop%20Into%20Box.mp3?v=1596178465384"
  );
}

function setup() {
  // Canvas & color settings
  var canvas = createCanvas(cols * w, rows * w + w);
  canvas.mousePressed(drop);
  backgroundColor = 70;
  // lofi.play;
}

//draw
function draw() {
  background(28, 28, 27);

  playerPos = floor(mouseX / w);
  stroke(255, 204, 0);
  strokeWeight(4);
  // // fill(255, 204, 0);
  // rect(-1, -1, width + 2, w);
  image(border, -1, -1, width + 2, w);
  for (let m = 0; m < rows; m++) {
    for (let k = 0; k < cols; k++) {
      fill(255);
      if (board[m][k] == 1) {
        fill(98, 13, 217); //player 1 piece
      } else if (board[m][k] == 2) {
        fill(13, 217, 180); //player 2 piece
      }
      ellipse(k * w + w / 2, m * w + (3 * w) / 2, dw);
    }
  }
  strokeWeight(2);
  stroke(252, 186, 3);
  for (let x = w; x < width; x += w) {
    line(x, w, x, height);
  }

  stroke(0);
  if (player == 1) {
    //if Player one turn piece to purple
    fill(98, 13, 217);
  } else if (player == 2) {
    // if player 2 turn piece to mint green
    fill(13, 217, 180);
  }

  ellipse((playerPos + 0.5) * w, w / 2, dw);

  if (win != 0) {
    noStroke();
    fill(255, 90, 22);
    if (win == 1) {
      fill(98, 13, 217);
    } else if (win == 2) {
      fill(13, 217, 180);
    }
    textAlign(CENTER);
    textSize(90);
    strokeWeight(10);
    if (win == 4) {
      text("Game Over!", width / 2, w / 2);
    } else if (win == 3) {
      text(
        "How'd You Tie?!?!?! Press the botton to restart",
        width / 2,
        width / 2
      );
    } else {
      text(`${win > 1 ? "Player 1" : "Player 2"} won!`, width / 2, width / 2);

      //add restart function
    }
  }
}
//reload function
function reloadThePage() {
  window.location.reload();
}

//hasWon
function hasWon() {
  //vertical
  for (let m = 0; m <= rows - 4; m++) {
    for (let k = 0; k < cols; k++) {
      const test = board[m][k];
      if (test != 0) {
        let temp = true;
        for (let r = 0; r < 4; r++) {
          if (board[m + r][k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  //horizontal
  for (let m = 0; m < rows; m++) {
    for (let k = 0; k <= cols - 4; k++) {
      const test = board[m][k];
      if (test != 0) {
        let temp = true;
        for (let r = 0; r < 4; r++) {
          if (board[k][m + r] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  //diagonal
  for (let m = 0; m <= rows - 4; m++) {
    for (let k = 0; k <= cols - 4; k++) {
      const test = board[m][k];
      if (test != 0) {
        let temp = true;
        for (let r = 0; r < 4; r++) {
          if (board[m + r][k + r] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  //opp-diagonal
  for (let m = 0; m <= rows - 4; m++) {
    for (let k = 4; k < cols; k++) {
      const test = board[m][k];
      if (test != 0) {
        let temp = true;
        for (let r = 0; r < 4; r++) {
          if (board[m + r][k - r] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  return false;
}
// called mousePressed() in setup and ran drop() function through it

function mousePressed() {
  lofi.play;
  if (lofi.isPlaying()) {
    setVolume(50);
    // chipDrop.play();
  } else {
    lofi.play();
    // chipDrop.play();
  }
}

function dropChip() {
  board[0][playerPos] = player;
  stack.push(playerPos);
  let m = 0;
  while (true) {
    if (m >= rows - 1) {
      break;
    }
    if (board[m + 1][playerPos] != 0) {
      break;
    }
    [board[m + 1][playerPos], board[m][playerPos]] = [
      board[m][playerPos],
      board[m + 1][playerPos]
    ];
    m++;
  }
}

function drop() {
  if (board[0][playerPos] != 0) {
    win = 4;
  }

  dropChip();

  if (hasWon()) {
    console.log(`${player > 1 ? "Red" : "Blue"} won!`);
    win = player;
  }

  let tie = true;
  for (let m = 0; m < rows; m++)
    outer: {
      for (let k = 0; k < cols; k++) {
        if (board[m][k] == 0) {
          tie = false;
        }
      }
    }

  if (tie) {
    win = 3;
  }

  player = 3 - player;
}
// done by Melan shifa, Kylie Etwaroo, and Rashad Harris under CSSI's supervision