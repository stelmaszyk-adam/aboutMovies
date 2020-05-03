/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/views/HomeScreen"
import DetailsScreen from "./src/views/DetailsScreen"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: 'About Movies' }}
          component={HomeScreen} />
        <Stack.Screen
          name="Details"
          options={{ title: 'Details' }}
          component={DetailsScreen}
          initialParams={
            {
              movieId: "error",
            }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;