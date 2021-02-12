import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <React.Fragment>
        <Link to='/'>
            <i className="fa fa-home"></i> Início
        </Link>
        <Link to="/users">
            <i className="fa fa-users"></i> Usuários
        </Link>
        <Link to="/products">
            <i className="fa fa-cubes"></i> Estoque
        </Link>
    </React.Fragment>
