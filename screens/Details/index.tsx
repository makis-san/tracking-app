import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import { _retrieveData } from '../../services/parcels/functions';
import { Div, StyledText } from '../../components/common_elements';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EventsData } from '../../@types';
import { ScrollView } from 'react-native-gesture-handler';


export default function Details () {
    const route = useRoute();
    const navigation = useNavigation();
    const data:any = route.params;
    return(
        <View
            style={
                {
                    flex: 1,
                    padding: 25,
                    backgroundColor: '#e7e7e7'
                }
            }
        >  
        <Div style={{backgroundColor:'white', padding: 15, position: 'absolute', zIndex: 1, width: '115%'}}>
            
            <StyledText style={{justifyContent: 'center', textAlign: 'center'}}>
                <StyledText style={{paddingRight: 15}}>
                    Código de Rastreio: 
                </StyledText>
                <StyledText weight={'600'}>
                    {'  '+data.id}
                </StyledText>
            </StyledText>
        </Div>

            <ScrollView style={{marginTop: 25}}>
            {
                data.events.slice(0).reverse().map((item:EventsData) => {
                    let local:string = '';
                    if(!item.local){
                        local = `Enviado para ${item.destino}.`;
                    } else {
                        local = item.local;
                    }
                    console.log(item);
                    return(
                    <Div flex={1} style={
                        {
                            marginTop: 15, marginBottom: 15,
                            padding: 20,
                            flexDirection:'column',
                            backgroundColor: '#fff',
                            borderRadius: 25,
                            overflow: 'scroll',
                        }
                    }>
                        <Div style={{flexDirection: 'row'}}>
                            <Div style={{backgroundColor: '#434994', borderRadius: 25, paddingLeft:20, flexDirection: 'row', padding: 10 }}>
                                <StyledText color={'#fff'} weight={'600'}>
                                    <Feather name={'calendar'} color={'white'}></Feather>
                                    {'  '+item.data+'                                      '} 
                                    <Feather name={'clock'} color={'white'}></Feather>
                                    {'  '+item.hora}
                                </StyledText>
                            </Div>
                        </Div>
                        <Div style={{marginTop:15}}>
                            <Div style={{margin: 5}}>
                                <Div style={{borderLeftColor: '#434994', borderLeftWidth: 2}}>
                                    <StyledText style={{fontSize:18, paddingLeft: 5}}>
                                        {item.status}
                                    </StyledText>
                                </Div>
                                <Div style={{backgroundColor: '#434994'}}>
                                    <StyledText color={'white'} style={{textAlign: 'right', margin: 5}}>
                                    {local}
                                    </StyledText>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                    );
                })
            }
            </ScrollView>
        </View>
    );
}