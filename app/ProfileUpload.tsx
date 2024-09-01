import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";







export default function ProfileUpload(){



    return(
        <View>
            <Text>Your Profile</Text>
            {/* insert file reader for photo input */}

            <View>
                {/* insert style here */}
            </View>
            
            <Text>Username</Text>
            <TouchableOpacity>
                <Text>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Delete</Text>
            </TouchableOpacity>

        </View>        

    )
}