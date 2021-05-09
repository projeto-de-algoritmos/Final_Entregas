import React, { useEffect, useState } from 'react'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

import { getProducts } from '../../api/product'

const Armazem = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const { status, body } = await getProducts({})
      if (status === 200) setProducts(body)
    })()
  }, [])

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
                      <h2>Para Entrega</h2>

                      <div className="btn-group">
                        <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span>Organizar:</span> Descrição
                        </button>
                        <div className="dropdown-menu">
                          <a href="#">Identificador</a>
                          <a href="#">Empresa</a>
                          <a href="#">Estado</a>
                          <a href="#">Data de Entrega</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Identificador</th>
                            <th scope="col">Descrição</th>
                            <th scope="col" className="hidden-xs">Empresa</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Data de Entrega</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product.identificador}>
                              <th scope="row">{product.identificador}</th>
                              <td>{product.descricao}</td>
                              <td className="hidden-xs">{product.empresa}</td>
                              <td>{product.estado}</td>
                              <td>{product.dataEntrega}</td>
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
