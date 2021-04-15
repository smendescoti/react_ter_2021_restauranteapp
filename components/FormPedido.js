import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Card, Paragraph, Title, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cepServices from '../services/cepServices';
import * as helpers from '../helpers/formatCurrency';

class FormPedido extends React.Component {

    //construtor
    constructor(props) {
        super(props);

        this.state = {
            possuiEndereco: false,
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
        };
    }

    obterEndereco() {
        cepServices.getEndereco(this.state.cep)
            .then(
                data => {

                    if(!data.erro){
                        this.setState({
                            logradouro: data.logradouro,
                            complemento: data.complemento,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf,
                            possuiEndereco: true
                        })
                    }
                    else{
                        Alert.alert('Endereço não encontrado.');
                        this.setState({
                            cep: '',
                            possuiEndereco: false
                        })
                    }                    
                }
            )
            .catch(
                e => {
                    this.setState({
                        possuiEndereco: false
                    })
                }
            )
    }

    render() {

        var self = this;

        return (
            <View>
                <Card>
                    <Card.Title
                        title="Finalizar Pedido"
                        subtitle="Confirme os dados para realizar o pedido"
                    />
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Dados do Cliente:
                        </Text>

                        <Text>{self.props.cliente.nome}</Text>
                        <Text>{self.props.cliente.email}</Text>
                        <Text>Telefone: {self.props.cliente.telefone}</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
                            Itens do Pedido:
                        </Text>

                        {
                            self.props.items.map(
                                function (item, i) {
                                    return (
                                        <View key={i} style={{ marginTop: 10 }}>
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
                                    )
                                }
                            )
                        }

                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Title>Valor total: {helpers.formatCurrency(self.props.total)}</Title>
                            <Paragraph>Quantidade de itens: {self.props.quant}</Paragraph>
                        </View>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
                            Endereço de entrega:
                        </Text>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="CEP:"
                                keyboardType="number-pad"
                                mode="outlined"
                                onChangeText={(cep) => this.setState({ cep })}
                                value={this.state.cep}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="contained"
                                onPress={() => this.obterEndereco()}>
                                Obter Endereço
                            </Button>
                        </View>

                        {
                            self.state.possuiEndereco ? (
                                <View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                            Endereço de entrega:
                                        </Text>
                                        <Text>{self.state.logradouro}</Text>
                                        <Text>{self.state.bairro}</Text>
                                        <Text>{self.state.cidade}</Text>
                                        <Text>{self.state.estado}</Text>
                                    </View>

                                    <View style={{ marginBottom: 20 }}>
                                        <TextInput
                                            label="Numero:"
                                            keyboardType="default"
                                            mode="outlined"
                                            onChangeText={(numero) => this.setState({ numero })}
                                            value={this.state.numero}
                                        />
                                    </View>

                                    <View style={{ marginBottom: 20 }}>
                                        <TextInput
                                            label="Complemento:"
                                            keyboardType="default"
                                            mode="outlined"
                                            onChangeText={(complemento) => this.setState({ complemento })}
                                            value={this.state.complemento}
                                        />
                                    </View>

                                    <View style={{ marginBottom: 20 }}>
                                        <Button mode="contained">
                                            Confirmar Pedido
                                        </Button>
                                    </View>

                                </View>
                            ) : <View></View>
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
        quant: state.delivery.quantidadeItens,
        cliente: state.delivery.cliente
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        //TODO
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FormPedido);