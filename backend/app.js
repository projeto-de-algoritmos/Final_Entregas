const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const database = require('./database/items.json')
const { getUtcDateTime } = require('./src/utils')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getItems = (request, response) => {
    response.status(200).json({})
}

const addItem = (request, response) => {
    const { identificador, descricao, empresa, cidade, dataEntrega } = request.body
    const novoItem = { identificador, descricao, empresa, cidade, dataEntrega }

    const dataAgora = getUtcDateTime()
    const dataObjEntrega = new Date(dataEntrega.split('/')[2], dataEntrega.split('/')[1] - 1, dataEntrega.split('/')[0])

    if (typeof identificador !== 'number') return response.status(400).json({ message: "Identificador inválido, deve ser um número" })
    if (typeof descricao !== 'string') return response.status(400).json({ message: "Descricao inválida, deve ser uma string" })
    if (typeof empresa !== 'string') return response.status(400).json({ message: "Empresa inválida, deve ser uma string" })
    if (typeof cidade !== 'string') return response.status(400).json({ message: "Cidade inválida, deve ser uma string" })
    if (typeof dataEntrega !== 'string') return response.status(400).json({ message: "Data de Entrega inválida, deve ser uma string e maior do que o dia de hoje" })
    if (dataObjEntrega < dataAgora) return response.status(400).json({ message: "Data de Entrega inválida, deve ser maior do que o dia de hoje" })

    const itemExistente = database.find(item => item.identificador === identificador)
    if (itemExistente) return response.status(400).json({ message: "Produto com este identificador já está cadastrado" })

    database.push(novoItem)
    fs.writeFile('./database/items.json', JSON.stringify(database), (err) => {
        if (err) return console.log(err);
        console.log('Item salvo com sucesso no banco de dados');
    });
    return response.status(201).json({ message: "Produto criado com sucesso!" })
}

app
    .route('/items')
    .get(getItems)
    .post(addItem)

// Start server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on port`, process.env.PORT || 3001)
})