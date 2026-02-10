const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Image optimization shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "90vw") {
    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./public/images/optimized/",
      urlPath: "/images/optimized/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

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