import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import CestaDeCompras from '../components/CestaDeCompras';

class Delivery extends React.Component {

    render() {

        var self = this;

        return (
            <ScrollView>
                <View>
                    <Header
                        navigation={self.props.navigation}
                    />
                    <CestaDeCompras
                        navigation={self.props.navigation}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default Delivery;
