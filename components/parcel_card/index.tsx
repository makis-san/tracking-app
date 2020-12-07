import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Div, StyledText } from '../common_elements';
import { Feather } from '@expo/vector-icons';
import { FAB, Provider, Portal } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import Swipeable from 'react-native-swipeable-row';
import { _deleteAll, _archive } from'../../services/parcels/functions';
import AppContext from '../../components/AppContext';
import { env } from 'process';

 export const Item:React.FC<{
    id: string,
    title: string, 
    state: string, 
    start: string,
    carrier: string,
    events: any
}> = ({
    id,
    title,
    state,
    start,
    carrier,
    events
}) => {
    let color:string = '#434994';
    if (state.indexOf('entrega ao destinatário')) {
        color = '#439447'
    }
    
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

    const userData:any = useContext(AppContext);
    let startDate = new Date(start);
    let actualDate = new Date();
    let days = Math.ceil((actualDate.getTime() - startDate.getTime()) / (1000*3600*24));
    const rightButtons = [
        <TouchableOpacity 
        onPress={() => userData.setData(_deleteAll())}
        style={{
            backgroundColor: '#db8686',
            padding: 25,
            marginTop: 10,
            flex: 1,
        }}>
        <Feather name={'delete'} size={28} color='white'></Feather>
    </TouchableOpacity>,
        <TouchableOpacity 
        onPress={() => userData.setData(_archive(id))}
        style={{
            backgroundColor: '#dbce86',
            padding: 25,
            marginTop: 10,
            flex: 1,
        }}>
        <Feather name={'archive'} size={28} color='white'></Feather>
    </TouchableOpacity>,
    ];
    const navigation = useNavigation();
    return(
      <Swipeable rightButtons={rightButtons}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', {title: title, events: events})}>
            <Div style={{flexDirection: 'row'}}>
                <Div type='center' flex={0} style={{marginRight: 20}}>
                    <Feather name="map-pin" size={24} color={color}/>
                </Div>
                <Div type='center' flex={2}>
                    <StyledText weight={'700'}>
                        {title}
                    </StyledText>
                    <StyledText>
                        {state}
                    </StyledText>
                </Div>
                <Div type='center' flex={1}>
                    <View style={styles.date_holder}>
                        <StyledText weight={'800'} style={styles.carrier_text}>
                            {carrier}
                        </StyledText>
                    </View>
                    <StyledText weight={'700'} style={styles.item_date}>
                        {start}
                    </StyledText>
                </Div>
            </Div>
            <Div style={styles.counter}>
                <StyledText weight={'800'} style={styles.counter_text}>
                    Enviado há {days} dias...
                </StyledText>
            </Div>
        </TouchableOpacity>
    </Swipeable>

    );
}

export default Item;