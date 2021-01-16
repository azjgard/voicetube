interface IArgs {
  num: number;
  min: number;
  max: number;
}

export default function constrainNumber({ num, min, max }: IArgs) {
  let n = num;
  n = Math.max(min, n);
  n = Math.min(max, n);
  return n;
}
