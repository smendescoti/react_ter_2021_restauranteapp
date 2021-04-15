import React from 'react';
import { Alert, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import * as services from '../services/restauranteServices';

class FormCadastro extends React.Component {

    constructor(props) {
        super(props);

        //criando o state do componente..
        this.state = {
            nome: '',
            email: '',
            telefone: '',
            senha: '',
            senhaConfirmacao: '',
            erros: {
                nome: [],
                email: [],
                telefone: [],
                senha: [],
                senhaConfirmacao: []
            }
        }
    }

    cadastrarCliente() {

        //limpar as mensagens de erro de validação..
        this.setState({
            erros: {
                nome: [], email: [], telefone: [], senha: [], senhaConfirmacao: []
            }
        })

        services.postCliente(this.state)
            .then(
                data => {
                    Alert.alert(data.message);
                    this.setState({
                        nome: '',
                        email: '',
                        telefone: '',
                        senha: '',
                        senhaConfirmacao: ''
                    })
                }
            )
            .catch(
                e => {
                    var error = e.response;
                    switch (error.status) {
                        case 400:

                            //capturar as mensagens de validação obtidas..
                            var validacoes = error.data.errors;

                            //armazenar todas as mensagens de validação
                            //retornadas pela API..
                            this.setState({
                                erros: {
                                    nome: validacoes.Nome !== undefined ? validacoes.Nome : [],
                                    email: validacoes.Email !== undefined ? validacoes.Email : [],
                                    telefone: validacoes.Telefone !== undefined ? validacoes.Telefone : [],
                                    senha: validacoes.Senha !== undefined ? validacoes.Senha : [],
                                    senhaConfirmacao: validacoes.SenhaConfirmacao !== undefined ? validacoes.SenhaConfirmacao : []
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
                        title="Cadastro de Cliente"
                        subtitle="Preencha os campos para criar sua conta"
                    />
                    <Card.Content>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Nome do Cliente"
                                keyboardType="default"
                                autoCompleteType="name"
                                mode="outlined"
                                onChangeText={(nome) => self.setState({ nome })}
                                value={self.state.nome}
                            />
                            {
                                self.state.erros.nome.map(
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
                                label="Telefone"
                                keyboardType="phone-pad"
                                autoCompleteType="tel"
                                mode="outlined"
                                onChangeText={(telefone) => self.setState({ telefone })}
                                value={self.state.telefone}
                            />
                            {
                                self.state.erros.telefone.map(
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

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Confirme sua senha"
                                secureTextEntry={true}
                                keyboardType="default"
                                mode="outlined"                                
                                onChangeText={(senhaConfirmacao) => self.setState({ senhaConfirmacao })}
                                value={self.state.senhaConfirmacao}
                            />
                            {
                                self.state.erros.senhaConfirmacao.map(
                                    (msg, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {msg}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View>
                            <Button mode="contained"
                                onPress={() => self.cadastrarCliente()}>
                                Realizar Cadastro
                            </Button>
                        </View>

                        <View>
                            <Button mode="text"
                                onPress={() => self.props.navigation.navigate('client')}>
                                Acessar Conta
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
            </View>
        )
    }

}

export default FormCadastro;