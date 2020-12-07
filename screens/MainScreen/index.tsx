import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import Item from '../../components/parcel_card';

import { List, FloatingButton } from './styles';
import { userData, ParcelData } from '../../@types/index';
import { _retrieveData } from '../../services/parcels/functions';
import AppContext from "../../components/AppContext";
import { HookCallbacks } from 'async_hooks';
import { NotFound } from '../../components/common_elements';

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

    const parcels = userData?.data?.parcels?.filter(item => !item.archived) ?? [];

    return(
    
        <View style={{flex: 1}}>
            <List
            style={{height:windowHeight}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
               { 
               parcels.length > 0 
               ? parcels.map(item => <Item events={item.events} id={item.id} key={item.id} title={item.name} start={item.events[0]['data']} state={item.last} carrier={item.carrier}  />)
               : <NotFound/>
               }
            </List>
            <FloatingButton/>
        </View>
    );

}