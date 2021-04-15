import React from 'react';
import { View, Text, Image } from 'react-native';
import { Appbar, Modal, Portal, Button } from 'react-native-paper';
import * as services from '../services/restauranteServices';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            foto: '',
            nome: '',
            descricao: '',
            exibirModal: false
        }
    }

    componentDidMount() {
        services.getDadosRestaurante()
            .then(data => { this.setState({ ...data }); })
            .catch(e => { console.log(e.response); })
    }

    render() {

        var self = this;

        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content
                        title={self.state.nome}
                        titleStyle={{ fontSize: 14 }}
                        subtitle="Bem vindo ao aplicativo"
                    />
                    <Appbar.Action
                        style={{ marginRight: -4 }}
                        icon="home-outline"
                        onPress={() => self.props.navigation.navigate('home')}
                    />
                    <Appbar.Action
                        style={{ marginRight: -4 }}
                        icon="account-circle-outline"
                        onPress={() => self.props.navigation.navigate('client')}
                    />
                    <Appbar.Action
                        style={{ marginRight: -4 }}
                        icon="cart-outline"
                        onPress={() => self.props.navigation.navigate('delivery')}
                    />
                    <Appbar.Action
                        icon="information-outline"
                        onPress={() => self.setState({ exibirModal: true })}
                    />
                </Appbar.Header>
                <Portal>
                    <Modal
                        visible={self.state.exibirModal}
                        onDismiss={() => self.setState({ exibirModal: false })}
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            height: 400
                        }}
                    >

                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: 'contain'
                                }}
                                source={{
                                    uri: services.getApiUrl() + self.state.foto
                                }}
                            />

                            <Text style={{
                                fontSize: 16,
                                marginTop: 20,
                                marginBottom: 20
                            }}>
                                {self.state.descricao}
                            </Text>

                            <Button icon="close" mode="outlined"
                                onPress={() => self.setState({ exibirModal: false })}>
                                Fechar
                            </Button>
                        </View>

                    </Modal>
                </Portal>
            </View>
        )
    }
}

export default Header;