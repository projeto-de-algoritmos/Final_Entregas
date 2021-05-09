import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../assets/img/logo.png'

const SideBar = (props) => {
  const nav = props.nav

  return (
    <div className="col-md-2 col-sm-1 col-xs-1 display-table-cell v-align box" id="navigation">

      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="entregas_logo" title="Voltar para o site" className="img-logo"/>
        </Link>
      </div>

      <div className="admin-bar">
        <ul>
          <li className={nav === "armazem" ? "active" : null}>
            <Link to="/">
              <i className="fa fa-cubes" aria-hidden="true"></i>
              <span className="hidden-xs">Armazém</span>
            </Link>
          </li>
          <li className={nav === "caminhoes" ? "active" : null}>
            <Link to="/caminhoes">
              <i className="fa fa-truck-moving" aria-hidden="true"></i>
              <span className="hidden-xs">Caminhões</span>
            </Link>
          </li>
          <li className={nav === "rotas" ? "active" : null}>
            <Link to="/rotas">
              <i className="fa fa-route" aria-hidden="true"></i>
              <span className="hidden-xs">Rotas de caminhões</span>
            </Link>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default SideBar