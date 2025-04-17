const runTransaction = async (transactionFn) => {
    const session = await mongoose.startSession();
    let result;
  
    try {
      session.startTransaction();
      result = await transactionFn(session);
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  
    return result;
  };
  
  export { runTransaction };
  