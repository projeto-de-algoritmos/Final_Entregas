import React, { useState } from 'react'
import $ from 'jquery'

import { addProduct } from '../api/product'

const Modal = () => {
  const [identificador, setIdentificador] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [state, setState] = useState('')
  const [deliverDate, setDeliverDate] = useState('')

  const closeProductModal = () => {
    $('#add_product').modal('hide')

    setIdentificador('')
    setDescription('')
    setCompany('')
    setState('')
    setDeliverDate('')
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()

    const product = {
      identificador: parseInt(identificador),
      description,
      company,
      state,
      deliverDate,
    }

    const response = await addProduct(product)

    if (response.status === 201) {
      closeProductModal()
      window.location.reload()
    } else {
      console.log(response.status)
    }
  }

  return (
    <div id="add_product" className="modal fade" data-backdrop="static" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={closeProductModal} type="button" className="close">×</button>
            <h4 className="modal-title">Adicionar Produto</h4>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="number"
                  value={identificador}
                  placeholder="Identificador do produto"
                  className="form-control"
                  name="product_id"
                  onChange={e => setIdentificador(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={description}
                  placeholder="Descrição do produto"
                  className="form-control"
                  name="product_description"
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={company}
                  placeholder="Empresa"
                  className="form-control"
                  name="product_company"
                  onChange={e => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={state}
                  placeholder="Estado"
                  className="form-control"
                  name="product_state"
                  onChange={e => setState(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  value={deliverDate}
                  placeholder="Data de Entrega"
                  className="form-control"
                  name="product_deliver_date"
                  onChange={e => setDeliverDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeProductModal} type="button" className="btn btn-black">Cancelar</button>
              <button type="submit" className="btn btn-danger">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
