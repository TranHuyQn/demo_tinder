import React from 'react'
import { StyleSheet, View } from 'react-native'
import RoundButton from '../RoundButton'
import { COLORS } from '../utils/constants'

export default Footer = ({handleChoice}) => {

    return (
        <View style={styles.container}>
            <RoundButton name="times" size={40} color={COLORS.nope} onPress={()=>handleChoice(-1)} />
            <RoundButton name="heart" size={34} color={COLORS.like} onPress={()=>handleChoice(1)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        top: '175%',
        width: 170,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: -1
    }
})