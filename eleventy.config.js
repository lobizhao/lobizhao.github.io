const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItTocDoneRight = require("markdown-it-toc-done-right");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  const options = {
    html: true,
    breaks: true,
    linkify: true
  };

  const markdownLib = markdownIt(options)
    .use(markdownItAnchor)
    .use(markdownItTocDoneRight, {
      containerClass: 'toc',
      listType: 'ul',
    });

  eleventyConfig.setLibrary("md", markdownLib);
};