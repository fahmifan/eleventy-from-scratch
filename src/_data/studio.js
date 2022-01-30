const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
    try {
        const api = 'https://11ty-from-scratch-content-feeds.piccalil.li/media.json'
        const { items } = await Cache(api, {
            duration: '1d',
            type: 'json',
        })
        return items
    } catch (err) {
        console.log(err)
        return []
    }
}