import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Pressable, Image } from "react-native";
import { useState } from "react";
import usePhoto from "@/hooks/usePhoto";
import useDataInput from "@/hooks/useDataInput";

const UsernamePhoto = () => {
  const { handleSelectPhoto3, photoUri3, setPhotoUri3, setPhotoBase643 } = usePhoto();
  const {username, setUsername} = useDataInput();


  function deletePhotoAndUsername() {
    setPhotoUri3(null);
    setPhotoBase643(null);
    setUsername(""); // Clear the username input value
  }

  function usernameInputValueChange(text: string) {
    setUsername(text); // Update the input value
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Pressable onPress={handleSelectPhoto3}>
        <MaterialIcons name="image-search" size={50} color="#4A4A4A" style={styles.icon} />
      </Pressable>

      {photoUri3 && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri3 }} style={styles.previewImage} />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={15}
          placeholder="Enter username"
          placeholderTextColor="#aaa"
          value={username || ""} 
          onChangeText={usernameInputValueChange} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={deletePhotoAndUsername}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    justifyContent: "center", 
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  icon: {
    marginBottom: 20,
    backgroundColor: "#FFFDD0",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    width: "100%", // Ensure the input takes full width
    alignItems: "center", // Center input and buttons
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 45,
    backgroundColor: "#944547",
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "white",
    textAlign: "center", // Center text within the input
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonConfirm: {
    width: "80%",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    marginVertical: 10, // Add vertical spacing between buttons
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
  },
  buttonDelete: {
    width: "80%",
    backgroundColor: "red",
    paddingVertical: 12,
    marginVertical: 10, // Add vertical spacing between buttons
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    marginBottom: 20,
    marginTop: 20, // Add margin around the photo preview
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 2,
  },
});

export default UsernamePhoto;
