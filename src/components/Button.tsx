import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../colors';



const Button = ({ label, onPress, disabled, variant, width, icon, iconWidth, iconHeight, iconGap, wrapperCustomStyle = {}, fontSize,activeOpacity = undefined,textStyle={} }: ButtonsProps) => {
    const getButtonStyle = () => {
        if (variant === 'outlined') {
            return [styles.outlinedButton, { width }];
        } else if (variant === 'filled') {
            return [styles.filledButton, { width }];
        } else if (variant === 'disabled') {
            return [styles.disabledButton, { width }];
        } else if (variant === 'blackButton') {
            return [styles.blackButton, { width }];
        } else if (variant === 'reduceOpacity') {
            return [styles.disabledColor, { width }];
        } else {
            return [styles.defaultButton, { width }];
        }
    };
    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), wrapperCustomStyle]}
            onPress={onPress}
            disabled={variant === 'disabled' || variant === 'reduceOpacity' || disabled}
            activeOpacity={activeOpacity}
        >
            <View style={[styles.buttonContent, { gap: iconGap }]}>
                <Text style={[styles.buttonText, variant === 'blackButton' && styles.whiteText, {fontSize:fontSize},!icon ?{ right:0} : {right:10}, textStyle]}>
                    {label}
                </Text>
                { icon && <Image
                    source={icon}
                    style={[styles.icon, { width: iconWidth, height: iconHeight }]}
                />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        width:"100%"
    },
    buttonText: {
        textAlignVertical: 'top',
        color: colors.black,
        fontWeight: 'bold',
        right:10
    },
    whiteText: {
        color: 'white',
    },
    yellowText: {
        color: colors.yellow
    },
    outlinedButton: {
        backgroundColor: 'transparent',
        borderColor: colors.black,
        borderWidth: 2,
    },
    filledButton: {
        backgroundColor: colors.yellow,
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        shadowOffset: { width: 1, height: 13 }
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    disabledColor: {
        backgroundColor: '#ffe8ad'
    },
    blackButton: {
        backgroundColor: 'black',
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 5,
        flex: 1,
    },
    defaultButton: {
        backgroundColor: colors.yellow,
    },
    icon: {
        position:'absolute',
        right:10
    },
});

export default Button;
