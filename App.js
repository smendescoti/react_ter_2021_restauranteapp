import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import Delivery from './views/Delivery';
import Client from './views/Client';
import Account from './views/Account';
import Checkout from './views/Checkout';

//criando a StackNavigation
const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="delivery" component={Delivery} />
          <Stack.Screen name="client" component={Client} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="checkout" component={Checkout} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export default App;