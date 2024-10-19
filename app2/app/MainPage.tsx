import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import useLocation from '../hooks/useLocation'
import useHandleLogin from '@/hooks/useHandleLogin';

interface MarkerType {
  latitude: number;
  longitude: number;
  title: string;  // Add the title field
}

const getMarkerImage = (title: string) => {
  switch (title) {
    case 'BFP':
      return require('../assets/images/fire.png');
    case 'PNP':
      return require('../assets/images/police.webp');
    case 'Medical':
      return require('../assets/images/medic.png');
    case 'NDRRMC':
      return require('../assets/images/ndrrmc.png');

  }
};

export default function MainPage() {

  const [serviceProviderMarkerImage,setServiceProviderMarkerImage] = useState<any>(null)
  const [markers, setMarkers] = useState<MarkerType[]>([]); // State to store markers with proper type
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [canSelectLocation, setCanSelectLocation] = useState<any>();

  const { location, errorMsg, isFetching, latitude, longitude, title } = useLocation();  // Get location data from useLocation
  const { markerUnameEmoji, markerEmoji, markerImageSize, imageChanger } = useHandleLogin();

  

  const defaultRegion = {
    latitude: 15.4817, // Tarlac City latitude
    longitude: 120.5979, // Tarlac City longitude
    latitudeDelta: 0.05, // Adjust for desired zoom level
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('http://192.168.100.127:3000/marker/getMarker');
        const data = await response.json();

        if (Array.isArray(data)) {
          setMarkers(data);  
        } else {
          console.error('Error', 'Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching markers:', error);
        console.error('Error', 'Failed to load markers');
      }
    };
  
    fetchMarkers();
  }, []);

  useEffect(() => {
    const updateMarkerEmoji = async () => {
      await imageChanger();  // Call imageChanger to update the marker emoji
    };
  
    updateMarkerEmoji();  // Trigger the update when the component mounts
  }, []);

  useEffect(() => {
    if (latitude && longitude && title) {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { latitude, longitude, title },  
      ]);
    }
  }, [latitude, longitude, title]); 

  return (
    <View style={styles.container}>
      {isFetching && <Text>Fetching location...</Text>}
      {errorMsg && <Text>{errorMsg}</Text>}
      {!isFetching && location && (
        <MapView
          style={styles.map}
          initialRegion={defaultRegion}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="Your current location"
          >
            <Image
              source={markerUnameEmoji}
              style={{ width: markerImageSize.width, height: markerImageSize.height }}
            />
          </Marker>

          {/* Render other markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title} // Title from database
              description={`Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`}
            >
              <Image
                source={getMarkerImage(marker.title)}  // Use title to determine marker image
                style={{ width: 40, height: 40 }}  // Adjust size as needed
              />
            </Marker>
          ))}
        </MapView>
      )}

      <View style={styles.tabBarContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, isPressed ? styles.buttonPressed : null]}
              onPress={() => {
                setIsPressed(!isPressed);
                setCanSelectLocation(!canSelectLocation);
              }}
            >
              <Text style={styles.buttonText}>Route Assistance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%', 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    width: '100%',
    height: '20%', 
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    borderWidth: 2,         // Add a border to show when pressed
    borderColor: '#FFD700', // Gold color for the border
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    backgroundColor: '#FFFDD0',
    padding: 5,
    width: 50,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    color: 'black',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#AD5765',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    shadowColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  buttonbar: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 5,
    backgroundColor: '#1E90FF',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    
    color: 'white',
  },
  buttonModal: {
    flexDirection: 'column',
  },
  servicesContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});

const modalStyles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    flexDirection: 'column',
  },
  servicesContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  serviceButton: {
    width: 120,
    height: 60,
    backgroundColor: '#AD5765',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});