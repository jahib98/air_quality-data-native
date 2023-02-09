import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListData from "./src/screens/ListData";
import ListDataDetails from "./src/screens/ListDataDetails";
import DataContextProvider from "./src/context/DataContext";
import {NativeBaseProvider} from "native-base";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <NativeBaseProvider>
          <DataContextProvider>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen name="ListData" component={ListData} />
          <Stack.Screen name="ListDataDetails" component={ListDataDetails} />
        </Stack.Navigator>
          </DataContextProvider>
          </NativeBaseProvider>
      </NavigationContainer>
  );
};

export default App;