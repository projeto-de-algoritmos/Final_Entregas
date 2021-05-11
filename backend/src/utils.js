const estados = require('../database/estados.json')

const getUtcDateTime = (offset = '0') => {
  var d = new Date()
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000)
  var nd = new Date(utc + (3600000 * offset))
  return nd
}

const toDate = (dateStr) => {
  if (typeof dateStr !== 'string') return dateStr
  const parts = dateStr.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const _mergeArrays = (a, b, filter, order) => {
  const c = []

  while (a.length && b.length) {
    if (order === 'crescente') c.push(a[0][filter] > b[0][filter] ? b.shift() : a.shift())
    else c.push(a[0][filter] < b[0][filter] ? b.shift() : a.shift())
  }

  while (a.length) c.push(a.shift())
  while (b.length) c.push(b.shift())

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

const buildRoute = (startState, endState, mustVisitStates, numberOfMustVisitStates) => {
  const queue = []
  // const routeStates = []
  let visited = {}
  let distances = {}
  let parents = {}

  queue.push(estados[startState])
  visited[startState] = true
  distances[startState] = 0
  // routeStates.push(startState)

  while (queue.length > 0) {
    const currentNode = queue[0]
    queue.shift()

    if (currentNode.sigla === endState) {
      // routeStates.push(endState)
      // return parents
      break;
    }

    // if (mustVisitStates.findIndex(state => state.sigla === currentNode.sigla) >= 0) {
    //   routeStates.push(currentNode.sigla)
    // }

    currentNode.arestas.forEach(({ sigla: neigh }) => {
      if (!visited[neigh]) {
        distances[neigh] = distances[currentNode.sigla] + 1
        parents[neigh] = currentNode.sigla
        // if (mustVisitStates.findIndex(state => state.sigla === neigh) >= 0) {
        //   routeStates.push(estados[neigh])
        // }

        visited[neigh] = true
        queue.push(estados[neigh])
      }
    })
  }

  const path = []
  let parent = estados[endState].sigla

  while (parent !== estados[startState].sigla) {
    path.unshift(estados[parent])
    parent = parents[parent]
  }
  path.unshift(estados[parent])

  const arestas = []
  for (let i = 1; i < path.length; i++) {
    arestas.push(`${path[i - 1].sigla}-${path[i].sigla}`)
  }

  return { estados: path.map(p => p.sigla), arestas }
}

// console.log(buildRoute('DF', 'SP', []))
module.exports = { getUtcDateTime, sort, toDate, buildRoute }