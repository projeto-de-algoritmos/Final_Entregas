import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Modal from '../../components/Modal'
import { ReactComponent as Map } from '../../assets/img/map.svg'

import { getRoutes } from '../../api/product'
import { drawRoute } from '../../utils/drawRoute'

const options = [
  { label: 'Norte', value: 1 },
  { label: 'Nordeste', value: 2 },
  { label: 'Centro-Oeste', value: 3 },
  { label: 'Sudeste', value: 4 },
  { label: 'Sul', value: 5 },
]

const Rotas = () => {
  const [routes, setRoutes] = useState({})
  const [filter, setFilter] = useState(options[0])

  const history = useHistory()
  const query = queryString.parse(window.location.search)

  const getMapRoute = (routes, route) => {
    drawRoute(routes[route])
  }

  useEffect(() => {
    if (routes[1]) {
      getMapRoute(routes, filter.value)
    }
  }, [routes, filter.value])

  useEffect(() => {
    if (!query.organizado) {
      const alert = window.confirm(
        'Organize as entregas em Caminhões antes de ver as Rotas.'
      )

      if (alert === true) {
        history.push('/caminhoes')
      } else {
        history.push('/caminhoes')
      }
    }
  }, [history, query.organizado])

  useEffect(() => {
    (async () => {
      const { status, body } = await getRoutes()
      if (status === 200) setRoutes(body)
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
                          {options.map((option) => (
                            <a
                              key={option.value}
                              onClick={() => setFilter(option)}
                              href={`#${option.label}`}
                            >
                              {option.label}
                            </a>
                          ))}
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
