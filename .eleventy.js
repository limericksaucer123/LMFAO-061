

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/images");

  // Passthrough copy for admin folder (Decap CMS)
  eleventyConfig.addPassthroughCopy("./src/admin");

  return {
    dir: {
      input: "src",
      output: "public" // matches your Netlify publish folder
    }
  };
};