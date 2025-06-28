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

import { Image, StyleSheet, Text, View } from "react-native";
import loadingGif from '../assets/loading.gif';
import colors from "../constants/colors";

export default Bubble = (props) => {
    const { text, type } = props;

    const bubbleStyle = { ...styles.container };
    const wrapperStyle = { ...styles.wrapperStyle }
    const textStyle = { ...styles.textStyle }

    if (type === "assistant") {
        bubbleStyle.backgroundColor = colors.secondary;
        wrapperStyle.justifyContent = 'flex-start';
        textStyle.color = colors.textColor
    }

    return (
        <View style={wrapperStyle}>
            
            { 
                text &&
                <View style={bubbleStyle}>
                    <Text style={textStyle}>{text}</Text>
                </View> 
            }

            {
                type === "loading" &&
                <Image
                    source={loadingGif}
                    style={styles.loadingGif}
                    resizeMode="contain"
                />
            }
            

        </View>
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
    loadingGif: {
        height: 100
    }
})