const sortByDisplayOrder = require('./src/utils/sort-by-display-order')

module.exports = config => {
    config.addPassthroughCopy('./src/images/');

    // Returns work items, sorted by display order
    config.addCollection('work', collection => {
        const res = collection.getFilteredByGlob('./src/work/*.md')
        return sortByDisplayOrder(res);
    });

    // Returns work items, sorted by display order then filtered by featured
    config.addCollection('featuredWork', collection => {
        const res = collection.getFilteredByGlob('./src/work/*.md')
        return sortByDisplayOrder(res)
            .filter(
                x => x.data.featured
            );
    });

    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse()
    })

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
