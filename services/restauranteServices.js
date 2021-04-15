import axios from 'axios';

export const getApiUrl = () => {
    return 'http://apirestaurante-001-site1.itempurl.com';
}

export const getCategorias = () => {
    return axios.get(getApiUrl() + "/api/categorias")
        .then(
            response => {
                return response.data;
            }
        )
}

export const getDadosRestaurante = () => {
    return axios.get(getApiUrl() + "/api/restaurante")
        .then(
            response => {
                return response.data;
            }
        )
}

export const getCardapio = (idCategoria) => {

    var resource = '/api/cardapio';
    if(idCategoria > 0)
        resource += "/" + idCategoria;

    return axios.get(getApiUrl() + resource)
        .then(
            response => {
                return response.data;
            }
        )
}

export const postCliente = (cliente) => {
    return axios.post(getApiUrl() + '/api/cliente', cliente)
        .then(
            response => {
                return response.data;
            }
        )
}

export const postLogin = (data) => {
    return axios.post(getApiUrl() + "/api/login", data)
        .then(
            response => {
                return response.data;
            }
        )
}