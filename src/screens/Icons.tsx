import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";


function Icons(): JSX.Element {


    return (
        <View style={styles.Icons}>

            <TouchableOpacity><Image source={require('../assets/images/APLLE.png')} style={styles.apple} /></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/images/FACE.png')} style={styles.face} /></TouchableOpacity>
            <TouchableOpacity><Image source={require('../assets/images/GOOGLE.png')} style={styles.goog} /></TouchableOpacity>
        </View>
    )


}
const styles = StyleSheet.create({

    Icons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    face: {
        height: 80,
        width: 60,
        marginHorizontal: 10,
        marginTop: -2
    },
    apple: {
        height: 60,
        width: 60,
        marginHorizontal: 10,
        marginTop: 12
    },
    goog: {
        height: 60,
        width: 60,
        marginHorizontal: 10,
        marginTop: 10
    }


});

export default Icons