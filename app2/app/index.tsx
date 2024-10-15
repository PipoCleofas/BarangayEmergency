import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import  useHandleLogin from '../hooks/useHandleLogin'

export default function CitizenLogin() {

    const { onPasswordChange, onLoginPress, onUnameChange, loginError } = useHandleLogin();

    const [showPassword, setShowPassword] = useState(false);  

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logoo.gif')} />
            <Text style={{ marginBottom: 20 }}>PROVIDER LOGIN</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.labelInput}>USERNAME:</Text>
                <TextInput style={styles.textInput} maxLength={15} onChangeText={(text) => onUnameChange(text)} />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 35 }]}>
                <Text style={styles.labelInput}>PASSWORD:</Text>
                <View style={styles.inputPasswordWrapper}>
                    <TextInput
                        style={styles.textInput}
                        maxLength={20}
                        secureTextEntry={!showPassword}  
                        onChangeText={(text) => onPasswordChange(text)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconWrapper}>
                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            {loginError && <Text style={styles.errorText}>{loginError}</Text>}

            <View style={styles.columnButtons}>
              
                <TouchableOpacity style={styles.button2} onPress={onLoginPress}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>LOGIN</Text>
                    <SimpleLineIcons style={{ color: 'white' }} name="arrow-right" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 30,
        textAlign: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        width: 300,
        height: 150,
        marginBottom: 50,
    },
    labelInput: {
        width: 100, // Set fixed width for label
        fontSize: 13,
        textAlign: 'right',
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', // Align items vertically in the center
        marginBottom: 15,
        width: '80%',  // Adjust the width of the container
    },
    inputPasswordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textInput: {
        color: 'white', // Maroon color
        flex: 1, // Flex to fill the remaining space
        backgroundColor: '#944547',
        height: 25,  // Increase height for better alignment
        fontSize: 15, // Increase font size for better visibility
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,  // Increase padding for better look
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
    columnButtons: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the buttons horizontally
        alignItems: 'center',
        marginBottom: 60,
    },
    button1: {
        backgroundColor: '#FFFDD0',
        width: 100,
        height: 40,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', // Center the content inside the button
        flexDirection: 'row',
        padding: 8,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10, // Add margin between buttons
    },
    button2: {
        backgroundColor: '#714423',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center', // Center the content inside the button
        flexDirection: 'row',
        padding: 8,

        borderColor: '#D3D3D3',
        borderRadius: 20,
        borderWidth: 1,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10, // Add margin between buttons
    },
    buttonText: {
        marginHorizontal: 5, // Add some space between icon and text
    },
});
