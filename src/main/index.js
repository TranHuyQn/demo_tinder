import React, { useCallback, useRef, useState, useEffect } from 'react';
import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import Card from '../card';
import {pets as petsArray} from './data'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Footer from '../Footer';
import { ACTION_OFFSET, CARD } from '../utils/constants';

export default Main = () => {
    const [pets, setPets] = useState(petsArray);
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!pets.length) {
            setPets(petsArray)
        }
    }, [pets.length])

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy, y0}) => {
            swipe.setValue({x:dx, y:dy});
            tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1)
        },
        onPanResponderRelease: (_, {dx, dy}) => {

            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > ACTION_OFFSET;

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * 500,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(removeTopCard)
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start();
            }
        }
    })

    const removeTopCard = useCallback(() => {
        setPets((prevState) => prevState.slice(1));
        swipe.setValue({x:0, y:0})
    }, [swipe]);

    const handleChoice = useCallback((direction) => {
        Animated.timing(swipe.x, {
            toValue: direction * 500,
            duration: 200,
            useNativeDriver: true
        }).start(removeTopCard)
    }, [removeTopCard, swipe.x])

    return (
        <View style={styles.container}>
            {
                pets.map(({name, source}, index) => {
                    const isFirst = index === 0;
                    const dragHandlers = isFirst ? panResponder.panHandlers : {};

                    return <Card 
                        key={name} 
                        source={source} 
                        name={name} 
                        isFirst={isFirst} 
                        {...dragHandlers} 
                        swipe={swipe}
                        tiltSign={tiltSign}
                    />
                }).reverse()
            }
            <Footer handleChoice={handleChoice} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center'
    }
})