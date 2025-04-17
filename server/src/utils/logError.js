const logError = (err, customMessage = "") => {
  console.error(`[ERROR] ${customMessage} ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }
};

export { logError };
