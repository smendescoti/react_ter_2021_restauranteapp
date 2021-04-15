import React from 'react';
import { Alert, Text, View } from 'react-native';
import * as services from '../services/restauranteServices';
import { Button, Card, Paragraph, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { AddItem } from '../actions/deliveryActions';
import { bindActionCreators } from 'redux';
import { Picker } from '@react-native-community/picker';
import * as helpers from '../helpers/formatCurrency';

class Cardapio extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            cardapio: [], //armazenar todos os itens (todos ou por categoria)
            cardapio_filtro : [], //resultado do filtro feito pelo searchbar
            categorias: [],
            idCategoria : 0,
            filtro : ''
        };

        //bind.. funções que acessam o state do componente
        this.selecionarCategoria = this.selecionarCategoria.bind(this);
        this.filtrarItens = this.filtrarItens.bind(this);
    }

    //função executada antes do componente ser renderizado
    componentDidMount() {
        this.consultarCardapio(0);
        this.consultarCategorias();
    }

    //função para capturar a categoria selecionada
    selecionarCategoria(idCategoria) {
        this.consultarCardapio(idCategoria);
        this.setState({ idCategoria });
    }

    //função para filtrar os itens do cardapio
    filtrarItens(value) {

        var dados = this.state.cardapio //todos os itens
            .filter((i) => i.nome.toLowerCase()
            .includes(value.toLowerCase()));

        this.setState({
            filtro : value,
            cardapio_filtro : dados
        });
    }

    consultarCardapio(idCategoria) {
        services.getCardapio(idCategoria)
            .then(data => { this.setState({ cardapio: data, cardapio_filtro : data }); })
            .catch(e => { console.log(e.response); })
    }

    consultarCategorias() {
        services.getCategorias()
            .then(data => { this.setState({ categorias: data }); })
            .catch(e => { console.log(e.response); })
    }

    //função para adicionar 1 item na cesta de compras
    //disparar a ACTION 'AddItem'
    adicionarItem(item) {

        //disparando a ACTION
        this.props.AddItem(item);

        Alert.alert(item.nome + ', adicionado com sucesso.');
    }

    render() {

        var self = this;

        return (
            <View>
                {
                    self.props.total > 0 ? (
                        <View style={{
                            alignItems: 'center',
                            backgroundColor: '#bf360c'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 10,
                                color: '#fff'
                            }}>
                                Total do Pedido: {helpers.formatCurrency(self.props.total)}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )
                }
                <Card style={{ backgroundColor: '#eee' }}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Conheça nosso cardápio
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Selecione os itens e faça o seu pedido!
                        </Text>
                    </Card.Content>
                </Card>
                <View style={{ backgroundColor: '#fff' }}>
                    <Picker style={{ fontSize: 16 }}
                        selectedValue={self.state.idCategoria}
                        onValueChange={
                            (itemValue, itemIndex) => self.selecionarCategoria(itemValue)
                        }
                    >
                        <Picker.Item label="Todas as categorias" value="0" />
                        {
                            self.state.categorias.map(
                                function(item, i){
                                    return(
                                        <Picker.Item 
                                            key={i}
                                            label={item.nome} 
                                            value={item.id}                                             
                                        />
                                    )
                                }
                            )
                        }
                    </Picker>
                    <Searchbar
                        style={{ fontSize: 16 }}
                        placeholder="Pesquisar Item"
                        onChangeText={self.filtrarItens}
                        value={self.state.filtro}
                    />
                </View>
                {
                    self.state.cardapio_filtro.map(
                        function (item, i) {
                            return (
                                <View key={i}>
                                    <Card style={{
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}>
                                        <Card.Title
                                            title={item.nome}
                                            titleStyle={{
                                                fontSize: 20
                                            }}
                                            subtitle={item.preco}
                                            subtitleStyle={{
                                                fontSize: 16
                                            }}
                                        />
                                        <Card.Content>
                                            <Text style={{
                                                fontSize: 16, fontWeight: 'bold'
                                            }}>
                                                {item.categoria.nome}
                                            </Text>
                                            <Paragraph style={{
                                                marginBottom: 20
                                            }}>
                                                {item.descricao}
                                            </Paragraph>
                                        </Card.Content>
                                        <Card.Cover
                                            source={{
                                                uri: services.getApiUrl() + item.foto
                                            }}
                                        />
                                        <Card.Actions>
                                            <Button icon="cart-outline"
                                                style={{ fontWeight: 'bold' }}
                                                onPress={() => self.adicionarItem(item)}>
                                                Adicionar ao pedido
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                </View>
                            )
                        }
                    )
                }
            </View>
        )
    }
}

//função para ler dados gravados na STORE (subscrible)
const mapStateToProps = (state) => {
    return {
        //ler o valor total do carrinho de compras no state
        total : state.delivery.valorTotal
    }
}

//função para disparar ACTIONS que irão ativar os reducers
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ //disparar ações no componente..
        //declarando as ACTIONS que o componente poderá disparar
        //dessa forma as actions poderão ser acessadas como propriedades
        //do componente, Ex: this.props.addItem(..)
        AddItem
    }, dispatch)
)

//conectando o componente ao REACT-REDUX..
export default connect(mapStateToProps, mapDispatchToProps)(Cardapio);