const sortByDisplayOrder = require('./src/utils/sort-by-display-order')
const dateFilter = require('./src/filters/date-filter')
const w3DateFilter = require('./src/filters/w3-date-filter')

module.exports = config => {
    config.addPassthroughCopy('./src/images/');

    // Filters
    config.addFilter('dateFilter', dateFilter)
    config.addFilter('w3DateFilter', w3DateFilter)

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
