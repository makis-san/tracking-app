import React, {useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Div } from '../../components/common_elements';
import { Feather } from '@expo/vector-icons';
import { FAB, Provider, Portal } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import Swipeable from 'react-native-swipeable-row';
import { _deleteAll } from'./functions';
import AppContext from '../../components/AppContext';

export const List = styled.ScrollView`
    flex: 1;    
    margin-top: 50px;
    height: 90%;
`;
// icon={() => <Feather name={'edit-2'} size={24} color={'white'}></Feather>}


export function FloatingButton(){
    const navigation = useNavigation();
    const [state, setState]:any = React.useState({ open: false });

    const onStateChange:React.FC<{open:any}> = ({ open }) => setState({ open });
  
    const { open } = state;
    return(
        <Provider>
            <Portal>
                <FAB.Group
                visible={true}
                fabStyle={{backgroundColor:'#434994'}}
                theme={{colors: {disabled:'#434994',onBackground:'#434994',background:'#434994',accent: '#434994',primary: '#434994',surface:'#434994'}}}
                open={open}
                icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>}
                actions={[
                    {
                    icon: () => <Feather name={'plus'} size={24} color={'white'}></Feather>,
                    label: 'Adicionar Remessa',
                    onPress: () => navigation.navigate('AddParcel'),
                    },
                    {
                    icon: () => <Feather name={'edit-2'} size={18} style={{padding:3}} color={'white'}></Feather>,
                    label: 'Editar Remessasa',
                    onPress: () => console.log('Pressed star'),
                    }
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    // do something if the speed dial is open
                    }
                }}
                />
            </Portal>
        </Provider>
    );
};
  
export const Item:React.FC<{
    title: string, 
    state: string, 
    start: string,
    carrier: string,
}> = ({
    title,
    state,
    start,
    carrier,
}) => {
    let color:string = '#434994';
    if (state.indexOf('entrega ao destinatário')) {
        color = '#439447'
    }
    
    let styles = StyleSheet.create({
        carrier_text: {
            fontSize: 9,
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
              padding: 5,
              borderRadius: 25,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
          },
          item_date: {
              fontSize: 12,
              textAlign: "right"
          },
          counter_text: {
              fontWeight: '800',
              color: 'white',
              fontSize: 12
          }
    })

    const userData:any = useContext(AppContext);
    let startDate = new Date(start);
    let actualDate = new Date();

    let days = Math.ceil((actualDate.getTime() - startDate.getTime()) / (1000*3600*24));

    const leftContent = <Text>Pull to activate</Text>;
 
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
        onPress={() => userData.setData(_deleteAll())}
    style={{
        backgroundColor: '#dbce86',
        padding: 25,
        marginTop: 10,
        flex: 1,
    }}>
        <Feather name={'archive'} size={28} color='white'></Feather>
    </TouchableOpacity>,
    ];
    return(
      <Swipeable rightButtons={rightButtons}>
        <TouchableOpacity style={styles.item}>
            <Div style={{flexDirection: 'row'}}>
                <Div type='center' flex={0} style={{marginRight: 20}}>
                    <Feather name="map-pin" size={24} color={color}/>
                </Div>
                <Div type='center' flex={2}>
                    <Text>
                        {title}
                    </Text>
                    <Text>
                        {state}
                    </Text>
                </Div>
                <Div type='center' flex={1}>
                    <View style={styles.date_holder}>
                        <Text style={styles.carrier_text}>
                            {carrier}
                        </Text>
                    </View>
                    <Text style={styles.item_date}>
                        {start}
                    </Text>
                </Div>
            </Div>
            <Div style={styles.counter}>
                <Text style={styles.counter_text}>
                    Enviado há {days} dias...
                </Text>
            </Div>
        </TouchableOpacity>
    </Swipeable>

    );
}

const styles = StyleSheet.create({

  });
