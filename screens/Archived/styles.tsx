import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { FAB, Provider, Portal } from 'react-native-paper';
import { useNavigation  } from '@react-navigation/native';
import { _deleteAll, _archive } from'../../services/parcels/functions';

export const List = styled.ScrollView`
    flex: 1;    
    margin-top: 50px;
`;

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
  
