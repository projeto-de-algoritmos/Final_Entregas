const getUtcDateTime = (offset = '0') => {
    var d = new Date()
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000)
    var nd = new Date(utc + (3600000 * offset))
    return nd
}

const _mergeArrays = (a, b, filter, order) => {
    const c = []

    while (a.length && b.length) {
        if (order === 'crescente') c.push(a[0][filter] > b[0][filter] ? b.shift() : a.shift())
        else c.push(a[0][filter] < b[0][filter] ? b.shift() : a.shift())
    }

    while (a.length) {
        c.push(a.shift())
    }
    while (b.length) {
        c.push(b.shift())
    }

    return c
}

const mergeSort = (array, filter, order) => {
    if (array.length < 2) return array
    const middle = Math.floor(array.length / 2)
    const array_l = array.slice(0, middle)
    const array_r = array.slice(middle, array.length)
    const sorted_l = mergeSort(array_l, filter, order)
    const sorted_r = mergeSort(array_r, filter, order)
    return _mergeArrays(sorted_l, sorted_r, filter, order)
}

const sort = (items, filter, order = 'crescente') => {
    const itemsOrdenados = mergeSort(items, filter, order)
    return itemsOrdenados
}

module.exports = { getUtcDateTime, sort }