import React from 'react';
import { Provider } from 'react-redux';
import { ReduxNetworkProvider } from 'react-native-offline';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store';
import Home from './screens/Home';
import Map from './screens/Map';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxNetworkProvider>
    </Provider>
  );
};

export default App;
