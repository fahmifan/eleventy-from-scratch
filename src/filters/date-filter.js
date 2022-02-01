const moment = require('moment')

module.exports = value => {
    const dateObj = moment(value)
    return `${dateObj.format('Do')} of ${dateObj.format('MMMMM YYYY')}`
}