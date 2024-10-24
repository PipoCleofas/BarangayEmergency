import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Modal, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import useLocation from '@/hooks/useLocation';
import useHandleClicks from '@/hooks/useHandleClicks';
import { useNavigation } from 'expo-router';
import Notification from '@/components/notification-holder/Notification';

// Define the type for the marker object
interface MarkerType {
  latitude: number;
  longitude: number;
  title: string;  // Add the title field
  distance?: number;
}

const getMarkerImage = (title: string) => {
  switch (title) {
    case 'BFP':
      return require('./pictures/fire.png');
    case 'PNP':
      return require('./pictures/police.webp');
    case 'Medical':
      return require('./pictures/medic.png');
    case 'NDRRMC':
      return require('./pictures/ndrrmc.png');

  }
};

export default function Index() {

  const [markers, setMarkers] = useState<MarkerType[]>([]); // State to store markers
 
  const { location, errorMsg, isFetching, arrivalTime, handleArrivalTime } = useLocation();
  const { 
    EmergencyAssistanceRequest,
    RouteAssistance,
    markerEmoji,
    markerImageSize
  } = useHandleClicks();

  const [triggerNotification, setTriggerNotification] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [emergencyAssistanceModalVisible, setEmergencyAssistanceModalVisible] = useState(false);
  const [routeAssistanceModalVisible, setRouteAssistanceModalVisible] = useState(false);

  function serviceVisible() {
    setEmergencyAssistanceModalVisible(!emergencyAssistanceModalVisible);
  }

  function emerAssReq(service: string, markerEmoji: any, imageWidth: number = 65, imageHeight: number = 60) {
    EmergencyAssistanceRequest(service, markerEmoji, imageWidth, imageHeight, 'pending');
    setEmergencyAssistanceModalVisible(!emergencyAssistanceModalVisible);
  }

  function cancelService() {
    EmergencyAssistanceRequest('Canceled Service', null, markerImageSize.width, markerImageSize.height, 'rejected');
    setEmergencyAssistanceModalVisible(!emergencyAssistanceModalVisible);
  }

  const defaultRegion = {
    latitude: 15.4817, // Tarlac City latitude
    longitude: 120.5979, // Tarlac City longitude
    latitudeDelta: 0.05, // Adjust for desired zoom level
    longitudeDelta: 0.05,
  };

  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome' as never); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Haversine formula to calculate distance between two coordinates (in meters)
  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180; // Convert degrees to radians
    const R = 6371e3; // Radius of Earth in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('http://192.168.100.127:3000/marker/getMarker'); 
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setMarkers(data);  

          // If location is available, check if there are nearby markers
          if (location) {
            data.forEach((marker: MarkerType) => {
              const distance = haversineDistance(
                location.coords.latitude,
                location.coords.longitude,
                marker.latitude,
                marker.longitude
              );
              if (distance >= 14000) { 
                handleArrivalTime(14000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              } else if (distance == 13000){
                handleArrivalTime(13000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance == 12000){
                handleArrivalTime(12000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance == 10000){
                handleArrivalTime(10000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance == 8000){
                handleArrivalTime(8000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance == 5000){
                handleArrivalTime(5000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance == 3000){
                handleArrivalTime(3000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else if (distance <= 1000){
                handleArrivalTime(1000, true)
                console.log(`Coming in ${arrivalTime} minute/s`)
              }else {
                console.log('Not calculated')
              }
            });
          }
        } else {
          console.error('Error', 'Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching markers:', error);
        console.error('Error', 'Failed to load markers');
      }
    };

    fetchMarkers();
    const intervalId = setInterval(fetchMarkers, 15000); 

    return () => clearInterval(intervalId); 
  }, [location]); 
  


  return (
    <View style={styles.container}>
        {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#AD5765" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
      <Notification
        message={`Coming in ${arrivalTime} minute/s`}
        trigger={triggerNotification}
      />
       {/* MODAL 1*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={emergencyAssistanceModalVisible}
        onRequestClose={() => {
          setEmergencyAssistanceModalVisible(!emergencyAssistanceModalVisible);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={{ marginBottom: 10 }}>Choose Service</Text>

            <View style={modalStyles.buttonModal}>

              <View style={modalStyles.servicesContainerStyle}>
                <Pressable
                  style={[modalStyles.serviceButton]}
                  onPress={() => emerAssReq('BFP',require('./pictures/fire.png'))}>
                  <Text style={modalStyles.textStyle}>BFP</Text>
                </Pressable>

                <Pressable
                  style={[modalStyles.serviceButton]}
                  onPress={() => emerAssReq('PNP',require('./pictures/police.webp'))}>
                  <Text style={modalStyles.textStyle}>PNP</Text>
                </Pressable>
              </View>

              <View style={modalStyles.servicesContainerStyle}>
                <Pressable
                  style={[modalStyles.serviceButton]}
                  onPress={() => emerAssReq('Medical', require('./pictures/medic.png'))}>
                  <Text style={modalStyles.textStyle}>Medical</Text>
                </Pressable>

                <Pressable
                  style={[modalStyles.serviceButton]}
                  onPress={() => emerAssReq('NDRRMC', require('./pictures/ndrrmc.png'))}>
                  <Text style={modalStyles.textStyle}>NDRRMC</Text>
                </Pressable>
              </View>

            

              <Pressable
                style={[modalStyles.closeButton]}
                onPress={() => cancelService()}>
                <Text style={modalStyles.textStyle}>Cancel Service</Text>
              </Pressable>

              <Pressable
                style={[modalStyles.closeButton]}
                onPress={() => setEmergencyAssistanceModalVisible(!emergencyAssistanceModalVisible)}>
                <Text style={modalStyles.textStyle}>Close</Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>


      {/* MODAL 2*/}

      <Modal
        animationType="fade"
        transparent={true}
        visible={routeAssistanceModalVisible}
        onRequestClose={() => {
          setEmergencyAssistanceModalVisible(!routeAssistanceModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{marginBottom: 10}}> Are you sure? </Text>

            <View style={styles.buttonModal}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={RouteAssistance}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setRouteAssistanceModalVisible(!routeAssistanceModalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>


            </View>
           
          </View>
        </View>
        </Modal>

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
            title=""
            description=""
          >
          <Image
            source={markerEmoji}
            style={{ width: markerImageSize.width, height: markerImageSize.height }} 
          />

          </Marker>
          {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title} 
                  description={`Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`}
                >
                  <Image
                    source={getMarkerImage(marker.title)} 
                    style={{ width: 40, height: 40 }}  
                  />
                </Marker>
              ))}
        </MapView>
      )}

     
      <View style={styles.tabBarContainer}>
        <View style={styles.iconContainer}>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={serviceVisible}>
              <Text style={styles.buttonText}>Emergency Assistance</Text>
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      </>
      )}
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