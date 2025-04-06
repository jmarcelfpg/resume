import { FC } from "react";

export const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
      Z`;
};

export const TriangleBar: FC<
  Partial<{
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>
> = (props) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;

  const d = getPath(x, y, width, height);

  return <path d={d} stroke="none" fill={fill} />;
};
