import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

interface NotificationProps {
  message: string;  
  trigger: boolean; 
}

const Notification: React.FC<NotificationProps> = ({ message, trigger }) => {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Fade out after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false)); // Hide notification after fade-out
      }, 3000);
    }
  }, [trigger]);

  return (
    visible && (
      <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 50,
    width: '90%',
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Notification;
