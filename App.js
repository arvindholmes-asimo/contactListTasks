import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Choice from './src/Choice';
import Contact from './src/Contact';
import FavouriteList from './src/Favourite';
import { ContextProvider } from './src/Context';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Choice" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Choice" component={Choice} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="FavouriteList" component={FavouriteList} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
