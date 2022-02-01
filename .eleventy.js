const sortByDisplayOrder = require('./src/utils/sort-by-display-order')
const dateFilter = require('./src/filters/date-filter')
const w3DateFilter = require('./src/filters/w3-date-filter')
const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = config => {
    config.addPlugin(rssPlugin);
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

    config.addCollection('people', collection => {
        return collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
            return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1
        })
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
