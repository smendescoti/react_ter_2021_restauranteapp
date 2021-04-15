import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import Cardapio from '../components/Cardapio';

class Home extends React.Component {

    render() {

        var self = this;

        return (
            <ScrollView>
                <View>
                    <Header
                        navigation={self.props.navigation}
                    />
                    <Cardapio/>
                </View>
            </ScrollView>
        )
    }

}

export default Home;
