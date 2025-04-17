const pick = (obj = {}, keys = []) =>
  keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) acc[key] = obj[key];
    return acc;
  }, {});

const omit = (obj = {}, keys = []) =>
  Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) acc[key] = obj[key];
    return acc;
  }, {});

export { pick, omit };
