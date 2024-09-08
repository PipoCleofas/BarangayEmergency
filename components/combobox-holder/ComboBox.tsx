// PipoCleofas

import React, { useState } from 'react';
import { View, Modal, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ComboBoxProps {
  data: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  value: string | null;
  placeholder?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ data, onValueChange, value, placeholder = 'Select an option' }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemSelect = (item: { label: string; value: string }) => {
    onValueChange(item.value); 
    setIsModalVisible(false);  
  };

  return (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <View style={styles.container}>
        <Text style={styles.selectorText}>
          {value ? data.find(item => item.value === value)?.label : placeholder}
        </Text>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)} 
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleItemSelect(item)}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    height: 50, 
    justifyContent: 'center', 
    width: '100%', 
  },
  selectorText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ComboBox;
