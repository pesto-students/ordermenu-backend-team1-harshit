const slug = require('slug')

slug.defaults.modes['rfc3986'] = {
  replacement: '-',      // replace spaces with replacement
  remove: null,          // (optional) regex to remove characters
  lower: true,           // result in lower case
  charmap: slug.charmap, // replace special characters
  multicharmap: slug.multicharmap, // replace multiple code unit characters
  trim: true             // trim leading and trailing replacement chars
};

const generateSlug = (input) => {
  return slug(input)
}

module.exports = generateSlug