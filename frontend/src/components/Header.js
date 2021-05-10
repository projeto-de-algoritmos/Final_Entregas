import React, { } from 'react'

const Header = () => {
  return (
    <div className="row">
              
      <header>
        <div className="col-md-5">
          <nav className="navbar-default pull-left">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation" id="nav-toggle" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
          </nav>
          <div className="search">
            <div className="header-top">
              <button className="btn btn-primary" data-toggle="modal" data-target="#add_product">Novo Produto</button>
            </div>
          </div>
        </div>
      </header>
               
    </div>
  )
}

export default Header