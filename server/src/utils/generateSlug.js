import slugify from "slugify";

const generateSlug = (text = "") => {
  return slugify(text, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g
  });
};

export { generateSlug };
