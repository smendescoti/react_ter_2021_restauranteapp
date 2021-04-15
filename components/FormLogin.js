import React from 'react';
import { Alert, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import * as services from '../services/restauranteServices';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthUser } from '../actions/deliveryActions';

class FormLogin extends React.Component {

    //construtor
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: '',
            erros: {
                email: [],
                senha: []
            }
        }
    }

    componentDidMount() {

        if(this.props.accessToken != '' && this.props.quantidade > 0){
            this.props.navigation.navigate('checkout');
        }

    }

    autenticarCliente() {

        this.setState({
            erros: {
                email: [], senha: []
            }
        });

        services.postLogin(this.state)
            .then(
                data => {

                    //disparando a action de autenticação..
                    var actionData = {
                        accessToken: data.accessToken,
                        dataExpiracao: data.dataExpiracao,
                        cliente: data.cliente
                    }

                    this.props.AuthUser(actionData);

                    this.props.navigation.navigate('checkout');
                }
            )
            .catch(
                e => {
                    var error = e.response;

                    switch (error.status) {
                        case 400:

                            var validacoes = error.data.errors;

                            this.setState({
                                erros: {
                                    email: validacoes.Email !== undefined ? validacoes.Email : [],
                                    senha: validacoes.Senha !== undefined ? validacoes.Senha : []
                                }
                            });

                            break;
                        case 500:
                            Alert.alert(error.data.message);
                            break;
                    }
                }
            )
    }

    render() {

        var self = this;

        return (
            <View>
                <Card>
                    <Card.Title
                        title="Autenticação de Cliente"
                        subtitle="Informe seus dados para acessar sua conta"
                    />
                    <Card.Content>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Email de Acesso"
                                keyboardType="email-address"
                                autoCompleteType="email"
                                mode="outlined"
                                onChangeText={(email) => self.setState({ email })}
                                value={self.state.email}
                            />
                            {
                                self.state.erros.email.map(
                                    (msg, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {msg}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Senha de Acesso"
                                secureTextEntry={true}
                                keyboardType="default"
                                mode="outlined"
                                onChangeText={(senha) => self.setState({ senha })}
                                value={self.state.senha}
                            />
                            {
                                self.state.erros.senha.map(
                                    (msg, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {msg}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View>
                            <Button mode="contained" icon="account-circle"
                                onPress={() => self.autenticarCliente()}>
                                Acessar Conta
                            </Button>
                        </View>

                        <View>
                            <Button mode="text"
                                onPress={() => self.props.navigation.navigate('account')}>
                                Crie sua Conta
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken : state.delivery.accessToken,
        quantidade : state.delivery.quantidadeItens
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        AuthUser //ACTION para autenticação de usuario
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);