import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import FormCadastro from '../components/FormCadastro';

class Account extends React.Component {

    render() {

        var self = this;

        return (
            <ScrollView>
                <View>
                    <Header
                        navigation={self.props.navigation}
                    />
                    <FormCadastro
                        navigation={self.props.navigation}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default Account;
