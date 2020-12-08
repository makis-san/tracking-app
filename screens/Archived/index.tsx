import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import Item from '../../components/parcel_card';
import { Divider } from 'react-native-paper';

import { List, FloatingButton } from './styles';
import { userData, ParcelData } from '../../@types/index';
import { _retrieveData } from '../../services/parcels/functions';
import AppContext from "../../components/AppContext";
import { NotFound, StyledText } from '../../components/common_elements';

import { Dimensions } from 'react-native';

let windowHeight = Dimensions.get('window').height;
/*
* Correios: OK816005360BR
*
*/


export default function MainScreen () {
    const userData = useContext<{data:userData, setData:(data?:userData)=> void}>(AppContext);
    
    async function fetchData(){
        userData.setData(await _retrieveData());
    }
    
    useEffect(()=>{ fetchData()},[])
    
    const [refreshing = false, setRefresh]:any = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        fetchData();
        setTimeout(() => {
         setRefresh(false);
        }, 2000);
    },[]);

    const parcels = userData?.data?.parcels?.filter(item => item && item.archived) || [];

    return(
    
        <View style={{flex: 1}}>
            <List
            style={{height:windowHeight}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            <StyledText color={'#434994'} style={{marginBottom: 15, textTransform: 'uppercase', textAlign: 'center'}} weight={'bold'}> Archived Parcels</StyledText>
            <Divider/>
            { 
               parcels.length > 0 
               ? parcels.map(item => <Item key={item.tracking} data={item} />)
               : <NotFound/>
               }
            </List>
        </View>
    );

}