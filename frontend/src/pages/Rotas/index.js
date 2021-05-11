import React, { useEffect, useState } from 'react'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'
import { ReactComponent as Map } from '../../assets/img/map.svg'

import { getRoutes } from '../../api/product'
import { drawRoute } from '../../utils/drawRoute'

const options = [
  { label: 'Norte', value: 0 },
  { label: 'Nordeste', value: 1 },
  { label: 'Centro-Oeste', value: 2 },
  { label: 'Sudeste', value: 3 },
  { label: 'Sul', value: 4 },
]

const Rotas = () => {
  const [routes, setRoutes] = useState({})
  const [filter, setFilter] = useState(options[0])

  const getMapRoute = (routes, route) => {
    drawRoute(routes[route])
  }

  const handleFilter = (option) => {
    setFilter(option)
    getMapRoute(routes, option.value)
  }

  useEffect(() => {
    (async () => {
      const { status, body } = await getRoutes()
      if (status === 200) {
        setRoutes(body)
        getMapRoute(body, 0)
      }
    })()
  }, [])

  return (
    <section className="dashboard">
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar nav="rotas" />

          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <Header />

            <div className="user-dashboard">
              <h1>Rotas</h1>
              <div id="info-div"></div>

              <div className="row">
                <div className="col-md-10 col-xs-12">
                  <div className="card">
                    <div className="card-header">
                      <h2>Navegação por Estados</h2>

                      <div className="btn-group">
                        <button
                          className="btn btn-secondary btn-lg dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>Caminhão:</span> {filter.label}
                        </button>
                        <div className="dropdown-menu">
                          {options.map((option) => {
                            if (option.value !== filter.value) {
                              return (
                                <a
                                  key={option.value}
                                  onClick={() => handleFilter(option)}
                                  href={`#${option.label}`}
                                >
                                  {option.label}
                                </a>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className='map-area'>
                        <Map key={filter.value} height={800} width={800} />
                      </div>
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

export default Rotas
