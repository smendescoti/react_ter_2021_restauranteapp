import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

//configurando o REACT-REDUX
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import devToolsEnhancer from 'remote-redux-devtools';

import deliveryReducer from './reducers/deliveryReducer';

//configuração para utilizar o react-devtools
if(__DEV__){
    //'react-devtools' -> script registrado no package.json
    require('react-devtools');
}

//registrando todos os reducers do projeto
const rootReducer = combineReducers({
    delivery : deliveryReducer //registrando o reducer..
});

//criando a store!
const store = createStore(rootReducer, devToolsEnhancer());

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#bf360c',
        secondary: '#ff5722'
    }
};

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
