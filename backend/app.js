const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const database = require('./database/items.json')
const { getUtcDateTime, sort, toDate } = require('./src/utils')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getItems = (request, response) => {
  const { filterBy, order, porPagina = 10, pagina = 1 } = request.query
  if (filterBy) {
    if (!['identificador', 'estado', 'empresa', 'dataEntrega'].find(filter => filter === filterBy))
      return response.status(400).json({ message: "Parâmetro filterBy inválido, deve ser um desses valores: ['identificador', 'estado', 'empresa']" })
    if (order && !['crescente', 'decrescente'].find(ord => ord === order))
      return response.status(400).json({ message: "Parâmetro order inválido, deve ser um desses valores: ['crescente', 'decrescente']" })

    const itemsOrdenados = sort(database, request.query.filterBy, request.query.order)
    return response.status(200).json(itemsOrdenados.slice((pagina - 1) * porPagina, pagina * porPagina))
  }
  response.status(200).json(database.slice((pagina - 1) * porPagina, pagina * porPagina))
}

const addItem = (request, response) => {
  const { identificador, descricao, empresa, estado, dataEntrega } = request.body
  const novoItem = { identificador, descricao, empresa, estado, dataEntrega }

  const dataAgora = getUtcDateTime()
  const dataObjEntrega = new Date(dataEntrega.split('/')[2], dataEntrega.split('/')[1] - 1, dataEntrega.split('/')[0])

  if (typeof identificador !== 'number') return response.status(400).json({ message: "Identificador inválido, deve ser um número" })
  if (typeof descricao !== 'string') return response.status(400).json({ message: "Descricao inválida, deve ser uma string" })
  if (typeof empresa !== 'string') return response.status(400).json({ message: "Empresa inválida, deve ser uma string" })
  if (typeof estado !== 'string') return response.status(400).json({ message: "Estado inválido, deve ser uma string" })
  if (typeof dataEntrega !== 'string') return response.status(400).json({ message: "Data de Entrega inválida, deve ser uma string e maior do que o dia de hoje" })
  if (dataObjEntrega < dataAgora) return response.status(400).json({ message: "Data de Entrega inválida, deve ser maior do que o dia de hoje" })

  const itemExistente = database.find(item => item.identificador === identificador)
  if (itemExistente) return response.status(400).json({ message: "Produto com este identificador já está cadastrado" })

  novoItem['dataEntrega'] = toDate(novoItem['dataEntrega'])
  database.unshift(novoItem)
  fs.writeFile('./database/items.json', JSON.stringify(database), (err) => {
    if (err) return console.log(err);
    console.log('Item salvo com sucesso no banco de dados');
  });
  return response.status(201).json({ message: "Produto criado com sucesso!" })
}

const prepareItems = (request, response) => {
  return sort(sort(database, dataEntrega, 'crescente'))
}

app
  .route('/items')
  .get(getItems)
  .post(addItem)

app
  .route('/items/prepare')
  .post(prepareItems)

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port`, process.env.PORT || 3001)
})