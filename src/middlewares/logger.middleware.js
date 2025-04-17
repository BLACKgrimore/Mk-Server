import morgan from "morgan";

const applyLogger = () => {
  if (process.env.NODE_ENV !== "production") {
    return morgan("dev");
  }
  return (req, res, next) => next(); // No logging in production
};

export default applyLogger;
