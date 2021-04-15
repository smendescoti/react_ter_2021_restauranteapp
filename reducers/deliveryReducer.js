import { Alert } from 'react-native';
import * as actions from '../actions/deliveryActions';

//definindo os dados que o reducer irá
//gravar (escrever) na store..
const initialState = {
    cestaDeCompras: [], //itens selecionados no delivery
    valorTotal: 0, //somatorio dos preços dos itens
    quantidadeItens: 0, //somatorio da quantidade de itens
    accessToken: '',
    dataExpiracao: '',
    cliente: {
        nome: '',
        email: '',
        telefone: ''
    }
};

//declarando o reducer
const deliveryReducer = (
    state = initialState, //dados do state
    action //ação que está sendo disparada pelos componentes
) => {

    switch (action.type) {

        case actions.ADD_ITEM:

            var itemJaAdicionado = false;

            //verificando se o item adicionado ja existe na cesta de compras
            for (var i = 0; i < state.cestaDeCompras.length; i++) {
                var item = state.cestaDeCompras[i];
                if (item.id == action.data.id) {
                    ++item.quantidade;
                    itemJaAdicionado = true;
                    break;
                }
            }

            //incluir o item pela 1º vez na cesta de compras
            if (!itemJaAdicionado) {
                var item = action.data;
                item.quantidade = 1;
                state.cestaDeCompras.push(item);
            }

            //modificando o conteudo do state..
            return {
                ...state,
                valorTotal: (new Number(state.valorTotal) + new Number(action.data.precoDecimal)),
                quantidadeItens: (state.quantidadeItens + 1)
            };

        case actions.REMOVE_ITEM:

            //percorrer a cesta de compras e remover 1 unidade do item
            for (var i = 0; i < state.cestaDeCompras.length; i++) {
                var item = state.cestaDeCompras[i];
                if (item.id == action.data.id) {
                    --item.quantidade;
                    break;
                }
            }

            //obtendo todos os itens da cesta de compras que possuem
            //quantidade = 0 e remove-los da cesta..
            //filtrando todos os produtos da cesta compras com quantidade > 0
            const items = state.cestaDeCompras.filter((i) => i.quantidade > 0);

            return {
                ...state,
                cestaDeCompras: items,
                valorTotal: (new Number(state.valorTotal) - new Number(action.data.precoDecimal)),
                quantidadeItens: (state.quantidadeItens - 1)
            };

        case actions.AUTH_USER:

            return {
                ...state,
                accessToken: action.data.accessToken,
                dataExpiracao: action.dataExpiracao,
                cliente: action.data.cliente,
            }

        default:
            //TODO
            return state;
    }
}

export default deliveryReducer;