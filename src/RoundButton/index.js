import React, { useCallback, useRef } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Animated, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
export default RoundButton = ({name, size, color, onPress}) => {

    const scale = useRef(new Animated.Value(1)).current;
    const animateScale = useCallback((newValue) => {
        Animated.spring(scale, {
            toValue: newValue,
            friction: 4,
            useNativeDriver: true
        }).start();
    }, [scale]);
    return (
        <TouchableWithoutFeedback 
            onPressIn={() => {
                animateScale(0.8)
            }}
            onPressOut={() => {
                animateScale(1)
                onPress()
            }}
        >
            <Animated.View style={[styles.container, {transform: [{scale}]}]}>
                <FontAwesome name={name} size={size} color={color}/>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        backgroundColor: "#fff",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(17,17,17, 0.3)",
        shadowOffset: { height: 4, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
})