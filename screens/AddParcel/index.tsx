import React, { useState, useContext, useEffect } from 'react';
import { Text, ActivityIndicator, View, Picker, KeyboardAvoidingView } from 'react-native';
import { Div, StyledText } from '../../components/common_elements';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Divider } from 'react-native-paper';
import { _saveData, _deleteAll } from '../../services/parcels/functions';
import AppContext from '../../components/AppContext';
import { userData } from '../../@types';
import { Dimensions } from 'react-native';

let windowHeight = Dimensions.get('window').height;
export default function AddParcel(navigation = useNavigation()) {
    const userData:any = useContext(AppContext);
    const [rastreio, setRastreio]:any = useState();
    const [name, setName]:any = useState();

    const [saving = false, setSaving]:any = useState();

    const [carrier, setCarrier]:any = useState();
    let dataToSave = {
        'name': name,
        'tracking': rastreio,
        'carrier': carrier
    };
    const CreateParcel = async (dataToSave: any) => {
        setSaving(true);
        let data = await _saveData(dataToSave);
        setSaving(false);
        return;
    }

    return(
        <View>
        {
            saving == true &&
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.562)',
                position: 'absolute',
                left: 0,
                right: 0,
                zIndex: 1,
                top: 0,
                bottom: 0,
                height: windowHeight,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <ActivityIndicator size='large' color={'#fff'} />
            </View>
        }
        <KeyboardAvoidingView behavior={'position'}>
            <View style={{padding: 25, marginTop: '50%'}}>
                <StyledText style={{marginBottom: 15, color: '#434994', textTransform: 'uppercase'}} weight={'bold'}>
                    Adicionar Rastreio
                </StyledText>
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
                onPress={() => CreateParcel(dataToSave)}>
                    Adicionar
                </Button>
                <Button icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>} mode="contained" style={{marginTop:10, backgroundColor: '#434994'}}
                onPress={() => userData.setData(_deleteAll())}>
                    delete data
                </Button>
                {/* <Button icon={() => <Feather name={'package'} size={24} color={'white'}></Feather>} mode="contained" style={{marginTop:10, backgroundColor: '#434994'}}
                onPress={() => console.log(userData.data)}>
                    show data
                </Button> */}
            </View>
        </KeyboardAvoidingView>
        </View>
    );
};
