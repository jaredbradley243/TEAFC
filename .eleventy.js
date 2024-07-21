const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Add support for YAML data files
  eleventyConfig.addDataExtension("yml, yaml", (contents, filePath) => {
    return yaml.load(contents);
  });

  // Watch the js-bundle.liquid file and JavaScript files for changes
  eleventyConfig.addWatchTarget("./content/js-bundle.liquid");
  eleventyConfig.addWatchTarget("./content/*.js");
  eleventyConfig.addWatchTarget("./_includes/layouts/*.js");
  eleventyConfig.addWatchTarget("./_includes/partials/*.js");

  // Pass through the assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // Filters
  eleventyConfig.addFilter("titleCase", function (str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  return {
    dir: {
      input: "content", // Content directory
      output: "_site", // Output directory
      includes: "../_includes", // Includes directory (partials and layouts)
      data: "../_data-global", // Data directory
    },
    passthroughFileCopy: true,
  };
};
