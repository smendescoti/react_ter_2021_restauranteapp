import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddItem, RemoveItem } from '../actions/deliveryActions';
import * as helpers from '../helpers/formatCurrency';

class CestaDeCompras extends React.Component {

    render() {

        var self = this.props;

        return (
            <View>

                <Card>
                    <Card.Title
                        title="Cesta de Compras"
                        subtitle="Produtos selecionados no delivery"
                    />
                    <Card.Content>

                        {
                            self.items.map(
                                function (item, i) {
                                    return (
                                        <View key={i}>
                                            <Card>
                                                <Card.Content>
                                                    <View>
                                                        <Text style={{ fontWeight: 'bold' }}>
                                                            {item.nome}
                                                        </Text>
                                                        <Text>
                                                            Preço (unidade): {item.preco}
                                                        </Text>
                                                        <Text>
                                                            Quantidade: {item.quantidade}
                                                        </Text>
                                                    </View>
                                                </Card.Content>
                                                <Card.Actions>
                                                    <Button icon="plus" mode="text"
                                                        onPress={
                                                            () => self.AddItem(item)
                                                        }
                                                    >
                                                    Adicionar        
                                                    </Button>
                                                    <Button icon="minus" mode="text"
                                                        onPress={
                                                            () => self.RemoveItem(item)
                                                        }
                                                    >
                                                    Remover
                                                    </Button>
                                                </Card.Actions>
                                            </Card>
                                        </View>

                                    )
                                }
                            )
                        }

                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Title>Valor Total: {helpers.formatCurrency(self.total)}</Title>
                            <Paragraph>Quantidade de itens: {self.quant}</Paragraph>
                        </View>

                        {
                            self.quant > 0 ? (
                                <View style={{ marginTop: 20 }}>
                                    <Button mode="contained" icon="cart-outline"
                                        onPress={() => this.props.navigation.navigate('client')}>
                                        Finalizar Pedido
                                    </Button>
                                </View>
                            ) : (
                                <View></View>
                            )

                        }

                    </Card.Content>
                </Card>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.delivery.cestaDeCompras,
        total: state.delivery.valorTotal,
        quant: state.delivery.quantidadeItens
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        AddItem, RemoveItem
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CestaDeCompras);
