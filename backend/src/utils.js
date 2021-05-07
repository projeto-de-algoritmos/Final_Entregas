const getUtcDateTime = (offset = '0') => {
    var d = new Date()
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000)
    var nd = new Date(utc + (3600000 * offset))
    return nd
}

module.exports = { getUtcDateTime }