import Ball from './entities/Ball';
import Paddle from './entities/Paddle';
import Game from './entities/Game';
import KeyboardManager from './entities/KeyboardManager';

import { eventTypes } from './utils/paddle';
import { getBricks } from './utils/brick';
import {
  findHorizontalCollidingBrick,
  findVerticalCollidingBrick,
  isViewTop,
  isViewBottom,
  isViewVerticalBorders,
  isPaddleTopBorder,
  isPaddleVerticalBorders,
  isPaddleRightBorder,
  isPaddleLeftBorder
} from './utils';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

const keyboardManager = new KeyboardManager();


const game = new Game();

let bricks = getBricks({
  rowCount: 8,
  columnCount: 16,
  padding: 5,
  brickHeight: 8,
  canvas,
  color: 'green',
});

const paddle = new Paddle({
  height: canvas.height / 30,
  width: canvas.width / 6,
  x: (canvas.width - 75) / 2,
  dx: canvas.width / 90,
});

const ball = new Ball({
  x: canvas.width / 2,
  y: canvas.height - paddle.height - (canvas.width / 70),
  dx: canvas.width / 150,
  dy: -canvas.height / 130,
  radius: canvas.width / 70,
  color: 'red',
});


const keyDownHandler = ({ key }) => {
  switch (key) {
    case eventTypes.arrowLeft: {
      keyboardManager.setLeftArrowPressed();
      return;
    }
    case eventTypes.arrowRight: {
      keyboardManager.setRightArrowPressed();
      return;
    }
  }
};

const keyUpHandler = ({ key }) => {
  switch (key) {
    case eventTypes.arrowLeft: {
      keyboardManager.setLeftArrowNotPressed();
      return;
    }
    case eventTypes.arrowRight: {
      keyboardManager.setRightArrowNotPressed();
      return;
    }
  }
};

const renderBall = () => {
  const { x, y, radius, color } = ball;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const renderPaddle = () => {
  const { height, width, x, color } = paddle;
  ctx.beginPath();
  ctx.rect(x, canvas.height-height, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const renderBricks = bricks => {
  bricks.forEach(({
    x,
    y,
    width,
    height,
    color,
  }) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath()
  })
};

const render = () => {
  if (game.isPause) return;
  if (bricks.length === 0) {
    game.switchState();
    alert('You are molodec!');
    document.location.reload();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const horizontalCollidingBrick = findHorizontalCollidingBrick({ bricks, ball });
  const verticalCollidingBrick = !horizontalCollidingBrick && findVerticalCollidingBrick({ bricks, ball });
  const collidingBrick = horizontalCollidingBrick || verticalCollidingBrick;

  bricks = collidingBrick
    ? bricks.filter(brick => brick.key !== collidingBrick.key)
    : bricks;

  renderBall();
  renderPaddle();
  renderBricks(bricks);

  if(isViewTop(ball)
    || isPaddleTopBorder({ ball, paddle, canvas })
    || horizontalCollidingBrick) {
    ball.reverseY();
  }
  if(isViewVerticalBorders({ ball, canvas })
    || isPaddleVerticalBorders({ ball, paddle, canvas })
    || verticalCollidingBrick) {
    ball.reverseX();
  }
  if (isViewBottom({ ball, canvas })) {
    game.switchState();
    alert('Game over, suchka');
    document.location.reload();
    return;
  }

  ball.push();

  if(!isPaddleRightBorder({ paddle, canvas }) && keyboardManager.isRightArrowPressed) {
    paddle.moveRight();
  }
  else if(!isPaddleLeftBorder(paddle) && keyboardManager.isLeftArrowPressed) {
    paddle.moveLeft();
  }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(render, 10);
