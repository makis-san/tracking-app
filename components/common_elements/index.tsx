import React, { Children } from 'react';
import { Text, View, StyleSheet, Image, StyleProp, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

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

export const StyledText:React.FC<{color?:string, weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined, style?:StyleProp<TextStyle>}> = ({weight = '300', children, style, color = '#000'}) => {
    let family = '';
    switch (weight) {
        case '200': family = 'Nunito_200ExtraLight';             break;
        case '300': family = 'Nunito_300Light';                  break;
        case '400' || 'normal': family = 'Nunito_400Regular';    break;
        case '700' || 'bold': family = 'Nunito_700Bold';         break;
        case '800': family = 'Nunito_800ExtraBold';              break;
        case '900': family = 'Nunito_900Black';                  break;
    }
    return(
        <Text style={
            [{color: color,fontFamily: family,fontWeight: weight},style]}>
            {children}
        </Text>
    );
}

export const NotFound = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: '50%', alignSelf:'center'}}>
                  {/* <Image
                  style={{height: '100%', width: '100%'}}
        source={{
          uri: 'https://image.freepik.com/vetores-gratis/opa-erro-404-com-uma-ilustracao-do-conceito-de-robo-quebrado_114360-1932.jpg',
        }}
      /> */}
      <StyledText style={{textAlign: 'center'}}>Empty</StyledText>
        </View>
    );
}