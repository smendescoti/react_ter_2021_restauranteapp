import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import FormPedido from '../components/FormPedido';

class Checkout extends React.Component {

    render() {

        var self = this;

        return (
            <ScrollView>
                <View>
                    <Header
                        navigation={self.props.navigation}
                    />
                    <FormPedido
                        navigation={self.props.navigation}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default Checkout;
