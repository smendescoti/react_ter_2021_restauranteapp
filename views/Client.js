import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import FormLogin from '../components/FormLogin';

class Client extends React.Component {

    render() {

        var self = this;

        return (
            <ScrollView>
                <View>
                    <Header
                        navigation={self.props.navigation}
                    />
                    <FormLogin
                        navigation={self.props.navigation}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default Client;
