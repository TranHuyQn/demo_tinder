import React, { useCallback } from 'react'
import { Image, Text, View, StyleSheet, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Choice from '../choice'
import { ACTION_OFFSET, CARD } from '../utils/constants'

export default Card = ({name, source, isFirst, swipe, tiltSign, ...rest}) => {

    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg']
    });

    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, ACTION_OFFSET],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [- ACTION_OFFSET, -25],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), {rotate}],
    }

    const renderChoice = useCallback(() => {
        return (
            <>
                <Animated.View style={[styles.choiceContainer, styles.likeContainer, {opacity: likeOpacity}]} >
                    <Choice type="like" />
                </Animated.View>
                <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity: nopeOpacity}]} >
                    <Choice type="nope" />
                </Animated.View>
            </>
        )
    }, [likeOpacity, nopeOpacity]);

    return (
        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
            <Image source={source} style={styles.image}/>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']} style={styles.gradient} />
            <Text style={styles.name}>{name}</Text>
            {
                isFirst && renderChoice()
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    image: {
        width: CARD.WIDTH,
        height: CARD.HEIGHT,
        borderRadius: CARD.BORDER_RADIUS
    },
    gradient: {
        position: 'absolute',
        height: 160,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: CARD.BORDER_RADIUS
    },
    name: {
        position: 'absolute',
        bottom: 22,
        left: 22,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff'
    },
    choiceContainer: {
        position: 'absolute',
        top: 100
    },
    likeContainer: {
        left: 45,
        transform: [{rotate: "-30deg"}]
    },
    nopeContainer: {
        right: 45,
        transform: [{rotate: "30deg"}]
    }
})