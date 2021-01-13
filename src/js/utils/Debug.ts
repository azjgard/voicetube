export default {
  log: (...args: any[]) => {
    const value = args.join(", ");
    if (process.env.NODE_ENV !== "production") {
      console.log(value);
    }
    return value;
  },
};
