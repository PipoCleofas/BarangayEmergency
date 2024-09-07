
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, Alert, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import useHandleClicks from "@/hooks/useHandleClicks";
import usePhoto from '@/hooks/usePhoto';

export default function CitizenPhoto() {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const { handleLoginButtonPress,handleBackButtonInCitizenPhotoPress } = useHandleClicks();
  const { photoUri1, photoUri2, photoUri3, handleSelectPhoto1 , handleSelectPhoto2, handleSelectPhoto3,handleTakePhoto1, handleTakePhoto2,handleTakePhoto3 } = usePhoto();

  return (

    
    <View style={styles.container}>


      {/* modals */}

      <Modal
      animationType="fade"
      transparent={true}
      visible={modal1Visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModal1Visible(!modal1Visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleSelectPhoto1} style={styles.modalButtons}>
            <Text style={styles.modalText}>Select Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto1} style={styles.modalButtons}>
            <Text style={styles.modalText}>Open Camera</Text>
          </TouchableOpacity>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModal1Visible(!modal1Visible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
      </Modal>

      <Modal
      animationType="fade"
      transparent={true}
      visible={modal2Visible}
      onRequestClose={() => {
        setModal2Visible(!modal2Visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleSelectPhoto2} style={styles.modalButtons}>
            <Text style={styles.modalText}>Select Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto2} style={styles.modalButtons}>
            <Text style={styles.modalText}>Open Camera</Text>
          </TouchableOpacity>         
          
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModal2Visible(!modal2Visible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
      </Modal>

      <Modal
      animationType="fade"
      transparent={true}
      visible={modal3Visible}
      onRequestClose={() => {
        setModal3Visible(!modal3Visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleSelectPhoto3} style={styles.modalButtons}>
            <Text style={styles.modalText}>Select Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto3} style={styles.modalButtons}>
            <Text style={styles.modalText}>Open Camera</Text>
          </TouchableOpacity>         
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModal3Visible(!modal3Visible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
      </Modal>






      {/* true view */}



      <Text style={styles.title}>CITIZEN</Text>
      <Text style={styles.subtitle}>ACCOUNT</Text>

      <View style={styles.inputContainer}>
        <Text> VALID ID: </Text>
        <TouchableOpacity onPress={() => setModal1Visible(true)} style={styles.textInput}>
          <Text style={styles.text}>Upload a photo</Text>
        </TouchableOpacity>
      </View>

     

      <View style={styles.inputContainer}>
        <Text>FRONT IMAGE: </Text>
        <TouchableOpacity onPress={() => setModal2Visible(true)} style={styles.textInput}>
          <Text style={styles.text}>Upload a photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text>BACK IMAGE: </Text>
        <TouchableOpacity onPress={() => setModal3Visible(true)} style={styles.textInput}>
          <Text style={styles.text}>Upload a photo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.photoUriList}>

        {photoUri1 && (
          <View style={styles.previewContainer}>
            <Text>Selected Image:</Text>
            <Image source={{ uri: photoUri1 }} style={styles.previewImage} />
          </View>
        )}

        {photoUri2 && (
          <View style={styles.previewContainer}>
            <Text>Selected Image:</Text>
            <Image source={{ uri: photoUri2 }} style={styles.previewImage} />
          </View>
        )}

        {photoUri3 && (
          <View style={styles.previewContainer}>
            <Text>Selected Image:</Text>
            <Image source={{ uri: photoUri3 }} style={styles.previewImage} />
          </View>
        )}
      </View>
      

      <View style={styles.columnButtons}>
        <TouchableOpacity style={styles.button1}>
          <SimpleLineIcons name="arrow-left" size={16} color="black" style={styles.icon} onPress={handleBackButtonInCitizenPhotoPress} />
          <Text style={styles.buttonText1}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={handleLoginButtonPress}>
          <Text style={styles.buttonText2}>NEXT</Text>
          <SimpleLineIcons name="arrow-right" size={16} color="#FFFFFF" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginBottom: 40,
  },
  textInput: {
    width: 200,
    height: 40,
    backgroundColor: "#944547",
    fontSize: 16,
    borderColor: "#714423",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "white",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  columnButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  modalButtons: {
    backgroundColor: '#944547',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center', // Centers content vertically
    borderRadius: 10,
    marginVertical: 7,
    height: 40, // You can adjust the height to fit your design
  },
  photoUriList: {
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: "#FFFDD0",
    width: 100,
    height: 40,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText1: {
    color: "black",
    fontSize: 16,
  },
  button2: {
    backgroundColor: "#714423",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#D3D3D3",
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText2: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 5,
  },
  previewContainer: {
    marginTop: 20,
    marginHorizontal: 8,
    alignItems: "center",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
   modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 5,
    backgroundColor: '#FFFDD0',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    
    color: 'white',
  },
  
  

});