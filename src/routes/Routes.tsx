import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import Home from '../views/Home';
import Detail from '../views/Detail';
import Search from '../views/Search';

const Stack = createNativeStackNavigator<RootStackParams>();
const routeScreenOptions = {
  headerStyle: {
    backgroundColor: 'rgba(7,26,93,255)',
  },
  headerTitleStyle: {
    color: '#fff',
  },
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={routeScreenOptions}>
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
