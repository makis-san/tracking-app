import React from "react";
import { AsyncStorage } from "react-native";

const AppContext:any = React.createContext(AsyncStorage.getItem('data'));

export default AppContext;