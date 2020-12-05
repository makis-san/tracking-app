import React, { Children } from 'react';
import { Text, View, StyleSheet, StyleSheetProperties, StyleProp, ViewStyle } from 'react-native';

export const Div:React.FC<{ children: any, type?: "center"|"bottom"|"", flex?: number, style?: StyleProp<ViewStyle> }> = ({children, type, flex = 1, style}) => {
    let base:StyleProp<ViewStyle> = {flex: flex};
    switch (type) {
        case "center":
            base = {
                flex: flex,
                // flexBasis: flex,
                // flexShrink: flex,
                flexGrow: flex,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
            };
            break;
        case "bottom":
            base = {
                flex: flex,
                flexGrow: flex,
                marginBottom: 0,
            };
            break;
        default: base={
            flex: flex,
            flexGrow: flex
        };
    }    
    return(
    <View style={[base, style]}>{children}</View>
    );
}