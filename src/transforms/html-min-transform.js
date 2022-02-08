const htmlmin = require('html-minifier')

module.exports = (value, outputPath) => {
    if (!outputPath || !outputPath.indexOf('.html') < 0) {
        return value
    }

    return htmlmin.minify(value, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
    })
}