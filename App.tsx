
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View } from 'react-native';
import Main from './components/navigation';
import { userData, ParcelData } from './@types/index';
import { AsyncStorage, Animated } from "react-native";
import AppContext from './components/AppContext';
import tracking from './services/tracking';

import { useFonts, Nunito_200ExtraLight, Nunito_300Light, Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from '@expo-google-fonts/nunito';
///
export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight, Nunito_300Light, Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black 
  });
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


