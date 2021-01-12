export default class Debug {
  static log(...args: any[]) {
    const value = args.join(", ");
    if (process.env.NODE_ENV !== "prod") {
      console.log(value);
    }
    return value;
  }
}
