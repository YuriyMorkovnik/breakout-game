export const findHorizontalCollidingBrick = ({ bricks, ball }) =>
  bricks.find(brick => (ball.getNextPosition.y < brick.y + brick.height && ball.getNextPosition.y > brick.y)
    && (ball.getNextPosition.x > brick.x && ball.getNextPosition.x < brick.x + brick.width));

export const findVerticalCollidingBrick = ({ bricks, ball }) =>
  bricks.find(brick => ((ball.getNextPosition.x > brick.x && ball.getNextPosition.x < brick.x + ball.dx)
    || (ball.getNextPosition.x < brick.x && ball.getNextPosition.x > brick.x + brick.width + ball.dx))
    && (ball.getNextPosition.y < brick.y + brick.height && ball.getNextPosition.y > brick.y));

export const isViewTop = ball => ball.y + ball.dy < ball.radius;

export const isViewBottom = ({ ball, canvas }) => ball.y + ball.dy > canvas.height - ball.radius;

export const isViewVerticalBorders = ({ ball, canvas }) => ball.x + ball.dx < ball.radius
  || ball.x + ball.dx > canvas.width - ball.radius;

export const isPaddleTopBorder = ({ ball, canvas, paddle }) =>ball.getNextPosition.y > canvas.height - paddle.height
  && (ball.getNextPosition.x > paddle.x && ball.getNextPosition.x < paddle.x + paddle.width);

export const isPaddleVerticalBorders = ({ ball, canvas, paddle }) =>
  ((ball.x + ball.dx > paddle.x && ball.x + ball.dx < paddle.x + 10)
    || (ball.x + ball.dx < paddle.x + paddle.width && ball.x + ball.dx > paddle.x + paddle.width - 10))
  && (ball.y + ball.dy > canvas.height - paddle.height - ball.radius);

export const isPaddleRightBorder = ({ paddle, canvas }) => paddle.x > canvas.width - paddle.width;

export const isPaddleLeftBorder = paddle => paddle.x < 0;