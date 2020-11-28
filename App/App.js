import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetUsers from './screens/list-users/list-users'
import CreateUser from './screens/create-user/create-user'
import DetailUser from './screens/detail-user/detail-user';
import UpdateUser from './screens/update-user/update-user';
import Home from './screens/home/home';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0288D1" barStlye="light-content" />
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#03A9F4"
        },
        headerTintColor: "#fff"
      }}>
        <Stack.Screen name="S&E" component={Home} />
        <Stack.Screen name="All appointments" component={GetUsers} />
        <Stack.Screen name="Create an appointment" component={CreateUser} />
        <Stack.Screen name="Information of the patiente" component={DetailUser} />
        <Stack.Screen name="Update Data" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
