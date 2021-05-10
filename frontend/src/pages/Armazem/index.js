import React, { useEffect, useState } from 'react'
import moment from 'moment'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

import { getProducts } from '../../api/product'

const columns = [
  { label: 'Identificador', value: 'identificador' },
  { label: 'Descrição', value: null },
  { label: 'Empresa', value: 'empresa' },
  { label: 'Estado', value: 'estado' },
  { label: 'Data de Entrega', value: 'dataEntrega' },
]

const Armazem = () => {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState(columns[0])
  const [order, setOrder] = useState('crescente')

  const getSortIcon = (type) => {
    if (filter.value === type.value) {
      if (order === 'crescente') {
        return 'fa-sort-up'
      } else if (order === 'decrescente') {
        return 'fa-sort-down'
      }
    }
    return 'fa-sort'
  }

  const handleFilter = (type) => {
    if (filter.value === type.value) {
      if (order === 'crescente') {
        setOrder('decrescente')
      } else if (order === 'decrescente') {
        setOrder('crescente')
      }
    }
    setFilter(type)
  }

  useEffect(() => {
    (async () => {
      const params = {
        filterBy: filter.value,
        order: order,
        porPagina: 10,
        pagina: 1,
      }

      const { status, body } = await getProducts(params)
      if (status === 200) setProducts(body)
    })()
  }, [filter, order])

  return (
    <section className="dashboard">
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar nav="armazem" />

          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <Header />

            <div className="user-dashboard">
              <h1>Armazém</h1>
              <div id="info-div"></div>

              <div className="row">
                <div className="col-md-10 col-xs-12">
                  <div className="card">
                    <div className="card-header">
                      <h2>Produtos para Entrega</h2>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            {columns.map((column) => {
                              if (!column.value) {
                                return (
                                  <th key={column.label} scope="col">
                                    {column.label}
                                  </th>
                                )
                              }
                              return (
                                <th key={column.value} scope="col">
                                  <a href={`#${column.value}`} onClick={() => handleFilter(column)}>
                                    {column.label}
                                    <i id="icon" className={`fa ${getSortIcon(column)}`} />
                                  </a>
                                </th>
                              )
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product.identificador}>
                              <th scope="row">{product.identificador}</th>
                              <td>{product.descricao}</td>
                              <td className="hidden-xs">{product.empresa}</td>
                              <td>{product.estado}</td>
                              <td>{moment(new Date(product.dataEntrega)).format('DD/MM/YY')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="modals">
        <Modal />
      </div>

    </section>
  )
}

export default Armazem
