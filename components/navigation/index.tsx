import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';


const App = createStackNavigator();
const Tab = createMaterialTopTabNavigator ();

/*
* Screens
*/

import MainScreen from '../../screens/MainScreen';
import ArchivedScreen from '../../screens/Archived';
import AddParcel from '../../screens/AddParcel';
import Details from '../../screens/Details';


const Tabs = () => {
    return(
            <Tab.Navigator
            initialRouteName={'Encomendas'}
            tabBarPosition={'bottom'}
            swipeEnabled={false}
            tabBarOptions={{
                pressColor:'#434994',
                activeTintColor:'#434994',
                inactiveTintColor:'gray',
                labelStyle: { fontSize: 12 },
                showIcon: true
              }}
             
            >

                <Tab.Screen name="Encomendas" component={MainScreen} 
                    options={{
                        tabBarIcon: ({color}) => (<Feather name={'package'} size={24} color={color}></Feather>)
                    }}
                />
                <Tab.Screen name="Arquivo" component={ArchivedScreen}
                    options={{
                        tabBarIcon: ({color}) => (<Feather name={'archive'} size={24} color={color}></Feather>)
                    }}
                />

                {/* <Tab.Screen name="Settings" component={} /> */}
            </Tab.Navigator>
    );
}

export default function Main() {
    return(
        <NavigationContainer>
            <App.Navigator initialRouteName={"App"} screenOptions={{headerStyle: {backgroundColor: '#434994'}, headerTintColor:'#fff'}}>
                <Tab.Screen name="AddParcel" component={AddParcel} options={{title: 'Adicionar Encomenda'}}/>
                <App.Screen name="App" component={Tabs} options={{headerShown: false}}/>
                <App.Screen name="Details" component={Details} options={({ route = useRoute() }:any) => ({ title: route?.params?.title+ ' ['+route?.params?.carrier+']' })}/>
            </App.Navigator>
        </NavigationContainer>
    );
}