import React, { useState } from 'react' 

import $ from 'jquery' 

const Modal = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const closeProductModal = () => {
        $('#add_product').modal('hide') 

        setName('')
        setDescription('')
    }

    return (
        <div id="add_product" className="modal fade" data-backdrop="static" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={closeProductModal} type="button" className="close">×</button>
                        <h4 className="modal-title">Adicionar Produto</h4>
                    </div>
                    <form onSubmit={() => {}}>
                        <div className="modal-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Nome do produto"
                                    className="form-control"
                                    name="product_name"
                                    onChange={ e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={description}
                                    placeholder="Descrição"
                                    className="form-control"
                                    onChange={ e => setDescription(e.target.value)}
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
