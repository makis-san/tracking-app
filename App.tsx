import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View } from 'react-native';
import Main from './components/navigation';
import { userData, ParcelData } from './@types/index';
import { AsyncStorage } from "react-native";
import AppContext from './components/AppContext';

export default function App() {

  const [data, setData] = useState<userData>();
  const userSettings:any = {
    'data': data,
    setData,
  };
  return (
    <AppContext.Provider value={userSettings}>
      <Main/>
    </AppContext.Provider>
  );
}


