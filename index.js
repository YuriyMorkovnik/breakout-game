import * as R from 'ramda';

import Brick from './src/entities/Brick';
import Ball from './src/entities/Ball';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const balll = {
  x: canvas.width/2,
  y: canvas.height-30,
  dx: 5,
  dy: -3,
  ballRadius: 10,
};

const ball = new Ball({
  x: canvas.width/2,
  y: canvas.height-30,
  dx: 5,
  dy: -3,
  radius: 10,
});

const getGame = () => {
  let level = 1;
  let isPause = false;
  return {
    getIsPause: () => isPause,
    switchState: () => isPause = !isPause,
  }
};

const game = getGame();

const getBricks = ({ rowCount, columnCount, padding = 20, color = '0095DD', brickHeight = 10 }) => {
  const brickWidth = (canvas.width - (padding * (columnCount + 1))) / columnCount;
  //console.log('brickWidth', brickWidth);
  return R.pipe(
    R.repeat(null),
    R.mapAccum((acc) => {
      const isLastItemInRow = acc.itemIndex + 1 === columnCount;
      const isFirstItemInRow = acc.itemIndex === 1;
      const newAcc = {
        itemIndex: isLastItemInRow ? 0 : acc.itemIndex + 1,
        rowIndex: isLastItemInRow ? acc.rowIndex + 1 : acc.rowIndex,
      };
      const brick = new Brick({
        width: brickWidth,
        height: brickHeight,
        padding,
        color,
        x: padding + ((brickWidth + padding) * acc.itemIndex),
        y: padding + ((brickHeight + padding) * acc.rowIndex),
      });
      //console.log('brick', brick);
      return [newAcc, brick]
    } , { itemIndex: 0, rowIndex: 0 }),
    result => result[1],
  )(rowCount * columnCount)
};

const bricks = getBricks({
  rowCount: 4,
  columnCount: 8,
});

// const bricks = getBricks({
//   rowCount: 2,
//   columnCount: 4,
// });
// bricks.forEach(item => console.log('item', item.x, item.y, item.width));

const getPaddle = () => {
  const height = 10;
  const width = 75;
  let paddleX = (canvas.width - width) / 2;
  let isRightPressed = false;
  let isLeftPressed = false;
  return {
    height,
    width,
    getPaddleX: () => paddleX,
    setPaddleX: newX => paddleX = paddleX + newX,
    getIsRightPressed: () => isRightPressed,
    getIsLeftPressed: () => isLeftPressed,
    setRightPressed: () => isRightPressed = true,
    setLeftPressed: () => isLeftPressed = true,
    setRightNotPressed: () => isRightPressed = false,
    setLeftNotPressed: () => isLeftPressed = false,

  }
};

const isCollisionDetected = ({ bricks, ball }) =>
  bricks.some(brick => {
    const isBrickBottom = ball.y + ball.dy < brick.y + brick.height;
  });

const paddle = getPaddle();

const keyPressHandler = e => {
  if(e.key === 'ArrowRight') {
    paddle.setRightPressed();
  }
  else if(e.key === 'ArrowLeft') {
    paddle.setLeftPressed();
  }
};
const keyNotPressedHandler = e => {
  if(e.key === 'ArrowRight') {
    paddle.setRightNotPressed();
  }
  else if(e.key === 'ArrowLeft') {
    paddle.setLeftNotPressed();
  }
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  const { height, width, getPaddleX } = paddle;
  ctx.beginPath();
  ctx.rect(getPaddleX(), canvas.height-height, width, height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawBricks = bricks => {
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

const draw = () => {
  if (game.getIsPause()) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawBricks(bricks);

  const top = ball.y + ball.dy < ball.radius;
  const bottom = ball.y + ball.dy > canvas.height - ball.radius;

  const verticalBorders = ball.x + ball.dx < ball.radius
    || ball.x + ball.dx > canvas.width - ball.radius;

  const paddleTopBorder = ball.y + ball.dy > canvas.height - paddle.height - ball.radius
    && (ball.x + ball.dx > paddle.getPaddleX() && ball.x + ball.dx < paddle.getPaddleX() + paddle.width);

  const paddleVerticalBorders =
    ((ball.x + ball.dx > paddle.getPaddleX() && ball.x + ball.dx < paddle.getPaddleX() + 10)
    || (ball.x + ball.dx < paddle.getPaddleX() + paddle.width && ball.x + ball.dx > paddle.getPaddleX() + paddle.width - 10))
    && (ball.y + ball.dy > canvas.height - paddle.height - ball.radius);

  if(top || paddleTopBorder || isCollisionDetected({ bricks, ball })) {
    ball.reverseY();
  }
  console.log('det', isCollisionDetected({ bricks, ball }));
  if(verticalBorders || paddleVerticalBorders) {
    ball.reverseX();
  }
  if (bottom) {
    game.switchState();
    alert('Konec igry, suchka');
    document.location.reload();
    return;
  }

  ball.push();

  const paddleRigthBorder = paddle.getPaddleX() < canvas.width - paddle.width;
  const paddleLeftBorder = paddle.getPaddleX() > 0;
  if(paddleRigthBorder && paddle.getIsRightPressed()) {
    paddle.setPaddleX(7);
  }
  else if(paddleLeftBorder && paddle.getIsLeftPressed()) {
    paddle.setPaddleX(-7);
  }
};

document.addEventListener("keydown", keyPressHandler, false);
document.addEventListener("keyup", keyNotPressedHandler, false);
setInterval(draw, 10);
