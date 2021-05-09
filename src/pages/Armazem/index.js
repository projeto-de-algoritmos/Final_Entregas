import React from 'react'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

const Armazem = () => {
  return(
    <section className="dashboard">
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar nav="armazem"/>
           
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
                          <span>Organizar:</span> Nome
                        </button>
                        <div className="dropdown-menu">
                          <a href="#">ID</a>
                          <a href="#">Empresa</a>
                          <a href="#">Cidade</a>
                          <a href="#">Data</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col" className="hidden-xs">Empresa</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">Data de Entrega</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={6}>
                            <th scope="row">12234</th>
                            <td>TV 2 polegadas</td>
                            <td className="hidden-xs">Britânia</td>
                            <td>São Paulo</td>
                            <td>25/09/2051</td>
                          </tr>
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
