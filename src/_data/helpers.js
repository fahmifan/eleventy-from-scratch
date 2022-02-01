module.exports = {
    /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemURL The link in question
   * @param {String} pageURL The page context
   * @returns {String} The attributes or empty
   */
    getLinkActiveState(itemURL, pageURL) {
        let response = ''
        if (itemURL === pageURL) {
            response = ' aria-current="page"'
        }

        if (itemURL.length > 1 && pageURL.indexOf(itemURL) === 0) {
            response += ' data-state="active"';
        }

        return response
    },
    getSiblingContent(collection = [], item = {}, limit = 3, random = true) {
        let filteredItems = collection.filter(x => x.url !== item.url)

        const filterSize = filteredItems.length;
        if (random) {
            let counter = filterSize

            while (counter > 0) {
                // Pick random index
                let index = Math.floor(Math.random() * counter)

                counter--

                let temp = filteredItems[counter]

                // Swap the last element with the random one
                filteredItems[counter] = filteredItems[index]
                filteredItems[index] = temp;
            }
        }

        // lastly, trim to length
        if (limit > 0 && filterSize > 0) {
            filteredItems = filteredItems.slice(0, limit)
        }

        return filteredItems;
    }
}