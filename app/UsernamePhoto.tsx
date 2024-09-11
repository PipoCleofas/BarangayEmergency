
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";



const UsernamePhoto = () => {

    

    return(
        <View>
            <Text>Your profile</Text>
            <MaterialIcons name="image-search" size={24} color="black" />
            <TextInput/>
            <Text>Username</Text>

            <TouchableOpacity>
                <Text>Confirm</Text>
                <Text>Delete</Text>
            </TouchableOpacity>

        </View>
    )

}


export default UsernamePhoto;