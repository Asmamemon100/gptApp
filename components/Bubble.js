/*import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../screens/constants/colors';



const Bubble = (props) => {
    const { text, type} =props;
        const bubbleStyle = [
    styles.container,
    type === "assistant" && { backgroundColor: colors.secondary }
];
const wrapperStyle = [
    styles.wrapperStyle,
    type === "assistant" && { justifyContent: 'flex-start' }
];
const textStyle = [
    styles.textStyle,
    type === "assistant" && { color: colors.textColor }
];
   

    return (
        <View style={wrapperStyle}>

          {text ? (
    <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
    </View>
) : null}
{type === "loading" ? (
    <View style={bubbleStyle}>
        <ActivityIndicator size="small" color="white" />
    </View>
) : null}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        maxWidth: "90%"

    },
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }, 
    textStyle: {
        color: 'white',
        fontFamily: "regular"

        
    }
});

export default Bubble;
*/

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import TypingAnimation from './TypingAnimation';

const Bubble = (props) => {
    const { text, type } = props;
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const bubbleStyle = { ...styles.container };
    const wrapperStyle = { ...styles.wrapperStyle }
    const textStyle = { ...styles.textStyle }

    if (type === "assistant") {
        bubbleStyle.backgroundColor = colors.secondary;
        wrapperStyle.justifyContent = 'flex-start';
        textStyle.color = colors.textColor
    }

    return (
        <Animated.View 
            style={[
                wrapperStyle, 
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}
        >
            
            { 
                text &&
                <View style={bubbleStyle}>
                    <Text style={textStyle}>{text}</Text>
                </View> 
            }

            {
                type === "loading" &&
                <View style={styles.loadingContainer}>
                    <TypingAnimation />
                </View>
            }
            

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        maxWidth: "90%"
    },
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textStyle: {
        color: 'white',
        fontFamily: "regular"
    },
    loadingContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        padding: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        maxWidth: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 45,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
})

export default Bubble;