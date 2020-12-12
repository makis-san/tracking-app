import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Div, StyledText } from '../common_elements';
import { Feather } from '@expo/vector-icons';
import { FAB, Provider, Portal } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import Swipeable from 'react-native-swipeable-row';
import { _deleteAll, _archive, _delete } from'../../services/parcels/functions';
import AppContext from '../../components/AppContext';
import { env } from 'process';
import { ParcelData } from '../../@types';
const swipe = {
    toValue: {x: 0, y: 0},
    duration: 250,
    useNativeDriver: true
}
 export const Item:React.FC<{
    data: {
        id: string;
        name: string;
        last: string;
        events: [Record<string, string>];
        sent_at: string;
        carrier: string;
        tracking: string;
        added_at: string;
        archived: boolean;
    },
    navigation?: any
}> = ({
    data,
    navigation = useNavigation()
}) => {
    let color:string = '#434994';
    const styles = StyleSheet.create({
        carrier_text: {
            fontSize: 12,
            textAlign: "center",
            color: 'white'
        },
        counter: {
            backgroundColor: color,
            margin: -20,
            marginTop: 10,
            padding: 20,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomColor: 'gray',
            borderBottomWidth: 2,
        },
        item: {
            flex: 1,
            backgroundColor: '#fff',
            margin: 10,
            marginRight: 0,
            marginLeft: 0,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            color: 'black',
            
          },
          date_holder: {
              marginRight: -20,
              backgroundColor: color,
              padding: 2.5,
              borderRadius: 25,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
          },
          item_date: {
              color: 'grey',
              fontSize: 12,
              textAlign: "right",
          },
          counter_text: {
              color: 'white',
              fontSize: 12
          }
    })
    let startDateS = data?.events[data?.events?.length-1]?.data;
    const userData:any = useContext(AppContext);
    let start = startDateS.split('/');
    let startDate:any;
        startDate = new Date(start[1]+'/'+start[0]+'/'+start[2]);
        let actualDate = new Date();
        const leftButtons = [
            <TouchableOpacity onPress={() => userData.setData(_archive(data.id))} style={{backgroundColor: '#e6df82', padding: 20, margin:20, marginLeft: 0, marginTop: 10, marginBottom: 0, paddingTop: 45, paddingBottom: 50, flexDirection: 'row-reverse'}}>
                  <Feather name={'archive'} size={32} color={'white'}></Feather>
            </TouchableOpacity>
          ];
 
        const rightButtons = [
          <TouchableOpacity onPress={() => userData.setData(_delete(data.id))} style={{backgroundColor: '#e68282', padding: 20, margin:20, marginLeft: 0, marginTop: 10, marginBottom: 0, paddingTop: 45, paddingBottom: 50}}>
                <Feather name={'delete'} size={32} color={'white'}></Feather>
          </TouchableOpacity>
        ];
         
    return(
      <Swipeable  leftButtons={leftButtons} rightButtons={rightButtons} onRightActionComplete={() =>userData.setData(_delete(data.id))} onLefttActionComplete={() => userData.setData(_archive(data.id))}
      swipeReleaseAnimationConfig={swipe}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', {title: data.name, id: data.id, carrier: data.carrier, events: data.events})}>
            <Div style={{flexDirection: 'row'}}>
                <Div type='center' flex={0} style={{marginRight: 20}}>
                    <Feather name="map-pin" size={24} color={color}/>
                </Div>
                <Div type='center' flex={2}>
                    <StyledText weight={'700'}>
                        {data.name}
                    </StyledText>
                    <StyledText>
                        {data.last.replace('undefined', '')}
                    </StyledText>
                </Div>
                <Div type='center' flex={1}>
                    <View style={styles.date_holder}>
                        <StyledText weight={'800'} style={styles.carrier_text}>
                            {data.carrier}
                        </StyledText>
                    </View>
                    <StyledText weight={'700'} style={styles.item_date}>
                        {startDateS}
                    </StyledText>
                </Div>
            </Div>
            <Div style={styles.counter}>
                <StyledText weight={'800'} style={styles.counter_text}>
                    Enviado há {Math.ceil((actualDate?.getTime() - startDate?.getTime()) / (1000*3600*24))} dias...
                </StyledText>
            </Div>
        </TouchableOpacity>
    </Swipeable>

    );
}

export default Item;