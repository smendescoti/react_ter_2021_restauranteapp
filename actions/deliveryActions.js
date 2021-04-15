/*
    ACTIONS utilizadas para disparar eventos no REDUX
    são compostas de 2 atributos:
    type (nome da action)
    data (dados passados para a action)
*/

export const ADD_ITEM = "add_item";
export const REMOVE_ITEM = "remove_item";
export const AUTH_USER = "auth_user";

//função para encapsular a action ADD_ITEM
export const AddItem = (item) => (
    {
        type : ADD_ITEM, //nome da ação
        data : item //dados da ação
    }
)

//função para encapsular a action REMOVE_ITEM
export const RemoveItem = (item) => (
    {
        type : REMOVE_ITEM,
        data : item
    }
)

//função para executar a action AUTH_USER
export const AuthUser = (item) => (
    {
        type : AUTH_USER,
        data : item
    }
)