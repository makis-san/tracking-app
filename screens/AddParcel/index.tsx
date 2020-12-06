import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { Div } from '../../components/common_elements';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Divider } from 'react-native-paper';
import { _saveData, _deleteAll } from '../../services/parcels/functions';
import AppContext from '../../components/AppContext';
import { userData } from '../../@types';
export default function AddParcel() {
    const userData:any = useContext(AppContext);
    const [rastreio, setRastreio]:any = useState();
    const [name, setName]:any = useState();
    const [carrier, setCarrier]:any = useState();
    let dataToSave = {
        'name': name,
        'tracking': rastreio,
        'carrier': carrier
    };
    return(
        <KeyboardAvoidingView behavior={'position'}>
            <View style={{padding: 25, marginTop: '70%'}}>
                <Text style={{marginBottom: 15, color: '#434994', fontWeight: 'bold', textTransform: 'uppercase'}}>
                    Adicionar Rastreio
                </Text>
                <Divider/>
                <TextInput
                    mode={'outlined'}
                    label="Código de Rastreio"
                    value={rastreio}
                    style={{marginTop: 15}}
                    onChangeText={rastreio => setRastreio(rastreio)}
                />
                <TextInput
                    style={{marginTop: 10}}
                    mode={'outlined'}
                    label="Etiqueta"
                    value={name}
                    onChangeText={name => setName(name)}
                />
                <View style={{borderRadius: 5, marginTop: 10 ,backgroundColor: '#434994'}}>
                    <Picker
                        style={{color: '#fff', margin: 5}}
                        selectedValue={carrier}
                        onValueChange={(itemValue, itemIndex) => setCarrier(itemValue)}
                    >
                        <Picker.Item label="Selecione a Transportadora" value="null" />
                        <Picker.Item label="Correios Brasil" value="Correios" />
                        <Picker.Item label="CargoBr" value="CargoBr" />
                        <Picker.Item label="JadLog" value="Jadlog" />
                    </Picker>
                </View>
                <Button icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>} mode="contained" style={{marginTop:10, backgroundColor: '#434994'}}
            onPress={async () => {
                let data:userData = await _saveData(dataToSave);
                userData.setData(data);
                return;
            }
            }>
                    Adicionar
                </Button>
                <Button icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>} mode="contained" style={{marginTop:10, backgroundColor: '#434994'}}
                onPress={() => userData.setData(_deleteAll())}>
                    delete data
                </Button>
                <Button icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>} mode="contained" style={{marginTop:10, backgroundColor: '#434994'}}
                onPress={() => console.log(userData.data)}>
                    show data
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
};
