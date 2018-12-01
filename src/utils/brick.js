import * as R from "ramda";
import Brick from "../entities/Brick";

export const getBricks = ({ rowCount, columnCount, padding = 20, color, brickHeight = 10, canvas }) => {
  const brickWidth = (canvas.width - (padding * (columnCount + 1))) / columnCount;
  return R.pipe(
    R.repeat(null),
    R.mapAccum((acc) => {
      const isLastItemInRow = acc.itemIndex === columnCount - 1;
      const newAcc = {
        itemIndex: isLastItemInRow ? 0 : acc.itemIndex + 1,
        rowIndex: isLastItemInRow ? acc.rowIndex + 1 : acc.rowIndex,
        key: acc.key + 1,
      };
      const brick = new Brick({
        key: acc.key,
        width: brickWidth,
        height: brickHeight,
        padding,
        color,
        x: padding + ((brickWidth + padding) * acc.itemIndex),
        y: padding + ((brickHeight + padding) * acc.rowIndex),
      });
      return [newAcc, brick]
    } , { itemIndex: 0, rowIndex: 0, key: 0 }),
    result => result[1],
  )(rowCount * columnCount)
};