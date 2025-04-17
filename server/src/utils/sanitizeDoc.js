const sanitizeDoc = (doc) => {
    const obj = doc.toObject ? doc.toObject() : { ...doc };
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  };
  
  export { sanitizeDoc };
  