import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'cubes',
    title: 'Estoque',
    subtitle: 'Cadastro de Produtos'
}

const baseUrl = 'http://localhost:3001/products'
const initialState = {
    product: {name:'', price:'', amount:''}, 
    list: []
}

export default class UserCrud extends Component{

    state = { ...initialState }
    
    componentWillMount(){
        axios(baseUrl).then(resp=>{
            this.setState({ list:resp.data })
        })
    }

    clear(){
        this.setState({ product: initialState.product })
    }

    save(){
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ product: initialState.product, list})
            })
    }

    getUpdatedList(product, add = true){
        const list = this.state.list.filter(u => u.id !== product.id)
        if(add) list.unshift(product)
        return list
        
    }

    updateField(event){
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="from-group">
                            <label>Nome do produto</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.product.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Nome do Produto "/>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="price"
                                value={this.state.product.price}
                                onChange= {e => this.updateField(e) }
                                placeholder="Preço"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Quantidade</label>
                                <input type="number"  className="form-control"
                                name="amount"
                                value={this.state.product.amount}
                                onChange = { e => this.updateField(e)}
                                placeholder="Quantidade"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={ e => this.save(e) }>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={ e => this.clear(e) }>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        
    render(){
        return (
          <Main { ...headerProps}>
            {this.renderForm()}
          </Main>
        )
    }
}
