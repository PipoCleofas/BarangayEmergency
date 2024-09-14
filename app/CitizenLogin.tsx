import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import useHandleClicks from "@/hooks/useHandleClicks";
import useDataInput from "@/hooks/useDataInput";

export default function CitizenLogin() {

    const { handleBackButtonPress, handleLoginButtonPress, } = useHandleClicks();
    const { handleUsernameLoginChange, handlePassordLoginChange, handleCitizenLogin,loginError } = useDataInput();

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../app/pictures/logoo.jpeg')} />
            <Text style={{ marginBottom: 20 }}>FOR CITIZEN</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.labeInput}>USERNAME: </Text>
                <TextInput style={styles.textInput} maxLength={15} onChangeText={(text) => handleUsernameLoginChange(text)}/>
            </View>

            <View style={[styles.inputContainer, { marginBottom: 65 }]}>
                <Text style={styles.labeInput}>PASSWORD: </Text>
                <TextInput style={styles.textInput} maxLength={20} secureTextEntry={true} onChangeText={(text) => handlePassordLoginChange(text)}/>
            </View>

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

            <View style={styles.columnButtons}>
                <TouchableOpacity style={styles.button1} onPress={() => handleBackButtonPress()}>
                    <SimpleLineIcons name="arrow-left" />
                    <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2} onPress={handleCitizenLogin}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>LOGIN</Text>
                    <SimpleLineIcons style={{ color: 'white' }} name="arrow-right" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    labeInput: {
        marginRight: 15,
        fontSize: 13
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 50,
        textAlign: 'center',
      },
    textInput: {
        color: 'white', // Maroon color
        width: 200,
        backgroundColor: '#944547',
        height: 25,
        fontSize: 18, // Increase font size for better visibility
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 3,
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
        height: 35,
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
        height: 35,
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
    