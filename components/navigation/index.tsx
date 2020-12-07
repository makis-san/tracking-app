import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';


const App = createStackNavigator();
const Tab = createBottomTabNavigator();

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
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'map';
                    let style: any;
                    switch(route.name) {
                        case 'Encomendas':
                            iconName = 'map';
                            break;
                        case 'Arquivo':
                            iconName = 'archive';
                            break;
                        case 'AddParcel':
                            iconName = 'plus-circle';
                            color = '#fff';
                            size = 32;
                            style = {
                                backgroundColor: '#434994',
                                borderRadius: 50,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                padding: 10,
                                marginTop: 11
                            };
                            break;
                    }
                return <Feather style={style} name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#434994',
                inactiveTintColor: 'gray',
            }}
            >

                <Tab.Screen name="Encomendas" component={MainScreen} />
                <Tab.Screen name="AddParcel" component={AddParcel} options={{tabBarVisible: false, title: ''}} />
                <Tab.Screen name="Arquivo" component={ArchivedScreen}/>

                {/* <Tab.Screen name="Settings" component={} /> */}
            </Tab.Navigator>
    );
}

export default function Main() {
    return(
        <NavigationContainer>
            <App.Navigator initialRouteName={"App"} screenOptions={{headerStyle: {backgroundColor: '#434994'}, headerTintColor:'#fff'}}>
                <App.Screen name="App" component={Tabs} options={{headerShown: false}}/>
                <App.Screen name="Details" component={Details} options={({ route = useRoute() }:any) => ({ title: route?.params?.title+ ' ['+route?.params?.carrier+']' })}/>
            </App.Navigator>
        </NavigationContainer>
    );
}