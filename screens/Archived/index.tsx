import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import { List, Item, FloatingButton } from './styles';
import { userData, ParcelData } from '../../@types/index';
import { _retrieveData } from './functions';
import AppContext from "../../components/AppContext";
import { HookCallbacks } from 'async_hooks';

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
    return(
    
        <View style={{flex: 1}}>
            <List
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
               { 
               userData.data?.parcels?.map(item => 
                 {
                    // return;
                    return <Item key={item.id} title={item.name} start={item.events[0]['data']} state={item.last} carrier={item.carrier}  />;
                 }
               )
               }
            </List>
            <FloatingButton/>
        </View>
    );

}