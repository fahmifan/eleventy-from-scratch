module.exports = config => {
    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
    };
};
