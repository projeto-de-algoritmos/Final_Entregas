import React, { useEffect, useState } from 'react'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

import { prepareProducts } from '../../api/product'

const Caminhao = () => {
  const [products, setProducts] = useState([])

  const [truck1, setTruck1] = useState([])
  const [truck2, setTruck2] = useState([])
  const [truck3, setTruck3] = useState([])
  const [truck4, setTruck4] = useState([])
  const [truck5, setTruck5] = useState([])

  const manageTrucks = () => {
    const time = 1000

    products.forEach((product, i) => {
      if (product.caminhao === 1) {
        setTimeout(() => {
          setTruck1([...truck1, product])
        }, i * time)
      } else if (product.caminhao === 2) {
        setTimeout(() => {
          setTruck2([...truck2, product])
        }, i * time)
      } else if (product.caminhao === 3) {
        setTimeout(() => {
          setTruck3([...truck3, product])
        }, i * time)
      } else if (product.caminhao === 4) {
        setTimeout(() => {
          setTruck4([...truck4, product])
        }, i * time)
      } else if (product.caminhao === 5) {
        setTimeout(() => {
          setTruck5([...truck5, product])
        }, i * time)
      }

      setTimeout(() => {
        products.shift()
      }, i * time)
    })
  }

  useEffect(() => {
    (async () => {
      const { status, body } = await prepareProducts()
      if (status === 200) setProducts(body)
    })()
  }, [])

  return (
    <section className="dashboard">
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar nav="caminhoes" />

          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <Header />

            <div className="user-dashboard">
              <h1>Caminhões</h1>
              <div id="info-div"></div>

              <div className="row">
                <div className="col-xs-12">
                  <div className="card">
                    <div className="card-header">
                      <h2>Gerenciamento de Entregas</h2>
                    </div>
                    <div className="card-body">
                      <div className='manage-trucks'>
                        <button type="button" onClick={manageTrucks} className="btn btn-primary">
                          Organizar entregas
                        </button>
                      </div>

                      <div className="trucks">
                        <div className="truck">
                          <div className="products">
                            {truck1.map(product => (
                              <p key={product.identificador}>{product.descricao}</p>
                            ))}
                          </div>
                        </div>
                        <div className="truck">
                          <div className="products">
                            {truck2.map(product => (
                              <p key={product.identificador}>{product.descricao}</p>
                            ))}
                          </div>
                        </div>
                        <div className="truck">
                          <div className="products">
                            {truck3.map(product => (
                              <p key={product.identificador}>{product.descricao}</p>
                            ))}
                          </div>
                        </div>
                        <div className="truck">
                          <div className="products">
                            {truck4.map(product => (
                              <p key={product.identificador}>{product.descricao}</p>
                            ))}
                          </div>
                        </div>
                        <div className="truck">
                          <div className="products">
                            {truck5.map(product => (
                              <p key={product.identificador}>{product.descricao}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product.identificador}>
                              <th scope="row">{product.descricao}</th>
                              <td>{product.estado}</td>
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

export default Caminhao
